import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../../lib/checkLoggedIn"
import clientPromise from "../../lib/mongodb"

import dayjs, { Dayjs } from "dayjs"
import Badge from "@mui/material/Badge"
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay"

import DialogActions from "@mui/material/DialogActions"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar"
import { useLocaleText } from "@mui/x-date-pickers/internals"

const theme = createTheme()
const baseurl = process.env.BASEURL

function CustomActionBar(props: PickersActionBarProps) {
  const { onAccept, onClear, onCancel, onSetToday, actions, className } = props
  const localeText = useLocaleText()

  return (
    <DialogActions className={className}>
      <Button
        data-mui-test="today-action-button"
        onClick={() => {
          onSetToday()
        }}
        variant="contained"
      >
        {localeText.todayButtonLabel}
      </Button>
      <Button
        data-mui-test="today-action-button"
        onClick={() => {
          onSetToday()
        }}
        variant="contained"
      >
        Add Workout
      </Button>
    </DialogActions>
  )
}

type LogProps = {
  userLogs: any
  logDates: string[]
}

export default function Home(props: LogProps) {
  // const requestAbortController = React.useRef<AbortController | null>(null)
  // const [isLoading, setIsLoading] = React.useState(false)
  const [highlightedDays, setHighlightedDays] = React.useState(props.logDates)
  // const [highlightedDays, setHighlightedDays] = useState([1, 2, 13])

  const initialValue = dayjs().format("YYYY-MM-DD")

  const [currentDay, setCurrentDay] = useState(initialValue)

  useEffect(() => {
    setHighlightedDays(highlightedDays)
  }, [])

  // console.log("here", props.userLogs)
  // console.log("there", highlightedDays)

  const handleChange = (newValue: any) => {
    setCurrentDay(newValue.format("YYYY-MM-DD"))
    // console.log("changed", currentDay)
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Logs
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Your personal workout logs
            </Typography>
            <Button>Add Workout/Exercise</Button>
            <StaticDatePicker
              slots={{
                actionBar: CustomActionBar,
                day: (props: any) => {
                  const isSelected =
                    !props.outsideCurrentMonth &&
                    highlightedDays.indexOf(props.day.format("YYYY-MM-DD")) >= 0

                  return (
                    <Badge
                      overlap="circular"
                      badgeContent={isSelected ? "🌚" : undefined}
                    >
                      <PickersDay {...props} />
                    </Badge>
                  )
                },
              }}
              slotProps={{
                day: {
                  highlightedDays,
                } as any,
              }}
              onChange={handleChange}
            />
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export async function getServerSideProps(req: any, res: NextApiResponse) {
  const user = await checkLoggedIn(req.req, res)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: baseurl + "/login",
      },
      props: {},
    }
  }

  // logic to get logged in user's personal logs
  const getAllLogs = async () => {
    const mongoClient = await clientPromise

    const logData = mongoClient.db("logs").collection("hello").find().toArray()

    return logData
  }

  const theLogs = await getAllLogs()

  const userLogs = JSON.parse(JSON.stringify(theLogs))

  const logDates = userLogs.map((value: any) => value.date)
  console.log(logDates)

  return {
    props: {
      loggedUser: user,
      userLogs: userLogs,
      logDates: logDates,
    },
  }
}

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

import DialogSelect from "../../components/DialogSelect"
import { getAllExercises } from "../api/exercises"

import DialogSelectSets from "../../components/DialogSelectSets"
import axios from "axios"
import { useRouter } from "next/router"

const theme = createTheme()
const baseurl = process.env.BASEURL

function CustomActionBar(props: any) {
  const { onAccept, onClear, onCancel, onSetToday, actions, className } = props
  const localeText = useLocaleText()

  return (
    <DialogActions className={className} style={{ justifyContent: "center" }}>
      <Button
        data-mui-test="today-action-button"
        onClick={() => {
          onSetToday()
        }}
        variant="contained"
      >
        {localeText.todayButtonLabel}
      </Button>
      {/* <Button
        data-mui-test="today-action-button"
        onClick={() => {
          onSetToday()
        }}
        variant="contained"
      >
        Add Workout
      </Button> */}
      <DialogSelect data={props} />
    </DialogActions>
  )
}

type LogProps = {
  loggedUser: any
  userLogs: any
  logDates: string[]
  exercises: any
}

const deleteSetHandler = async (
  user: string,
  date: string,
  target: string,
  exercise: string,
  index: number
) => {
  try {
    const res = await axios.post(baseurl + "/api/logs/delete-set", {
      user: user,
      date: date,
      target: target,
      exercise: exercise,
      index: index,
    })
  } catch (error: any) {
    console.log(error.response.data.message)
  }
}

export default function Home(props: LogProps) {
  const [highlightedDays, setHighlightedDays] = React.useState(props.logDates)
  const [userLogs, setUserLogs] = React.useState(props.userLogs)

  const initialValue = dayjs().format("YYYY-MM-DD")

  const [currentDay, setCurrentDay] = useState(initialValue)

  const user: string = props.loggedUser.username

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  useEffect(() => {
    setHighlightedDays(props.logDates)
  }, [props.logDates])

  useEffect(() => {
    setUserLogs(props.userLogs)
  }, [props.userLogs])

  const handleChange = (newValue: any) => {
    setCurrentDay(newValue.format("YYYY-MM-DD"))
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
                actionBar: {
                  props,
                  currentDay,
                } as any,
                day: {
                  highlightedDays,
                } as any,
              }}
              onChange={handleChange}
            />
            <br />
            {userLogs.map((value: any) => {
              if (currentDay === value.date) {
                return (
                  <>
                    <Typography
                      variant="h3"
                      align="center"
                      color="text.secondary"
                      paragraph
                      key={value}
                    >
                      Workout Log
                    </Typography>
                    {value.exercises &&
                      Object.keys(value.exercises).map((muscle: any) => {
                        // console.log("hello", muscle, value.exercises[muscle])
                        return (
                          <>
                            <Typography
                              variant="h4"
                              align="left"
                              color="text.secondary"
                              paragraph
                              key={muscle}
                            >
                              {muscle}
                            </Typography>
                            {Object.keys(value.exercises[muscle]) &&
                              Object.keys(value.exercises[muscle]).map(
                                (exercise: any) => {
                                  return (
                                    <>
                                      <Typography
                                        variant="h6"
                                        align="left"
                                        color="text.secondary"
                                        paragraph
                                        key={exercise}
                                      >
                                        {exercise}
                                        <Button>-</Button>
                                        <DialogSelectSets
                                          target={muscle}
                                          exercise={exercise}
                                          data={props}
                                          day={currentDay}
                                        />
                                      </Typography>

                                      {value.exercises[muscle][exercise]
                                        .length > 0 &&
                                        value.exercises[muscle][exercise].map(
                                          (sets: string, index: number) => {
                                            return (
                                              <>
                                                <Typography
                                                  variant="h6"
                                                  align="left"
                                                  color="text.secondary"
                                                  paragraph
                                                  key={sets}
                                                >
                                                  Set {index + 1}:{" "}
                                                  {sets.split(",")[0] || "0"}{" "}
                                                  reps of{" "}
                                                  {sets.split(",")[1] || "0"}{" "}
                                                  lbs.
                                                  <Button
                                                    onClick={() => {
                                                      deleteSetHandler(
                                                        user,
                                                        currentDay,
                                                        muscle,
                                                        exercise,
                                                        index
                                                      )
                                                      refreshData()
                                                    }}
                                                  >
                                                    -
                                                  </Button>
                                                </Typography>
                                              </>
                                            )
                                          }
                                        )}
                                    </>
                                  )
                                }
                              )}
                          </>
                        )
                      })}
                  </>
                )
              }
            })}
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

    const logData = mongoClient
      .db("logs")
      .collection(user.username)
      .find()
      .toArray()

    return logData
  }

  const theLogs = await getAllLogs()

  const userLogs = JSON.parse(JSON.stringify(theLogs))

  const logDates = userLogs.map((value: any) => value.date)

  // get all exercises in database
  let exercises: any = await getAllExercises()
  exercises = JSON.parse(JSON.stringify(exercises))

  return {
    props: {
      loggedUser: user,
      userLogs: userLogs,
      logDates: logDates,
      exercises: exercises,
    },
  }
}

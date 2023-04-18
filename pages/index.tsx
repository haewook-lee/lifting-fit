import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useContext, useState } from "react"
import DataContext from "../lib/dataContext"
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../lib/checkLoggedIn"

const theme = createTheme()

export default function Home() {
  const loggedUser = useContext(DataContext)

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
              Lifting Fit
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Workouts tracker and exercise database
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome! This is a proof-of-concept, so please do not use
              sensitive user credentials!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              If you want to see what the app can do, try logging in with
              username: <b>hello@world.com</b> and password: <b>worldstar</b>
            </Typography>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export async function getServerSideProps(req: any, res: NextApiResponse) {
  const user = await checkLoggedIn(req.req, res)

  return {
    props: { loggedUser: user },
  }
}

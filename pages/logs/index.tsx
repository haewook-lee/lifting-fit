import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../../lib/checkLoggedIn"

const theme = createTheme()
const baseurl = process.env.BASEURL

export default function Home() {
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

  return {
    props: {
      loggedUser: user,
    },
  }
}

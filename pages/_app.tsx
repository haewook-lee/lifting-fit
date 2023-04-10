import type { AppProps } from "next/app"
import AppBar from "@mui/material/AppBar"
import FitnessCenter from "@mui/icons-material/FitnessCenter"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import { removeCookies } from "cookies-next"
import DataContext from "../lib/dataContext"
import { useState, useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  const baseurl = process.env.BASEURL

  const router = useRouter()

  const signoutHandler = () => {
    removeCookies("token")
    router.push("/")
  }

  // for the copyright footer
  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://haewook-lee.github.io/">
          Haewook Lee
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    )
  }

  // checks whether the user is logged in for not; passes value
  // down to the components
  const [loggedUser, setLoggedUser] = useState<string | null>("")

  // checkLoggedIn().then((value: string) => setLoggedUser(value))

  // useEffect(() => {
  // checkLoggedIn().then((value: string | null) => {
  //   setLoggedUser(value)
  // })
  // }, [])

  return (
    <>
      <CssBaseline />
      <DataContext.Provider value={loggedUser}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <ButtonGroup variant="text" aria-label="text button group">
                <Button color="inherit" href={baseurl + "/"}>
                  <FitnessCenter />
                </Button>
                <Button color="inherit" href={baseurl + "/exercises"}>
                  Exercises
                </Button>
                <Button color="inherit" href={baseurl + "/logs"}>
                  Logs
                </Button>
                <Button color="inherit" href={baseurl + "/login"}>
                  Login
                </Button>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
        </Box>
        {/* Component */}
        <Component {...pageProps} />
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Created using NextJS and MongoDB
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </DataContext.Provider>
    </>
  )
}

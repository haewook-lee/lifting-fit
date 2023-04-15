import App, { AppProps, AppContext, AppInitialProps } from "next/app"
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
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../lib/checkLoggedIn"

export default function MyApp({ Component, pageProps }: AppProps) {
  const baseurl = process.env.BASEURL

  const router = useRouter()

  const [userState, setUserState] = useState(false)

  const signoutHandler = () => {
    removeCookies("token")
    setUserState(false)
    router.push(baseurl + "/")
  }

  useEffect(() => {
    if (pageProps.loggedUser) {
      setUserState(true)
    }
  }, [])

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

  return (
    <>
      <CssBaseline />
      {/* <DataContext.Provider value={loggedUser}> */}
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
              {!userState && (
                <Button color="inherit" href={baseurl + "/login"}>
                  Login
                </Button>
              )}
              {userState && (
                <Button color="inherit" onClick={() => signoutHandler()}>
                  Logout
                </Button>
              )}
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
      {/* </DataContext.Provider> */}
    </>
  )
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppInitialProps> => {
  const ctx = await App.getInitialProps(context)

  return { ...ctx }
}

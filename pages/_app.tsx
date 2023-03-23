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

export default function App({ Component, pageProps }: AppProps) {
  const baseURL = process.env.BASE_URL

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
      {/* Navbar */}
      <AppBar position="relative">
        <Toolbar>
          <ButtonGroup variant="text" aria-label="text button group">
            <Button color="inherit" href={baseURL + "/"}>
              <FitnessCenter />
            </Button>
            <Button color="inherit" href={baseURL + "/exercises"}>
              Exercises
            </Button>
            <Button color="inherit" href={baseURL + "/logs"}>
              Workout Logs
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
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
    </>
  )
}

import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import { FitnessCenter } from "@mui/icons-material"
import { Grid } from "@mui/material"
import Item from "@mui/material"

export default function NavBar() {
  const baseURL = process.env.BASE_URL

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" direction="row">
            <ButtonGroup variant="text" aria-label="text button group">
              <Button color="inherit" href={baseURL + "/"}>
                <FitnessCenter />
              </Button>
              <Button color="inherit" href={baseURL + "/exercises"}>
                Exercises
              </Button>
              <Button color="inherit" href={baseURL + "/logs"}>
                Logs
              </Button>
              <Button color="inherit" href={baseURL + "/login"}>
                Login
              </Button>
            </ButtonGroup>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

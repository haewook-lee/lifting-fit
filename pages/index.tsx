import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useContext, useState } from "react"
import DataContext from "../lib/dataContext"

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
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

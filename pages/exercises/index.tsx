import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useContext, useState } from "react"
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../../lib/checkLoggedIn"
import clientPromise from "../../lib/mongodb"
import { getAllExercises } from "../api/exercises"

const theme = createTheme()

interface exerObject {
  exercises: exer[]
}

interface exer {
  name: string
  target: string
  video: string
  equipment: string
  type: string
  image: string
}

export default function Home(exercises: exerObject) {
  const exerciseList = exercises.exercises

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
              Exercises
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Exercises with quick descriptions/videos
            </Typography>
          </Container>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 3, lg: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 20 }}
          justifyContent="center"
          alignItems="stretch"
          sx={{ p: 1, m: "auto" }}
        >
          {exerciseList &&
            exerciseList.map((exercise, key) => (
              <Grid item xs={8} sm={4} md={4} key={key}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {exercise.name}
                </Typography>
                <img
                  src={`${exercise.image}?fit=fill&fill=solidw=164&h=104&auto=format`}
                  srcSet={`${exercise.image}?fit=fill&fill=solidw=164&h=104&auto=format&dpr=2 2x`}
                  alt={exercise.name}
                  loading="lazy"
                  style={{ width: "100%", height: "200px" }}
                />
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Muscle: {exercise.target}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Equipment: {exercise.equipment}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Exercise Type: {exercise.type}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {exercise.video}
                </Typography>
              </Grid>
            ))}
        </Grid>
      </main>
    </ThemeProvider>
  )
}

export async function getServerSideProps() {
  let exercises = await getAllExercises()
  exercises = JSON.parse(JSON.stringify(exercises))

  return {
    props: { exercises: exercises },
  }
}

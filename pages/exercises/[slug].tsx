import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useContext, useState } from "react"
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../../lib/checkLoggedIn"
import clientPromise from "../../lib/mongodb"
import { getExercise } from "../api/exercises/[eid]"
import { getAllExercises } from "../api/exercises"
import { GetStaticPaths, GetStaticProps } from "next"

const theme = createTheme()

interface exerObject {
  exercises: exer
}

interface exer {
  name: string
  target: string
  video: string
  equipment: string
  type: string
  image: string
  slug: string
}

export default function Home(data: exerObject) {
  const exercise = data.exercises

  console.log(exercise)
  console.log("here", exercise)

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
              {exercise.name}
            </Typography>
            {exercise && (
              <>
                <img
                  src={`${exercise.image}?fit=fill&fill=solidw=164&h=104&auto=format`}
                  srcSet={`${exercise.image}?fit=fill&fill=solidw=164&h=104&auto=format&dpr=2 2x`}
                  alt={exercise.name}
                  loading="lazy"
                  style={{ width: "100%", height: "auto" }}
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
                  Video Tutorial:
                </Typography>
                <iframe
                  src={exercise.video}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={exercise.name}
                  width="100%"
                  height="315"
                />
              </>
            )}
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let data = await getAllExercises()
  let parsedData = JSON.parse(JSON.stringify(data)).map(
    (value: exer) => value.slug
  )

  let paths = []
  for (let slug of parsedData) {
    paths.push({ params: { slug: slug } })
  }

  console.log("making", paths)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let exercises = await getExercise(params?.slug ?? "")
  exercises = JSON.parse(JSON.stringify(exercises))

  return {
    props: {
      exercises,
    },
  }
}

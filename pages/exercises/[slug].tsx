import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import checkLoggedIn from "../../lib/checkLoggedIn"
import { getExercise } from "../api/exercises/[eid]"

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
                <iframe
                  src={exercise.video}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={exercise.name}
                  width="100%"
                  height="315"
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
              </>
            )}
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   let data = await getAllExercises()
//   let parsedData = JSON.parse(JSON.stringify(data)).map(
//     (value: exer) => value.slug
//   )

//   let paths = []
//   for (let slug of parsedData) {
//     paths.push({ params: { slug: slug } })
//   }

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   let exercises = await getExercise(params?.slug ?? "")
//   exercises = JSON.parse(JSON.stringify(exercises))

//   return {
//     props: {
//       exercises,
//     },
//   }
// }

export async function getServerSideProps({ params, req, res }: any) {
  const user = await checkLoggedIn(req, res)

  let exercises = await getExercise(params?.slug ?? "")
  exercises = JSON.parse(JSON.stringify(exercises))

  return {
    props: { loggedUser: user, slug: params.slug, exercises: exercises },
  }
}

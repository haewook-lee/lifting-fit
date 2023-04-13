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
import { getAllUsers, getUserByName } from "../api/users/[uid]"
import { GetStaticPaths, GetStaticProps } from "next"

const theme = createTheme()

interface userObject {
  users: user
}

interface user {
  username: string
}

export default function Home(data: userObject) {
  const user = data.users

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
              {user.username}
            </Typography>
            {user && (
              <>
                {/* <img
                  src={`${exercise.image}?fit=fill&fill=solidw=164&h=104&auto=format`}
                  srcSet={`${exercise.image}?fit=fill&fill=solidw=164&h=104&auto=format&dpr=2 2x`}
                  alt={exercise.name}
                  loading="lazy"
                  style={{ width: "100%", height: "auto" }}
                /> */}
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  {/* {user.username} */}
                </Typography>
              </>
            )}
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let data = await getAllUsers()
  let parsedData = JSON.parse(JSON.stringify(data)).map(
    (value: user) => value.username
  )

  let paths = []
  for (let slug of parsedData) {
    paths.push({ params: { slug: slug } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let users = await getUserByName(params?.slug ?? "")
  users = JSON.parse(JSON.stringify(users))

  return {
    props: {
      users,
    },
  }
}

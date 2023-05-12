import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import checkLoggedIn from "../../lib/checkLoggedIn"

const theme = createTheme()

type loggedUser = {
  username: string
  email: string
}

type userProps = {
  loggedUser: loggedUser
  slug: string
}

// export default function Home(data: userObject) {
export default function Home(user: userProps) {
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
              {user.loggedUser.username}
            </Typography>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   let data = await getAllUsers()
//   let parsedData = JSON.parse(JSON.stringify(data)).map(
//     (value: user) => value.username
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
//   let users = await getUserByName(params?.slug ?? "")
//   users = JSON.parse(JSON.stringify(users))

//   return {
//     props: {
//       users,
//     },
//   }
// }

export async function getServerSideProps({ params, req, res }: any) {
  const user = await checkLoggedIn(req, res)

  return {
    props: { loggedUser: user, slug: params.slug },
  }
}

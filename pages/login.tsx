import React, { useState, useContext } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import FormControl from "@mui/material/FormControl"
import InputAdornment from "@mui/material/InputAdornment"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import IconButton from "@mui/material/IconButton"
import { useRouter } from "next/router"
import axios from "axios"
import DataContext from "../lib/dataContext"
import { NextApiRequest, NextApiResponse } from "next"
import checkLoggedIn from "../lib/checkLoggedIn"

const theme = createTheme()

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const router = useRouter()

  const loggedUser = useContext(DataContext)

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await axios.post("/api/login", {
        email: email,
        password: password,
      })

      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  console.log("hey")

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            pl: 0,
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              bgcolor: "background.paper",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Login
            </Typography>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "95%",
                },
                "& .MuiFormControl-root": {
                  m: 1,
                  width: "95%",
                },
                "& .MuiButton-root": {
                  m: 1,
                  width: "50%",
                },
              }}
              noValidate
              autoComplete="off"
              onSubmit={loginHandler}
            >
              <TextField
                id="outlined-basic margin-none fullWidth"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password margin-none fullWidth"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export async function getServerSideProps(req: any, res: NextApiResponse) {
  const user = await checkLoggedIn(req.req, res)
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    }
  }
  return {
    props: {},
  }
}

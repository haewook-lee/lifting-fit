import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import FormControl from "@mui/material/FormControl"
import axios from "axios"
import { useRouter } from "next/router"
import { TextField } from "@mui/material"

const baseurl = process.env.BASEURL

export default function DialogSelectSets({
  target,
  exercise,
  data,
  day,
}: {
  target: string
  exercise: string
  data: any
  day: string
}) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [rep, setRep] = React.useState<string>("")
  const [weight, setWeight] = React.useState<string>("")
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const user: string = data.loggedUser.username

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false)
    }
  }

  const addSetHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log({
    //   user: data.loggedUser,
    //   date: day,
    //   target: target,
    //   exercise: exercise,
    //   rep: rep,
    //   weight: weight,
    // })

    try {
      const res = await axios.post(baseurl + "/api/logs/sets", {
        user: user,
        date: day,
        target: target,
        exercise: exercise,
        rep: rep,
        weight: weight,
      })
      if (res.status < 300) {
        refreshData()
      }
      setRep("")
      setWeight("")
    } catch (error: any) {
      console.log(error.response.data.message)
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <>
      <Button onClick={handleClickOpen}>+</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add {exercise} Set</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap" }}
            onSubmit={addSetHandler}
          >
            <FormControl sx={{ m: 1, minWidth: 120, width: 120 }}>
              <TextField
                type="number"
                label="Reps"
                value={rep}
                onChange={(e) => setRep(e.target.value)}
                autoComplete="off"
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120, width: 120 }}>
              <TextField
                type="number"
                label="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                autoComplete="off"
              />
            </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Ok</Button>
            </DialogActions>
          </Box>
        </DialogContent>
        {errorMessage !== "" && (
          <DialogTitle sx={{ color: "red", marginTop: 0, paddingTop: 0 }}>
            {errorMessage}
          </DialogTitle>
        )}
      </Dialog>
    </>
  )
}

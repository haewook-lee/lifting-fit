import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import axios from "axios"
import { useRouter } from "next/router"
import { DialogContentText } from "@mui/material"

type Exercise = {
  equipment: string
  image: string
  name: string
  slug: string
  target: string
  type: string
  video: string
}

const baseurl = process.env.BASEURL

export default function DialogSelect(data?: any) {
  const [open, setOpen] = React.useState(false)
  const [muscle, setMuscle] = React.useState<string>("")
  const [exercise, setExercise] = React.useState<string>("")
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const exerciseList = data.data.props.exercises
  const currentDay: string = data.data.currentDay
  const loggedUser: string = data.data.props.loggedUser.username

  const router = useRouter()

  const refreshData = () => {
    router.replace(router.asPath)
  }

  const handleMuscleChange = (event: SelectChangeEvent<typeof muscle>) => {
    setMuscle(event.target.value || "")
  }

  const handleExerciseChange = (event: SelectChangeEvent<typeof exercise>) => {
    setExercise(event.target.value || "")
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setMuscle("")
      setExercise("")
      setOpen(false)
    }
  }
  // console.log(muscle, exercise)
  // console.log(data)

  const addExerciseHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (muscle === "" || exercise === "") {
      setErrorMessage("Please enter Target/Exercise")
      return
    }

    try {
      const res = await axios.post(baseurl + "/api/logs", {
        user: loggedUser,
        date: currentDay,
        target: muscle,
        exercise: exercise,
      })
      if (res.status < 300) {
        refreshData()
      }
      setMuscle("")
      setExercise("")
      setOpen(false)
    } catch (error: any) {
      console.log(error)
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Workout
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Add Workout</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{ display: "flex", flexWrap: "wrap" }}
            onSubmit={addExerciseHandler}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Target</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={muscle}
                onChange={handleMuscleChange}
                input={<OutlinedInput label="Target" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Chest"}>Chest</MenuItem>
                <MenuItem value={"Back"}>Back</MenuItem>
                <MenuItem value={"Legs"}>Legs</MenuItem>
                <MenuItem value={"Biceps"}>Biceps</MenuItem>
                <MenuItem value={"Triceps"}>Triceps</MenuItem>
                <MenuItem value={"Shoulders"}>Shoulders</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Exercise</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={exercise}
                onChange={handleExerciseChange}
                input={<OutlinedInput label="Exercise" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {/* Doesn't work since the MenuItem is nested in the div; keeping for posterity */}
                {/* {exerciseList.map((movement: any) => {
                  return (
                    <div>
                      {movement.target === muscle && (
                        <MenuItem value={movement.name} key={movement.name}>
                          {movement.name}
                        </MenuItem>
                      )}
                    </div>
                  )
                })} */}
                {exerciseList.map((movement: Exercise) => [
                  movement.target === muscle && (
                    <MenuItem value={movement.name} key={movement.name}>
                      {movement.name}
                    </MenuItem>
                  ),
                ])}
              </Select>
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
    </div>
  )
}

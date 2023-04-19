import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"

import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
}

function BasicMenu(data?: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Target Muscle
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Chest</MenuItem>
        <MenuItem onClick={handleClose}>Back</MenuItem>
        <MenuItem onClick={handleClose}>Legs</MenuItem>
        <MenuItem onClick={handleClose}>Biceps</MenuItem>
        <MenuItem onClick={handleClose}>Triceps</MenuItem>
        <MenuItem onClick={handleClose}>Shoulders</MenuItem>
      </Menu>
    </div>
  )
}

function ChildModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default function NestedModal(data?: any) {
  const [open, setOpen] = React.useState(false)
  const [target, setTarget] = React.useState<string>("")
  const [exercise, setExercise] = React.useState<string>("")
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open1 = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose1 = () => {
    setAnchorEl(null)
  }
  const handleMuscle = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setTarget(event.currentTarget)
    setAnchorEl(null)
    console.log(target)
  }

  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null)
  const open2 = Boolean(anchorEl1)
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl1(null)
  }

  console.log(target)

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Exercise
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component="form" sx={{ ...style, maxWidth: 600, width: "100%" }}>
          <h2 id="parent-modal-title">Add Exercise</h2>
          <p id="parent-modal-description">{data?.data.currentDay}</p>
          {/* <ChildModal /> */}
          <div>
            <Button
              id="basic-button"
              aria-controls={open1 ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? "true" : undefined}
              onClick={handleClick}
            >
              Target Muscle
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open1}
              onClose={handleClose1}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              onChange={() => setTarget("huh")}
            >
              <MenuItem value="Chest">Chest</MenuItem>
              <MenuItem value="Back">Back</MenuItem>
              <MenuItem value="Legs">Legs</MenuItem>
              <MenuItem value="Biceps">Biceps</MenuItem>
              <MenuItem value="Triceps">Triceps</MenuItem>
              <MenuItem value="Shoulders">Shoulders</MenuItem>
            </Menu>
            <Button
              id="basic-button"
              aria-controls={open1 ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open1 ? "true" : undefined}
              onClick={handleClick1}
            >
              Exercise
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl1}
              open={open2}
              onClose={handleClose2}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem value="Chest">Chest</MenuItem>
            </Menu>
          </div>
        </Box>
      </Modal>
    </>
  )
}

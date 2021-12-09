import { useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'

const annoyance_Factor = 30000

export default function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  function handleClose() {
    setOpen(false)
    setTimeout(() => setOpen(true), annoyance_Factor)
  }

  setTimeout(() => setOpen(true), annoyance_Factor)

  return <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Rate this cool site!</DialogTitle>
    <DialogContent>
      <Rating
        size="large"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
      />
      <br />
      <Button onClick={() => window.open("https://autopilottonowhere.com/", '_blank').focus()}>
        Here could be your ADs!
      </Button>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
}
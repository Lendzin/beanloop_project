import React, {useState} from 'react'
import {CompactPicker} from 'react-color'
import Popover from '@material-ui/core/Popover'
import Card from '@material-ui/core/Card'

export const ColorPicker = (props: any) => {
  const {color, onChangeComplete} = props

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <Card
        onClick={handleClick}
        style={{backgroundColor: color, height: 25, width: 25, marginLeft: 15}}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{marginTop: 10}}
      >
        <CompactPicker color={color} onChangeComplete={onChangeComplete} />
      </Popover>
    </div>
  )
}

import React from 'react'
import {connect} from 'react-redux'
import {showNotification, hideNotification} from '../../actions/appActions'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent, {
  SnackbarContentProps,
} from '@material-ui/core/SnackbarContent'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const Notification = (props: any) => {
  const {shouldShowNotification, hideNotification, notification} = props

  let color: string = ''

  if (notification.type === 'error') {
    color = '#CD3232'
  } else if (notification.type === 'success') {
    color = '#4BB543'
  }

  const StyledSnackbarContent = styled(SnackbarContent)`
    && {
      background: ${color};
    }
  ` as React.ComponentType<SnackbarContentProps>

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={shouldShowNotification}
      autoHideDuration={notification.autoHide}
      onClose={hideNotification}
    >
      <StyledSnackbarContent
        style={{justifyContent: 'center'}}
        message={
          <Typography variant='overline' style={{color: 'white'}}>
            <span id='message-id'>{notification.message}</span>
          </Typography>
        }
      />
    </Snackbar>
  )
}

const mapStateToProps = (state: any) => ({
  shouldShowNotification: state.app.shouldShowNotification,
  notification: state.app.notification,
})

const ConnectedComponent = connect(
  mapStateToProps,
  {showNotification, hideNotification}
)(Notification)

export {ConnectedComponent as Notification}

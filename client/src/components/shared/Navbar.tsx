import React, {useState} from 'react'
import {withRouter, Link as RouterLink} from 'react-router-dom'
import styled from 'styled-components'
import Avatar, {AvatarProps} from '@material-ui/core/Avatar'
import Link, {LinkProps} from '@material-ui/core/Link'
import MenuItem, {MenuItemProps} from '@material-ui/core/MenuItem'
import ListItem, {ListItemProps} from '@material-ui/core/ListItem'
import {
  Typography,
  Toolbar,
  AppBar,
  Grid,
  Popover,
  Tooltip,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {signOut, resetDashboardState} from '../../actions/userActions'
import {resetGridState} from '../../actions/dashboardActions'
import {showNotification} from '../../actions/appActions'
import {connect} from 'react-redux'

const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
` as React.ComponentType<AvatarProps>

const StyledLink = styled(Link)`
  && {
    margin-left: 10px;
  }
` as React.ComponentType<LinkProps>

const StyledMenuItem = styled(MenuItem)`
  && {
    padding: 7px;
  }
` as React.ComponentType<MenuItemProps>

const StyledListItem = styled(ListItem)`
  && {
    padding: 0px;
  }
` as React.ComponentType<ListItemProps>

const PopOver = (props: any) => {
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState(null)
  const {
    avatarUrl,
    signOut,
    showNotification,
    resetDashboardState,
    resetGridState,
  } = props

  const handleClick = (event: any) => {
    setAnchor(event.target)
    setOpen(true)
  }

  const handleClose = (event: any) => {
    setAnchor(null)
    setOpen(false)
  }

  return (
    <>
      <Tooltip title='Sign out'>
        <StyledAvatar src={avatarUrl} onClick={handleClick} alt='avatar' />
      </Tooltip>
      <Popover
        id='render-props-popover'
        open={open}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <StyledMenuItem>
          <Link
            variant='body1'
            onClick={() => {
              resetGridState(),
                resetDashboardState(),
                signOut()
                  .then(() => {
                    showNotification(
                      'You have been signed out!',
                      'success',
                      3000
                    )
                  })
                  .catch(() => {
                    showNotification('Something went wrong', 'error', 3000)
                  })
            }}
          >
            Sign out
          </Link>
        </StyledMenuItem>
      </Popover>
    </>
  )
}

const Router = (props: any) => <RouterLink to='/manage' {...props} />

const Navbar = withRouter((props: any) => {
  const {
    signOut,
    userData,
    showNotification,
    resetDashboardState,
    resetGridState,
    dashboardName,
  } = props
  const avatarUrl =
    'https://ping.design/wp-content/uploads/2016/09/20160929-Free-Logos-5.jpg'

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
          >
            <div>
              {props.location.pathname !== '/manage' && (
                <StyledListItem color='inherit'>
                  <Tooltip title='Go back'>
                    <StyledLink variant='h6' color='inherit' component={Router}>
                      <span
                        style={{display: 'flex', marginRight: 15}}
                        onClick={() => {
                          resetDashboardState(), resetGridState()
                        }}
                      >
                        <ArrowBackIcon color='inherit' />
                      </span>
                    </StyledLink>
                  </Tooltip>
                </StyledListItem>
              )}
            </div>
            {props.location.pathname !== '/manage' && (
              <div>
                <StyledListItem>
                  <Tooltip title='Current dashboard'>
                    <Typography variant='body1' color='inherit'>
                      {dashboardName}
                    </Typography>
                  </Tooltip>
                </StyledListItem>
              </div>
            )}
            <div>
              <ListItem>
                <PopOver
                  avatarUrl={avatarUrl}
                  signOut={signOut}
                  showNotification={showNotification}
                  resetDashboardState={resetDashboardState}
                  resetGridState={resetGridState}
                />
                <Typography variant='body1' color='inherit'>
                  {userData && userData.name}
                </Typography>
              </ListItem>
            </div>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
})

const mapStateToProps = (state: any) => ({
  userData: state.user.userData,
  dashboardName: state.user.dashboard.dashboardName,
})

const ConnectedComponent = connect(mapStateToProps, {
  signOut,
  showNotification,
  resetDashboardState,
  resetGridState,
})(Navbar)

export {ConnectedComponent as Navbar}

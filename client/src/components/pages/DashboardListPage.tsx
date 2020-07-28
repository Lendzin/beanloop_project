import React, {Fragment, useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {showNotification} from '../../actions/appActions'
import {
  List,
  ListItemText,
  IconButton,
  Collapse,
  ListItemIcon,
  Avatar,
  CardContent,
  Badge,
  TextField,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import styled from 'styled-components'
import {ModalWrapper} from '../shared/ModalWrapper'
import {showModal, hideModal} from '../../actions/appActions'
import {connect} from 'react-redux'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import CircularProgress from '@material-ui/core/CircularProgress'
import {StyledTypography} from '../shared/StyledTypography'
import ListItem, {ListItemProps} from '@material-ui/core/ListItem'
import Card, {CardProps} from '@material-ui/core/Card'
import Button, {ButtonProps} from '@material-ui/core/Button'
import Typography, {TypographyProps} from '@material-ui/core/Typography'

import {
  getUser,
  saveDashboard,
  getDashboards,
  getDashboard,
  deleteDashboard,
} from '../../actions/userActions'

const InnerListItem = styled(ListItem)`
  && {
    margin-left: 20px;
  }
` as React.ComponentType<ListItemProps>

const InnerInnerListItem = styled(InnerListItem)`
  && {
    margin-left: 40px;
  }
` as React.ComponentType<ListItemProps>

const StyledCardContent = styled(CardContent)`
  margin-top: -30px;
` as any

const StyledButton = styled(Button)`
  && {
    margin-right: 10px;
    margin-bottom: 10px;
    float: right;
  }
` as React.ComponentType<ButtonProps>

const StyledCard = styled(Card)`
  margin: 0 auto;
  width: 70vw;
  margin-top: -200px;
  padding: 20px 60px;
` as React.ComponentType<CardProps>

const StyledTypography2 = styled(Typography)`
  && {
    margin-top: 20px;
    margin-bottom: -10px;
    width: 200px;
  }
` as React.ComponentType<TypographyProps>

const DashboardListPage = (props: any) => {
  const {
    getUser,
    getDashboards,
    showModal,
    hideModal,
    isModalOpen,
    token,
    userData,
    dashboards,
    saveDashboard,
    getDashboard,
    deleteDashboard,
    dashboard,
    showNotification,
  } = props
  const [open, setOpen] = useState({id: '', state: false})
  const [openSecond, setOpenSecond] = useState({id: '', state: false})
  const [entity, setEntity] = useState({
    id: '',
    pageId: '',
    type: '',
    accessToken: '',
    adAccountId: '',
  })
  useEffect(() => {
    getUser(token).catch(() => {
      showNotification('Something went wrong, please reload', 'error', 3000)
    })
  }, [])

  function openFirstLevel(id: string) {
    if (id === open.id) {
      setOpen({id: '', state: !open.state})
    } else {
      setOpen({id: id, state: true})
    }
  }

  function openSecondLevel(entity: any) {
    const {id} = entity
    setEntity({
      id: id,
      pageId: entity.networkId,
      type: entity.type,
      accessToken: entity.accessToken,
      adAccountId: entity.adAccount.id,
    })
    getDashboards(id)
    if (id === openSecond.id) {
      setOpenSecond({id: '', state: !openSecond.state})
    } else {
      setOpenSecond({id: id, state: true})
    }
  }

  function handleDeleteClick(event: any, id: string) {
    event.stopPropagation()
    deleteDashboard(id)
      .then(() => {
        showNotification('Dashboard Deleted!', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })
  }

  function renderNewDashboardModal() {
    //default value is set to allow for testing on setStartDate/setEndDate, TODO: remove for actual application
    const [startDate, setStartDate] = useState('2019-01-16')
    const [endDate, setEndDate] = useState('2019-04-16')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [startDateError, setStartDateError] = useState('')
    const [endDateError, setEndDateError] = useState('')

    function formatToMilliseconds(date: string) {
      const newDate = new Date(date)
      const milliseconds = newDate.getTime()
      return milliseconds
    }
    function changeMillisecondsFormat(milliseconds: number) {
      const shorterMilliseconds = Number(String(milliseconds).slice(0, 10))
      return shorterMilliseconds
    }

    function createDashboard() {
      const config = {
        id: `${entity.id}${name}`,
        entityId: entity.id,
        name: name,
        pageId: entity.pageId,
        adAccountId: entity.adAccountId,
        templateOwnerId: userData.agency.id,
        accessToken: entity.accessToken,
        endDate: changeMillisecondsFormat(formatToMilliseconds(endDate)),
        startDate: changeMillisecondsFormat(formatToMilliseconds(startDate)),
      }
      saveDashboard(config)
        .then(() => {
          showNotification('Dashboard Created!', 'success', 3000)
        })
        .catch(() => {
          showNotification('Something went wrong', 'error', 3000)
        })
      clearDetails()
      clearErrors()
      hideModal()
    }

    function checkNameErrors(value: any) {
      if (!value.trim()) {
        setNameError('Please enter a dashboard name.')
      } else if (value.length > 20) {
        setNameError('Dashboard name is too long (max 20)')
      } else if (
        dashboards
          .map((dashboard: any) => dashboard.dashboardName)
          .includes(value)
      ) {
        setNameError('Dashboard already exists.')
      } else {
        setNameError('')
      }
    }

    function checkStartDateErrors(value: any) {
      if (!value.trim()) {
        setStartDateError('Please enter a start date.')
      } else {
        setStartDateError('')
      }
    }

    function checkEndDateErrors(value: any) {
      if (!value.trim()) {
        setEndDateError('Please enter a end date.')
      } else {
        setEndDateError('')
      }
    }

    function clearErrors() {
      setNameError('')
      setStartDateError('')
      setEndDateError('')
    }

    function clearDetails() {
      setName('')
      setStartDate('')
      setEndDate('')
    }

    return (
      <StyledCard>
        <StyledTypography variant='overline'>
          Add new dashboard
        </StyledTypography>
        <StyledCardContent>
          <StyledTypography2 variant='overline'>Title</StyledTypography2>
          <TextField
            id='name'
            error={Boolean(nameError)}
            helperText={nameError}
            value={name}
            margin='normal'
            variant='outlined'
            onChange={({target}) => {
              setName(target.value)
              checkNameErrors(target.value)
            }}
          />
          <StyledTypography2 variant='overline'>
            Set period for events
          </StyledTypography2>
          <StyledTypography2 variant='overline'>from: </StyledTypography2>
          <TextField
            error={Boolean(startDateError)}
            helperText={startDateError}
            defaultValue='2019-01-16' //default value is set to allow for testing, TODO: remove for actual application
            id='date'
            type='date'
            onChange={({target}) => {
              setStartDate(target.value)
              checkStartDateErrors(target.value)
            }}
          />
          <StyledTypography2 variant='overline'>{''} to: </StyledTypography2>
          <TextField
            error={Boolean(endDateError)}
            helperText={endDateError}
            defaultValue='2019-04-16' //default value is set to allow for testing, TODO: remove for actual application
            id='date'
            type='date'
            onChange={({target}) => {
              setEndDate(target.value)
              checkEndDateErrors(target.value)
            }}
          />
          <StyledTypography2 variant='overline'>
            Dashboard type:{' '}
            {entity.type.charAt(0).toUpperCase() + entity.type.slice(1)}
          </StyledTypography2>
        </StyledCardContent>
        <StyledButton
          color='primary'
          variant='text'
          onClick={() => createDashboard()}
          disabled={Boolean(
            nameError ||
              startDateError ||
              endDateError ||
              !name ||
              !startDate ||
              !endDate
          )}
        >
          Create
        </StyledButton>
        <StyledButton color='secondary' variant='text' onClick={hideModal}>
          Cancel
        </StyledButton>
      </StyledCard>
    )
  }

  function renderDashboards() {
    return dashboards.map((dashboard: any) => {
      return (
        <Fragment key={dashboard.Id}>
          <InnerInnerListItem button onClick={() => getDashboard(dashboard.Id)}>
            {dashboard.configObject ? (
              <ListItemText primary={dashboard.dashboardName} />
            ) : (
              <ListItemText>
                <Badge variant='dot' badgeContent={'New'} color='primary'>
                  <Typography>{dashboard.dashboardName}</Typography>
                </Badge>
              </ListItemText>
            )}

            <ListItemIcon>
              <IconButton
                onClick={(event) => handleDeleteClick(event, dashboard.Id)}
                aria-label='Delete'
              >
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
          </InnerInnerListItem>
        </Fragment>
      )
    })
  }

  // TODO : Prettier icon needed for loading
  function isLoading() {
    return (
      <>
        <InnerInnerListItem>
          <CircularProgress />
        </InnerInnerListItem>
      </>
    )
  }

  function retrieveDashBoards() {
    return (
      <>
        <InnerInnerListItem key={'add dashboard'} button onClick={showModal}>
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText style={{marginLeft: -25}}>Add Dashboard</ListItemText>
        </InnerInnerListItem>
        {dashboards ? renderDashboards() : isLoading()}
      </>
    )
  }

  return (
    <div>
      <ModalWrapper isOpen={isModalOpen} handleClose={hideModal}>
        {renderNewDashboardModal()}
      </ModalWrapper>
      <div
        style={{
          padding: 20,
          position: 'relative',
          flexBasis: 0,
        }}
      >
        <List>
          {userData
            ? userData.brands.map((brand: any) => {
                return (
                  <Fragment key={brand.id}>
                    <ListItem button onClick={() => openFirstLevel(brand.id)}>
                      <Avatar src={brand.image} alt='avatar' />
                      <ListItemText primary={brand.name} />
                    </ListItem>
                    <Collapse
                      in={open.state && open.id === brand.id}
                      timeout='auto'
                      unmountOnExit
                    >
                      <List>
                        {brand.channelEntities.map((entity: any) => {
                          return (
                            <Fragment key={entity.id}>
                              <InnerListItem
                                button
                                onClick={() => openSecondLevel(entity)}
                              >
                                <Avatar src={entity.image} alt='avatar' />
                                <ListItemText primary={entity.name} />
                              </InnerListItem>
                              <Collapse
                                in={
                                  openSecond.state &&
                                  openSecond.id === entity.id
                                }
                                timeout='auto'
                                unmountOnExit
                              >
                                <List>{retrieveDashBoards()}</List>
                              </Collapse>
                            </Fragment>
                          )
                        })}
                      </List>
                    </Collapse>
                  </Fragment>
                )
              })
            : isLoading()}
        </List>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isModalOpen: state.app.isModalOpen,
  token: state.user.token,
  userData: state.user.userData,
  isAuthenticated: state.user.isAuthenticated,
  dashboards: state.user.dashboards,
  dashboard: state.user.dashboard,
})

const ConnectedComponent = connect(mapStateToProps, {
  hideModal,
  showModal,
  getUser,
  saveDashboard,
  getDashboards,
  getDashboard,
  deleteDashboard,
  showNotification,
})(DashboardListPage)

export {ConnectedComponent as DashboardListPage}

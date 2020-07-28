import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {selectTemplate, deleteTemplate} from '../../../actions/userActions'
import {addWidget} from '../../../actions/dashboardActions'
import {showModal} from '../../../actions/appActions'
import Typography, {TypographyProps} from '@material-ui/core/Typography'
import styled from 'styled-components'
import {STEPS} from './Dashboard'
const uuid = require('uuid/v4')
import {showNotification} from '../../../actions/appActions'
import {
  List,
  ListItem,
  Drawer,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'

const StyledTypography = styled(Typography)`
  && {
    font-size: 20px;
    margin: 20px;
    float: left;
    border-bottom: 1px solid black;
  }
` as React.ComponentType<TypographyProps>

const Sidebar = (props: any) => {
  const {
    templates,
    currentStep,
    showModal,
    selectTemplate,
    deleteTemplate,
    addWidget,
    showNotification,
    closeSidebar,
  } = props

  const [isOpen, setIsOpen] = useState(true)

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open)
  }

  function handleAddClick(event: any, template: any) {
    const id = uuid()
    const widgetData = JSON.parse(template.configuration)
    event.stopPropagation()
    const widget = {
      widget: widgetData.data,
      layout: widgetData.layout,
    }
    widget.widget.size = widgetData.size
    widget.widget.style = widgetData.style
    widget.layout.i = id
    widget.widget.id = id
    addWidget(widget)
      .then(() => {
        showNotification('Widget Added', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })
  }

  function handleDeleteClick(event: any, id: string) {
    event.stopPropagation()
    deleteTemplate(id)
      .then(() => {
        showNotification('Widget Deleted', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })
  }
  function handleEditClick(event: any, template: any) {
    event.stopPropagation()
    currentStep(STEPS.selectType)
    selectTemplate(template)
    showModal()
  }

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={() => {
          toggleDrawer(false)
          closeSidebar()
        }}
      >
        <StyledTypography variant='overline'>Templates</StyledTypography>
        <List>
          {templates &&
            templates.map((template: any) => (
              <ListItem key={template.Id}>
                <ListItemText primary={template.Id} />
                <ListItemIcon>
                  <Tooltip title='Add widget to dashboard'>
                    <IconButton
                      onClick={event => handleAddClick(event, template)}
                      aria-label='Add'
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
                <ListItemIcon>
                  <Tooltip title='Edit template'>
                    <IconButton
                      onClick={event => handleEditClick(event, template)}
                      aria-label='Edit'
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
                <ListItemIcon>
                  <Tooltip title='Delete template'>
                    <IconButton
                      onClick={event => handleDeleteClick(event, template.Id)}
                      aria-label='Delete'
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemIcon>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  templates: state.user.templates,
})

const ConnectedComponent = connect(
  mapStateToProps,
  {
    showModal,
    selectTemplate,
    deleteTemplate,
    addWidget,
    showNotification,
  }
)(Sidebar)

export {ConnectedComponent as Sidebar}

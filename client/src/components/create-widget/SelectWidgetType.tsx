import React from 'react'
import styled from 'styled-components'
import {hideModal} from '../../actions/appActions'
import {connect} from 'react-redux'
import {Card, CardContent, Typography, colors, Grid} from '@material-ui/core'
import Button, {ButtonProps} from '@material-ui/core/Button'

import {STEPS} from '../pages/dashboard/Dashboard'

import {
  NumberWidgetPreview,
  ChartWidgetPreview,
  defaultNumberWidgetConfiguration,
  noTickChartWidgetConfiguration,
  defaultWidgetData,
} from './PreviewWidgets'

const WidgetButton = (props: any) => {
  const {type, isSelected, bucket} = props

  return (
    <Card
      style={{
        background: isSelected ? '#3f51b5' : 'inherit',
      }}
    >
      <CardContent>
        <Typography
          variant='overline'
          style={{color: isSelected ? '#fff' : 'inherit', fontSize: 15}}
        >
          {type}
        </Typography>

        {type === 'Number' ? (
          <NumberWidgetPreview
            configuration={defaultNumberWidgetConfiguration}
            data={defaultWidgetData}
            bucket={bucket}
          />
        ) : (
          <ChartWidgetPreview
            configuration={noTickChartWidgetConfiguration}
            data={defaultWidgetData}
            bucket={bucket}
          />
        )}
      </CardContent>
    </Card>
  )
}

const StyledButton = styled(Button)`
  && {
    margin: 10px;
    float: right;
  }
` as React.ComponentType<ButtonProps>

const SelectWidgetType = (props: any) => {
  const {
    availableWidgetTypes,
    currentStep,
    selectedType,
    setSelectedType,
    hideModal,
  } = props

  const handleClick = (type: string) => {
    setSelectedType(selectedType === type ? '' : type)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    currentStep(STEPS.configureWidget)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={32}>
        {availableWidgetTypes.map((type: string) => (
          <Grid key={type} item xs={6} onClick={() => handleClick(type)}>
            <WidgetButton type={type} isSelected={selectedType === type} />
          </Grid>
        ))}
      </Grid>

      <StyledButton
        type='submit'
        variant='text'
        color='primary'
        disabled={!Boolean(selectedType)}
      >
        Configure
      </StyledButton>
      <StyledButton onClick={hideModal} variant='text' color='secondary'>
        Close
      </StyledButton>
    </form>
  )
}

const ConnectedComponent = connect(null, {hideModal})(SelectWidgetType)

export {ConnectedComponent as SelectWidgetType}

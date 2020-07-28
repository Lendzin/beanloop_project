import React, {useState, useEffect} from 'react'
const uuid = require('uuid/v4')
import styled from 'styled-components'
import {connect} from 'react-redux'

import {ColorPicker} from './ColorPicker'
import Select, {SelectProps} from '@material-ui/core/Select'
import Grid, {GridProps} from '@material-ui/core/Grid'
import {formatMetric} from '../../utils/format'
import Typography, {TypographyProps} from '@material-ui/core/Typography'
import {showNotification} from '../../actions/appActions'
import {STEPS} from '../pages/dashboard/Dashboard'
import {hideModal} from '../../actions/appActions'
import Button, {ButtonProps} from '@material-ui/core/Button'

import {
  saveTemplate,
  updateTemplate,
  resetTemplate,
  reRenderNow,
} from '../../actions/userActions'

import {
  ChartWidgetPreview,
  NumberWidgetPreview,
  defaultChartWidgetConfiguration,
  defaultNumberWidgetConfiguration,
  defaultWidgetData,
} from './PreviewWidgets'

import {
  FormControl,
  MenuItem,
  Card,
  CardContent,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'

const StyledButton = styled(Button)`
  && {
    margin: 10px;
    float: right;
  }
` as React.ComponentType<ButtonProps>

const StyledGrid = styled(Grid)`
  text-align: left;
` as React.ComponentType<GridProps>

const StyledSelect = styled(Select)`
  padding: 10px;
` as React.ComponentType<SelectProps>

const StyledTypography = styled(Typography)`
  && {
    margin-top: 20px;
    margin-bottom: -10px;
  }
` as React.ComponentType<TypographyProps>

const StyledDiv = styled('div')`
  margin-top: 20px;
`

const ConfigureWidget = (props: any) => {
  const {
    createWidget,
    availableMetricTypes,
    currentStep,
    data,
    saveTemplate,
    dashboard,
    selectedType,
    template,
    isEdit,
    updateTemplate,
    resetTemplate,
    hideModal,
    reRenderNow,
    showNotification,
    templates,
  } = props

  const getDefaultHeight = () => {
    return selectedType === 'Line' ? 2 : selectedType === 'Number' ? 1 : 0
  }

  const getDefaultWidth = () => {
    return selectedType === 'Line' ? 6 : selectedType === 'Number' ? 1 : 0
  }

  const [templateName, setTemplateName] = useState({
    value: template ? template.Id : '',
    error: '',
  })

  const [title, setTitle] = useState({
    value: template ? JSON.parse(template.configuration).data.title : '',
    error: '',
  })

  const [description, setDescription] = useState({
    value: template ? JSON.parse(template.configuration).data.description : '',
    error: '',
  })

  const [background, setBackground] = useState({
    value: template ? JSON.parse(template.configuration).data.background : '',
    error: '',
  })

  const [metric, setMetric] = useState({
    value: template
      ? JSON.parse(template.configuration).metric
      : availableMetricTypes[0],
    error: '',
  })

  const [width, setWidth] = useState({
    value: template
      ? JSON.parse(template.configuration).layout.w.toString()
      : getDefaultWidth().toString(),
    error: '',
  })

  const [fill, setFill] = useState({
    value:
      template && selectedType === 'Line'
        ? JSON.parse(template.configuration).data.typeConfiguration.fill
        : true,
    error: '',
  })

  const [color, setColor] = useState({
    value:
      template && selectedType === 'Line'
        ? JSON.parse(template.configuration).data.typeConfiguration.colors[0]
        : '',
    error: '',
  })

  const [widgetData, setWidgetData] = useState(defaultWidgetData)

  const [widgetConfiguration, setWidgetConfiguration] = useState(
    template
      ? JSON.parse(template.configuration).data
      : selectedType === 'Line'
      ? JSON.parse(JSON.stringify(defaultChartWidgetConfiguration))
      : JSON.parse(JSON.stringify(defaultNumberWidgetConfiguration))
  )

  useEffect(() => {
    handleMetricTypeChange(metric.value)
  }, [])

  const formatMetricToLegend = (metric: string) => {
    const newMetric = metric.toLowerCase().replace('timeseries', '')
    const firstLetter = metric.slice(0, 1).toUpperCase()
    const theRest = newMetric.slice(1, newMetric.length)
    return firstLetter + theRest
  }

  const handleMetricTypeChange = (newMetric: string) => {
    setMetric({...metric, value: newMetric})

    const currentConfiguration = widgetConfiguration
    const currentData = widgetData

    if (selectedType === 'Line') {
      currentData.series.value = [data[newMetric].events]
      currentConfiguration.source.series = [newMetric]
      currentConfiguration.typeConfiguration.legend = [
        formatMetricToLegend(newMetric),
      ]
    } else {
      currentData.number.value =
        data.marketingNumbers.events[0][newMetric].value
      currentConfiguration.source.number.prop = newMetric
    }

    setWidgetData(currentData)
    setWidgetConfiguration(currentConfiguration)
    reRenderNow(true)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()

    hideModal()

    const id = uuid()

    createWidget({
      widget: {
        ...widgetConfiguration,
        id: id,
        size: width.value,
        style: {flex: Number(width.value)},
      },
      layout: {
        w: parseInt(width.value),
        h: getDefaultHeight(),
        x: null,
        y: null,
        i: id,
      },
    })
  }

  const handleSaveTemplate = () => {
    const template = getTemplateData()
    saveTemplate(template)
      .then(() => {
        setTemplateName({
          ...templateName,
          error: 'Template name already exists',
        })

        showNotification('Template has been saved!', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })
  }

  const handleEditTemplate = () => {
    const template = getTemplateData()
    updateTemplate(template)
      .then(() => {
        showNotification('Template has been updated!', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })

    hideModal()
    resetTemplate()
  }

  const getTemplateData = () => {
    const template = {
      id: templateName.value,
      templateOwnerId: dashboard.templateOwnerId,
      configuration: JSON.stringify({
        size: width.value,
        style: {flex: Number(width.value)},
        data: widgetConfiguration,
        type: selectedType,
        metric: metric.value,
        layout: {
          w: parseInt(width.value),
          h: getDefaultHeight(),
          x: null,
          y: null,
          i: null,
        },
      }),
    }
    return template
  }

  const handleBackgroundChange = (color: any) => {
    setBackground({...background, value: color.hex})

    setWidgetConfiguration({...widgetConfiguration, background: color.hex})
  }

  const handleFillChange = () => {
    const currentConfiguration = widgetConfiguration

    currentConfiguration.typeConfiguration.fill = !fill.value

    setFill({...fill, value: !fill.value})
    setWidgetConfiguration(currentConfiguration)
  }

  const handleColorChange = (color: any) => {
    const currentConfiguration = widgetConfiguration

    currentConfiguration.typeConfiguration.colors = [color.hex]

    setWidgetConfiguration(currentConfiguration)
    setColor({...color, value: color.hex})
  }

  const handleWidthChange = (event: any) => {
    setWidth({...width, value: event.target.value})
  }

  const updateTemplateName = (value: string) => {
    const templateExists = templates
      .map((template: any) => template.Id)
      .includes(value)

    setTemplateName({
      value,
      error:
        value.length > 20
          ? 'Template name is too long (max 20)'
          : templateExists
          ? 'Template name already exists'
          : '',
    })
  }

  const updateWidgetTitle = (value: string) => {
    setTitle({
      value,
      error: value.length > 20 ? 'Widget title is too long (max 20)' : '',
    })
  }

  const handleClose = () => {
    resetTemplate()
    hideModal()
  }

  return (
    <>
      <Grid container spacing={24}>
        <StyledGrid item xs={4}>
          <div style={{marginTop: -30}}>
            <StyledTypography variant='overline'>Title</StyledTypography>
            <TextField
              id='title'
              value={title.value}
              margin='normal'
              variant='outlined'
              error={Boolean(title.error)}
              helperText={title.error}
              onChange={({target}) => {
                updateWidgetTitle(target.value)

                setWidgetConfiguration({
                  ...widgetConfiguration,
                  title: target.value,
                })
              }}
            />
          </div>
          <div>
            <StyledTypography variant='overline'>Description</StyledTypography>
            <TextField
              id='description'
              value={description.value}
              margin='normal'
              variant='outlined'
              onChange={({target}) => {
                setDescription({...description, value: target.value})

                setWidgetConfiguration({
                  ...widgetConfiguration,
                  description: target.value,
                })
              }}
            />
          </div>

          <div>
            <StyledTypography variant='overline'>Metric Type</StyledTypography>

            <FormControl>
              {metric && (
                <StyledSelect
                  value={metric.value}
                  onChange={event => handleMetricTypeChange(event.target.value)}
                  inputProps={{
                    name: 'metric',
                    id: 'metric-type',
                  }}
                >
                  {availableMetricTypes.map((type: string) => (
                    <MenuItem
                      key={type}
                      selected={metric.value === type}
                      value={type}
                    >
                      {formatMetric(type)}
                    </MenuItem>
                  ))}
                </StyledSelect>
              )}
            </FormControl>
          </div>

          <div>
            <StyledTypography variant='overline'>Width</StyledTypography>

            {selectedType === 'Line' ? (
              <FormControl>
                <RadioGroup
                  aria-label='position'
                  name='position'
                  value={width.value}
                  onChange={handleWidthChange}
                  row
                >
                  <FormControlLabel
                    value={'6'}
                    control={<Radio color='primary' />}
                    label='Large'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value={'3'}
                    control={<Radio color='primary' />}
                    label='Small'
                    labelPlacement='end'
                  />
                </RadioGroup>
              </FormControl>
            ) : (
              <FormControl>
                <RadioGroup
                  aria-label='position'
                  name='position'
                  value={width.value}
                  onChange={handleWidthChange}
                  row
                >
                  <FormControlLabel
                    value={'3'}
                    control={<Radio color='primary' />}
                    label='Large'
                    labelPlacement='end'
                  />
                  <FormControlLabel
                    value={'1'}
                    control={<Radio color='primary' />}
                    label='Small'
                    labelPlacement='end'
                  />
                </RadioGroup>
              </FormControl>
            )}
          </div>

          <StyledDiv style={{display: 'flex'}}>
            <StyledTypography variant='overline'>
              Background Color
            </StyledTypography>
            <StyledDiv>
              <ColorPicker
                color={background.value}
                onChangeComplete={handleBackgroundChange}
              />
            </StyledDiv>
          </StyledDiv>

          {selectedType === 'Line' && (
            <StyledDiv style={{display: 'flex'}}>
              <StyledTypography variant='overline'>
                Accent Color
              </StyledTypography>
              <StyledDiv>
                <ColorPicker
                  color={color.value}
                  onChangeComplete={handleColorChange}
                />
              </StyledDiv>
            </StyledDiv>
          )}

          {selectedType === 'Line' && (
            <div style={{display: 'flex', marginTop: 20}}>
              <StyledTypography variant='overline'>
                Fill Accent Color
              </StyledTypography>

              <Checkbox
                style={{marginTop: 10}}
                color='primary'
                checked={fill.value}
                onChange={handleFillChange}
                value='fill'
              />
            </div>
          )}
          {!isEdit && (
            <div>
              <StyledTypography variant='overline'>
                Template name
              </StyledTypography>
              <TextField
                id='templateName'
                value={templateName.value}
                margin='normal'
                variant='outlined'
                error={Boolean(templateName.error)}
                helperText={templateName.error}
                onChange={({target}) => {
                  updateTemplateName(target.value)
                }}
              />
            </div>
          )}
        </StyledGrid>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              {selectedType === 'Line' ? (
                <ChartWidgetPreview
                  data={widgetData}
                  configuration={widgetConfiguration}
                  bucket={data}
                />
              ) : (
                <NumberWidgetPreview
                  data={widgetData}
                  configuration={widgetConfiguration}
                  bucket={data}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {isEdit ? (
        <>
          <StyledButton
            type='submit'
            variant='text'
            onClick={handleEditTemplate}
          >
            Update template
          </StyledButton>

          <StyledButton variant='text' color='secondary' onClick={handleClose}>
            Close
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton
            type='submit'
            variant='text'
            color='primary'
            onClick={handleSubmit}
            disabled={Boolean(title.error)}
          >
            Create
          </StyledButton>

          <StyledButton
            type='submit'
            variant='text'
            onClick={handleSaveTemplate}
            disabled={Boolean(!templateName.value.trim() || templateName.error)}
          >
            Save template
          </StyledButton>

          <StyledButton
            variant='text'
            color='secondary'
            onClick={() => currentStep(STEPS.selectType)}
          >
            Back
          </StyledButton>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  template: state.user.template,
  dashboard: state.user.dashboard,
  isEdit: state.user.isEdit,
  templates: state.user.templates,
})

const ConnectedComponent = connect(
  mapStateToProps,
  {
    saveTemplate,
    updateTemplate,
    resetTemplate,
    hideModal,
    reRenderNow,
    showNotification,
  }
)(ConfigureWidget)

export {ConnectedComponent as ConfigureWidget}

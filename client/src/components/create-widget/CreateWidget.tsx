import React, {useState, useEffect} from 'react'
import {SelectWidgetType} from './SelectWidgetType'
import {ConfigureWidget} from './ConfigureWidget'
import styled from 'styled-components'
import {CardContent} from '@material-ui/core'
import Card, {CardProps} from '@material-ui/core/Card'
import Typography, {TypographyProps} from '@material-ui/core/Typography'
import {STEPS} from '../pages/dashboard/Dashboard'
import {connect} from 'react-redux'
import {addWidget} from '../../actions/dashboardActions'
import {reRenderNow} from '../../actions/userActions'
import {showNotification} from '../../actions/appActions'
import {StyledTypography} from '../shared/StyledTypography'
import {
  widgetTypes,
  numberMetricTypes,
  chartMetricTypes,
} from '../../utils/getTypes'

const StyledCard = styled(Card)`
  margin: 0 auto;
  text-align: center;
  width: 70vw;
  margin-top: -200px;
  padding: 20px 60px;
` as React.ComponentType<CardProps>

const StyledCardContent = styled(CardContent)`
  height: 600px;
  overflow-y: scroll;
` as any

const CreateWidget = (props: any) => {
  const {
    currentStep,
    step,
    template,
    addWidget,
    // bucket,
    reRender,
    reRenderNow,
    showNotification,
  } = props
  const [selectedType, setSelectedType] = useState()

  const bucket = {
    profile: {},
    marketingNumbers: {
      events: [
        {
          totalActions: {
            value: 976,
            timestamp: 1530144000,
          },
          reach: {
            value: 1222,
            timestamp: 1530144000,
          },
          impressions: {
            value: 21,
            timestamp: 1530144000,
          },
        },
      ],
    },
    reachTimeSeries: {
      events: [
        {
          value: 7751,
          timestamp: 1543536000000,
          __typename: 'CommonDataValue',
        },
        {
          value: 9229,
          timestamp: 1543449600000,
          __typename: 'CommonDataValue',
        },
        {
          value: 10499,
          timestamp: 1543363200000,
          __typename: 'CommonDataValue',
        },
        {
          value: 12132,
          timestamp: 1543276800000,
          __typename: 'CommonDataValue',
        },
        {
          value: 10884,
          timestamp: 1543190400000,
          __typename: 'CommonDataValue',
        },
        {
          value: 10756,
          timestamp: 1543104000000,
          __typename: 'CommonDataValue',
        },
        {
          value: 9792,
          timestamp: 1543017600000,
          __typename: 'CommonDataValue',
        },
        {
          value: 7754,
          timestamp: 1542931200000,
          __typename: 'CommonDataValue',
        },
        {
          value: 9298,
          timestamp: 1542844800000,
          __typename: 'CommonDataValue',
        },
        {
          value: 9014,
          timestamp: 1542758400000,
          __typename: 'CommonDataValue',
        },
        {
          value: 5298,
          timestamp: 1542672000000,
        },
        {
          value: 5609,
          timestamp: 1542585600000,
        },
        {
          value: 6668,
          timestamp: 1542499200000,
        },
        {
          value: 6416,
          timestamp: 1542412800000,
        },
        {
          value: 5306,
          timestamp: 1542326400000,
        },
        {
          value: 6004,
          timestamp: 1542240000000,
        },
        {
          value: 6302,
          timestamp: 1542153600000,
        },
        {
          value: 6196,
          timestamp: 1542067200000,
        },
        {
          value: 8698,
          timestamp: 1541980800000,
        },
        {
          value: 7584,
          timestamp: 1541894400000,
        },
        {
          value: 6858,
          timestamp: 1541808000000,
        },
        {
          value: 6280,
          timestamp: 1541721600000,
        },
        {
          value: 6158,
          timestamp: 1541635200000,
        },
        {
          value: 5290,
          timestamp: 1541548800000,
        },
        {
          value: 5418,
          timestamp: 1543536000000,
        },
        {
          value: 5932,
          timestamp: 1541376000000,
        },
        {
          value: 5374,
          timestamp: 1543536000000,
        },
        {
          value: 5284,
          timestamp: 1541203200000,
        },
        {
          value: 5982,
          timestamp: 1541116800000,
        },
        {
          value: 2781,
          timestamp: 1541030400000,
        },
        {
          value: 3787,
          timestamp: 1540944000000,
        },
        {
          value: 4110,
          timestamp: 1540857600000,
        },
        {
          value: 3816,
          timestamp: 1540771200000,
        },
        {
          value: 3649,
          timestamp: 1543536000000,
        },
        {
          value: 3627,
          timestamp: 1540598400000,
        },
        {
          value: 3727,
          timestamp: 1540512000000,
        },
        {
          value: 3677,
          timestamp: 1540425600000,
        },
        {
          value: 3208,
          timestamp: 1543536000000,
        },
        {
          value: 3179,
          timestamp: 1540252800000,
        },
      ],
      __typename: 'ReachTimeSeriesEvents',
    },
    impressionsTimeSeries: {
      events: [
        {
          value: 8335,
          timestamp: 1543536000000,
        },
        {
          value: 9870,
          timestamp: 1543449600000,
        },
        {
          value: 11568,
          timestamp: 1543363200000,
        },
        {
          value: 14185,
          timestamp: 1543276800000,
        },
        {
          value: 12408,
          timestamp: 1543190400000,
        },
        {
          value: 12261,
          timestamp: 1543104000000,
        },
        {
          value: 11334,
          timestamp: 1543017600000,
        },
        {
          value: 8849,
          timestamp: 1542931200000,
        },
        {
          value: 10548,
          timestamp: 1542844800000,
        },
        {
          value: 10053,
          timestamp: 1542758400000,
        },
        {
          value: 5742,
          timestamp: 1542672000000,
        },
        {
          value: 6231,
          timestamp: 1543536000000,
        },
        {
          value: 7238,
          timestamp: 1542499200000,
        },
        {
          value: 7018,
          timestamp: 1542412800000,
        },
        {
          value: 6024,
          timestamp: 1542326400000,
        },
        {
          value: 6739,
          timestamp: 1542240000000,
        },
        {
          value: 6982,
          timestamp: 1543536000000,
        },
        {
          value: 6981,
          timestamp: 1542067200000,
        },
        {
          value: 10008,
          timestamp: 1541980800000,
        },
        {
          value: 8509,
          timestamp: 1541894400000,
        },
        {
          value: 7888,
          timestamp: 1541808000000,
        },
        {
          value: 7372,
          timestamp: 1541721600000,
        },
        {
          value: 7275,
          timestamp: 1541635200000,
        },
        {
          value: 6162,
          timestamp: 1543536000000,
        },
        {
          value: 6557,
          timestamp: 1541462400000,
        },
        {
          value: 6860,
          timestamp: 1541376000000,
        },
        {
          value: 6619,
          timestamp: 1541289600000,
        },
        {
          value: 6750,
          timestamp: 1541203200000,
        },
        {
          value: 7788,
          timestamp: 1541116800000,
        },
        {
          value: 3178,
          timestamp: 1541030400000,
        },
        {
          value: 4431,
          timestamp: 1540944000000,
        },
        {
          value: 4942,
          timestamp: 1543536000000,
        },
        {
          value: 4632,
          timestamp: 1540771200000,
        },
        {
          value: 4567,
          timestamp: 1540684800000,
        },
        {
          value: 4499,
          timestamp: 1540598400000,
        },
        {
          value: 4436,
          timestamp: 1540512000000,
        },
        {
          value: 4456,
          timestamp: 1540425600000,
        },
        {
          value: 3928,
          timestamp: 1540339200000,
        },
        {
          value: 3970,
          timestamp: 1540252800000,
        },
      ],
      __typename: 'ReachTimeSeriesEvents',
    },
  }

  useEffect(() => {
    if (template) {
      currentStep(STEPS.configureWidget)
      setSelectedType(JSON.parse(template.configuration).type)
    }
  }, [])

  const createWidget = (widget: any) => {
    addWidget(widget)
      .then(() => {
        showNotification('Widget Created!', 'success', 3000)
      })
      .catch(() => {
        showNotification('Something went wrong', 'error', 3000)
      })
  }

  const renderNumberWidget = () => {
    reRenderNow(false)
    return reRender ? actualRenderNumberWidget() : actualRenderNumberWidget()
  }
  const actualRenderNumberWidget = () => {
    return (
      <ConfigureWidget
        availableMetricTypes={numberMetricTypes(bucket)}
        createWidget={createWidget}
        currentStep={currentStep}
        data={bucket}
        selectedType={selectedType}
      />
    )
  }
  const renderChartWidget = () => {
    reRenderNow(false)
    return reRender ? actualRenderChartWidget() : actualRenderChartWidget()
  }
  const actualRenderChartWidget = () => {
    return (
      <ConfigureWidget
        availableMetricTypes={chartMetricTypes(bucket)}
        createWidget={createWidget}
        currentStep={currentStep}
        data={bucket}
        selectedType={selectedType}
      />
    )
  }

  return (
    <StyledCard>
      <StyledCardContent>
        <StyledTypography variant='overline'>Add widget</StyledTypography>
        {step === STEPS.selectType && (
          <SelectWidgetType
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            availableWidgetTypes={widgetTypes(bucket)}
            currentStep={currentStep}
            bucket={bucket}
          />
        )}

        {step === STEPS.configureWidget &&
          selectedType === 'Number' &&
          renderNumberWidget()}

        {step === STEPS.configureWidget &&
          selectedType === 'Line' &&
          renderChartWidget()}
      </StyledCardContent>
    </StyledCard>
  )
}

const mapStateToProps = (state: any) => ({
  template: state.user.template,
  bucket: state.user.dashboard.bucket,
  reRender: state.user.reRender,
})

const ConnectedComponent = connect(mapStateToProps, {
  addWidget,
  reRenderNow,
  showNotification,
})(CreateWidget)

export {ConnectedComponent as CreateWidget}

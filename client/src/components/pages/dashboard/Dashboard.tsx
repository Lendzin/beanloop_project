import React, {useState, useEffect} from 'react'
import {Tooltip} from '@material-ui/core'
import Button, {ButtonProps} from '@material-ui/core/Button'
import Fab, {FabProps} from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import AppsIcon from '@material-ui/icons/Apps'
import styled from 'styled-components'
import {CreateWidget} from '../../create-widget/CreateWidget'
import {ModalWrapper} from '../../shared/ModalWrapper'
import {Sidebar} from './Sidebar'
import {showModal, hideModal} from '../../../actions/appActions'
import Card, {CardProps} from '@material-ui/core/Card'
import {connect} from 'react-redux'
import {DashboardGrid} from './DashboardGrid'
import {Dashboard as DashboardRender} from '@beanloop-ab/dashboard-core/dist/src/components/dashboard'
import {Widget} from '@beanloop-ab/dashboard-core/dist/src/widgets/widget'
import {showNotification} from '../../../actions/appActions'
import {getTemplates} from '../../../actions/userActions'
import html2canvas from 'html2canvas'
const jsPDF = require('jspdf')

const StyledButton = styled(Button)`
  && {
    position: fixed;
    left: 0;
    right: 0;
    width: 120px;
    margin-right: auto;
    margin-left: auto;
    bottom: 0;
    margin-bottom: 20px;
    z-index: 100;
  }
` as React.ComponentType<ButtonProps>

const CreateWidgetFab = styled(Fab)`
  && {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 20px;
  }
` as React.ComponentType<FabProps>

const ShowTemplatesFab = styled(Fab)`
  && {
    position: fixed;
    left: 0;
    bottom: 0;
    margin: 20px;
  }
` as React.ComponentType<FabProps>

const WidgetCard = styled(Card)`
  && {
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 40px;
    margin-top: 0px;
    display: flex;
    box-shadow: none;
  }
` as React.ComponentType<CardProps>

const widgetStyles = {
  padding: 30,
  boxSizing: 'content-box',
  margin: 0,
}
const dashboardBase = (props: any) => (
  <WidgetCard>
    <Widget {...props} style={{...widgetStyles, ...props.style}} />
  </WidgetCard>
)

export const STEPS = {
  dashboard: 'DASHBOARD',
  selectType: 'SELECT',
  configureWidget: 'CONFIGURE',
}

const Dashboard = (props: any) => {
  const {
    showModal,
    hideModal,
    isModalOpen,
    dashboard,
    // buckets,
    getTemplates,
  } = props
  const buckets: any = {
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
  const [step, setStep] = useState(STEPS.dashboard)
  const [widgetConfig, setWidgetConfig] = useState()
  const [isDashboard, setIsDashboard] = useState<Boolean>(false)
  const [isSidebar, setSidebar] = useState<Boolean>(false)

  useEffect(() => {
    const {templateOwnerId} = dashboard
    getTemplates(templateOwnerId).catch(() => {
      showNotification('Something went wrong, please reload', 'error', 3000)
    })
  }, [])

  const currentStep = (step: string) => {
    setStep(step)
  }
  const callBackToRender = (renderPressed: Boolean, config: any) => {
    setWidgetConfig(config)
    setIsDashboard(renderPressed)
  }
  function onSidebarClose() {
    setSidebar(false)
  }
  function printPDF() {
    const input = document.getElementById('dashboard')
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('l', 'mm', 'a4')
        var width = pdf.internal.pageSize.getWidth()
        var height = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, 'PNG', 0, 5, width, height)
        pdf.save('dashboard.pdf')
      })
    }
  }

  function renderDashboard() {
    return (
      <div style={{padding: 20}}>
        <span id='dashboard'>
          <DashboardRender
            widgetBaseComponent={dashboardBase}
            buckets={buckets}
            configuration={widgetConfig}
          />
        </span>
        <StyledButton
          variant='outlined'
          color='primary'
          onClick={() => setIsDashboard(false)}
        >
          {' '}
          Return
        </StyledButton>
        <Button variant='outlined' color='primary' onClick={() => printPDF()}>
          {' '}
          Print
        </Button>
      </div>
    )
  }
  function renderGrid() {
    return (
      <>
        <DashboardGrid callBackToRender={callBackToRender} />{' '}
        <Tooltip title='Show templates'>
          <ShowTemplatesFab
            color='secondary'
            aria-label='Sidebar'
            onClick={() => {
              setSidebar(true)
            }}
          >
            <AppsIcon />
          </ShowTemplatesFab>
        </Tooltip>
        {isSidebar && (
          <div style={{padding: 20}}>
            {dashboard && (
              <Sidebar
                closeSidebar={onSidebarClose}
                currentStep={currentStep}
              />
            )}
          </div>
        )}
        <Tooltip title='Create new widget'>
          <CreateWidgetFab
            color='primary'
            aria-label='Add'
            onClick={() => {
              showModal()
              currentStep(STEPS.selectType)
            }}
          >
            <AddIcon />
          </CreateWidgetFab>
        </Tooltip>
      </>
    )
  }

  return (
    <>
      <ModalWrapper isOpen={isModalOpen} handleClose={hideModal}>
        <CreateWidget currentStep={currentStep} step={step} />
      </ModalWrapper>
      <div style={{padding: 20}}>
        {widgetConfig && isDashboard ? renderDashboard() : renderGrid()}
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  isModalOpen: state.app.isModalOpen,
  dashboard: state.user.dashboard,
  buckets: state.user.dashboard.bucket,
})

const ConnectedComponent = connect(mapStateToProps, {
  hideModal,
  showModal,
  getTemplates,
})(Dashboard)

export {ConnectedComponent as Dashboard}

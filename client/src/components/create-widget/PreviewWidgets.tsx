import React from 'react'

import {ChartWidget} from '@beanloop-ab/dashboard-core/dist/src/widgets/chart-widget'
import {NumberWidget} from '@beanloop-ab/dashboard-core/dist/src/widgets/number-widget'

import {colors} from '@material-ui/core'

import {
  ValueType,
  DataWidget,
  ChartType,
} from '@beanloop-ab/dashboard-core/dist/src/lib/entities'
export const defaultBucket: any = {
  marketingNumbers: {
    events: [
      {
        totalActions: {
          value: 475,
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
      },
      {
        value: 9229,
        timestamp: 1543449600000,
      },
      {
        value: 10499,
        timestamp: 1543363200000,
      },
      {
        value: 12132,
        timestamp: 1543276800000,
      },
      {
        value: 10884,
        timestamp: 1543190400000,
      },
      {
        value: 10756,
        timestamp: 1543104000000,
      },
      {
        value: 9792,
        timestamp: 1543017600000,
      },
      {
        value: 7754,
        timestamp: 1542931200000,
      },
      {
        value: 9298,
        timestamp: 1542844800000,
      },
      {
        value: 9014,
        timestamp: 1542758400000,
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
    ],
  },
  impressionsTimeSeries: {
    events: [
      {
        value: 7751,
        timestamp: 1543536000000,
      },
      {
        value: 9229,
        timestamp: 1543449600000,
      },
      {
        value: 10499,
        timestamp: 1543363200000,
      },
      {
        value: 12132,
        timestamp: 1543276800000,
      },
      {
        value: 10884,
        timestamp: 1543190400000,
      },
      {
        value: 10756,
        timestamp: 1543104000000,
      },
      {
        value: 9792,
        timestamp: 1543017600000,
      },
      {
        value: 7754,
        timestamp: 1542931200000,
      },
      {
        value: 9298,
        timestamp: 1542844800000,
      },
      {
        value: 9014,
        timestamp: 1542758400000,
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
    ],
  },
}

export const defaultNumberWidgetConfiguration = {
  background: colors.grey[50],
  type: DataWidget.number,
  title: '',
  description: '',
  descriptionTitle: '',
  source: {
    number: {
      bucket: 'marketingNumbers',
      prop: 'totalActions',
      valueType: ValueType.sum,
    },
  },
}

export const defaultWidgetData = {
  number: {
    value: defaultBucket.marketingNumbers.events[0].totalActions.value,
  },
  series: {
    value: [defaultBucket.reachTimeSeries.events],
  },
}

export const defaultChartWidgetConfiguration = {
  type: DataWidget.chart,
  title: '',
  description: '',
  descriptionTitle: '',
  source: {
    series: ['reachTimeSeries'],
  },
  background: colors.grey[50],
  typeConfiguration: {
    chartType: ChartType.line,
    fill: true,
    colors: [colors.lightBlue[400]],
    tooltip: true,
    animate: true,
    legend: [' '],
  },
}

export const noTickChartWidgetConfiguration = {
  type: DataWidget.chart,
  title: '',
  description: '',
  descriptionTitle: '',
  source: {
    series: ['reachTimeSeries'],
  },
  background: colors.grey[50],
  typeConfiguration: {
    chartType: ChartType.line,
    fill: true,
    colors: [colors.lightBlue[400]],
    xTickComponent: () => null,
    yTickComponent: () => null,
  },
}

export const NumberWidgetPreview = (props: any) => {
  const {bucket, configuration, data} = props

  return (
    <NumberWidget buckets={bucket} configuration={configuration} data={data} />
  )
}

export const ChartWidgetPreview = (props: any) => {
  const {bucket, configuration, data} = props

  return (
    <ChartWidget buckets={bucket} configuration={configuration} data={data} />
  )
}

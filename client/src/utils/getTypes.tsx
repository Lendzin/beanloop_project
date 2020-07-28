export const widgetTypes = (data: any) => {
  const dataKeys = Object.keys(data)

  const types = []

  if (
    dataKeys.includes(
      'impressionsTimeSeries' || 'reachTimeSeries' || 'engagementTimeSeries'
    )
  ) {
    types.push(...['Line'])
  }

  if (dataKeys.includes('marketingNumbers')) {
    types.push(...['Number'])
  }

  return types
}
const chartAllowed = [
  'impressionsTimeSeries',
  'reachTimeSeries',
  'engagementTimeSeries',
]

export const chartMetricTypes = (data: any) => {
  const filtered = Object.keys(data)
    .filter(key => chartAllowed.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = data[key]
      return obj
    }, {})
  const keys = Object.keys(filtered)

  return keys || []
}

const nrMetricNotAllowed = ['__typename', 'marketingVideoInsights']
// TODO: marketingVideoInsights not usable because of different setup, supposedly used in another type of widget, source: 'Rasmus Karlsson @beanloop'

export const numberMetricTypes = (data: any) => {
  const filtered = Object.keys(data.marketingNumbers.events[0])
    .filter(key => !nrMetricNotAllowed.includes(key))
    .reduce((obj: any, key) => {
      obj[key] = data.marketingNumbers.events[0][key]
      return obj
    }, {})

  const metricTypes = Object.keys(filtered)

  return metricTypes || []
}

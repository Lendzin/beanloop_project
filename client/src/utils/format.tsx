export const formatMetric = (metric: String) => {
  return metric
    .replace('TimeSeries', '')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
}

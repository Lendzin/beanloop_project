export const mockConfig = {
  _id: '507f191e810c19729de860ea',
  Id: 'MockTestningsData',
  channelEntityId: 'Mock',
  dashboardName: 'MockDahsboard',
  templateOwnerId: '01',
  adAccountId: 'e988765a4345678',
  owner: 'Studenter pÃ¥ LNU',
  configObject: `{
    type: LayoutWidget.verticalList,
    widgets:
    [
      {
        type: LayoutWidget.horizontalListShort,
        weight: 1,
        widgets: [
          {
            background: '#B4289E',
            type: DataWidget.number,
            source: {
              number: {
                bucket: 'marketingNumbers',
                prop: 'totalActions',
                valueType: ValueType.sum
              }
            },
            title: 'Betalda inläggsinteraktioner',
            isDark: true,
            descriptionTitle: 'A description',
            typeConfiguration: {
              animate: true,
              decimalPlaces: 0
            }
          },
          {
            type: DataWidget.number,
            title: 'Betald räckvidd',
            source: {
              number: {
                bucket: 'marketingNumbers',
                valueType: ValueType.sum,
                prop: 'reach'
              }
            },
            background: '#ED4090',
            isDark: true,
            descriptionTitle: 'Reach description',
            typeConfiguration: {
              decimalPlaces: 0,
              animate: true
            }
          },
          {
            type: DataWidget.number,
            title: 'Betalda visningar',
            source: {
              number: {
                bucket: 'marketingNumbers',
                valueType: ValueType.sum,
                prop: 'impressions'
              }
            },
            background: '#BE4E4E',
            isDark: true,
            description:
                'A very brief description about the impressions metric!',
            descriptionTitle: 'Impressions',
            typeConfiguration: {
              decimalPlaces: 0,
              animate: true
            }
          }
        ]
      },
      {
        type: LayoutWidget.horizontalList,
        weight: 1,
        widgets: [
          {
            type: LayoutWidget.verticalList,
            weight: 1,
            widgets: [
              {
                type: DataWidget.chart,
                title: 'Payed views',
                period: '2019-04-01',
                source: {
                  series: ['reachTimeSeries']
                },
                background: colors.grey[50],
                description:
                    'A very brief description about the impressions metric!',
                descriptionTitle: 'Views',
                typeConfiguration: {
                  chartType: ChartType.line,
                  allowNegativeValues: false,
                  fill: true,
                  smooth: false,
                  tooltip: true,
                  legend: ['Views'],
                  colors: [colors.lightBlue[400]],
                  animate: true,
                  easing: Easing.Poly,
                  duration: 2000
                }
              }
            ]
          }
        ]
      },
      {
        type: LayoutWidget.horizontalList,
        weight: 1,
        widgets: [
          {
            type: LayoutWidget.verticalList,
            weight: 1,
            widgets: [
              {
                type: DataWidget.chart,
                title: 'Payed reach',
                period: '2019-04-01',
                source: {
                  series: ['reachTimeSeries', 'impressionsTimeSeries']
                },
                background: colors.grey[50],
                typeConfiguration: {
                  chartType: ChartType.line,
                  allowNegativeValues: false,
                  fill: false,
                  smooth: true,
                  tooltip: true,
                  legend: ['Reach', 'Impressions'],
                  colors: [colors.teal[400], colors.yellow[400]],
                  animate: true,
                  easing: Easing.Bounce
                },
                transform: {
                  sort: true
                }
              }
            ]
          }
        ]
      }
    ]
  }`,
  bucket: `{\"profile\":{\"image\":\"https://graph.facebook.com/v3.1/615148858651147/picture?width=96&height=96\",
  \"pageProfile\":{\"coverSource\":
  \"https://scontent.xx.fbcdn.net/v/t31.0-8/s720x720/15304416_719016451597720_6955065508645185916_o.png?_nc_cat=110&_nc_ht=scontent.xx&oh=993ab202c4152fc64ac9763a98676a05&oe=5CC09709\",
  \"name\":\"Beanloop\",\"link\":\"https://www.facebook.com/beanloopab/\",
  \"__typename\":\"PageProfile\"},
  \"__typename\":\"Profile\"},\"marketingNumbers\":{\"reach\":{\"value\":92667,\"timestamp\":1531094400,
  \"__typename\":\"CommonDataValue\"},\"clicks\":{\"value\":3210,\"timestamp\":1531094400,
  \"__typename\":\"CommonDataValue\"},\"__typename\":\"MarketingNumbers\"},\"timeseries\":{\"reachTimeSeries\":[{\"value\":7751,\"timestamp\":1543536000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":9229,\"timestamp\":1543449600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":10499,\"timestamp\":1543363200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":12132,\"timestamp\":1543276800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":10884,\"timestamp\":1543190400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":10756,\"timestamp\":1543104000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":9792,\"timestamp\":1543017600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7754,\"timestamp\":1542931200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":9298,\"timestamp\":1542844800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":9014,\"timestamp\":1542758400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5298,\"timestamp\":1542672000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5609,\"timestamp\":1542585600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6668,\"timestamp\":1542499200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6416,\"timestamp\":1542412800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5306,\"timestamp\":1542326400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6004,\"timestamp\":1542240000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6302,\"timestamp\":1542153600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6196,\"timestamp\":1542067200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":8698,\"timestamp\":1541980800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7584,\"timestamp\":1541894400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6858,\"timestamp\":1541808000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6280,\"timestamp\":1541721600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6158,\"timestamp\":1541635200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5290,\"timestamp\":1541548800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5418,\"timestamp\":1541462400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5932,\"timestamp\":1541376000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5374,\"timestamp\":1541289600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5284,\"timestamp\":1541203200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5982,\"timestamp\":1541116800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":2781,\"timestamp\":1541030400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3787,\"timestamp\":1540944000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4110,\"timestamp\":1540857600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3816,\"timestamp\":1540771200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3649,\"timestamp\":1540684800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3627,\"timestamp\":1540598400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3727,\"timestamp\":1540512000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3677,\"timestamp\":1540425600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3208,\"timestamp\":1540339200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3179,\"timestamp\":1540252800000,
  \"__typename\":\"CommonDataValue\"}],\"impressionsTimeSeries\":[{\"value\":8335,\"timestamp\":1543536000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":9870,\"timestamp\":1543449600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":11568,\"timestamp\":1543363200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":14185,\"timestamp\":1543276800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":12408,\"timestamp\":1543190400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":12261,\"timestamp\":1543104000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":11334,\"timestamp\":1543017600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":8849,\"timestamp\":1542931200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":10548,\"timestamp\":1542844800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":10053,\"timestamp\":1542758400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":5742,\"timestamp\":1542672000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6231,\"timestamp\":1542585600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7238,\"timestamp\":1542499200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7018,\"timestamp\":1542412800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6024,\"timestamp\":1542326400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6739,\"timestamp\":1542240000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6982,\"timestamp\":1542153600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6981,\"timestamp\":1542067200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":10008,\"timestamp\":1541980800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":8509,\"timestamp\":1541894400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7888,\"timestamp\":1541808000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7372,\"timestamp\":1541721600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7275,\"timestamp\":1541635200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6162,\"timestamp\":1541548800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6557,\"timestamp\":1541462400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6860,\"timestamp\":1541376000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6619,\"timestamp\":1541289600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":6750,\"timestamp\":1541203200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":7788,\"timestamp\":1541116800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3178,\"timestamp\":1541030400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4431,\"timestamp\":1540944000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4942,\"timestamp\":1540857600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4632,\"timestamp\":1540771200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4567,\"timestamp\":1540684800000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4499,\"timestamp\":1540598400000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4436,\"timestamp\":1540512000000,
  \"__typename\":\"CommonDataValue\"},{\"value\":4456,\"timestamp\":1540425600000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3928,\"timestamp\":1540339200000,
  \"__typename\":\"CommonDataValue\"},{\"value\":3970,\"timestamp\":1540252800000,
  \"__typename\":\"CommonDataValue\"}],\"__typename\":\"Timeseries\"},\"__typename\":\"MarketingData\"}`,
}

export const mockTemplateData = {
  Id: 'Template Id',
  templateOwnerId: '43',
  name: 'Template Name',
  owner: 'Studenter pÃ¥ LNU',
  configuration: `
  {\"data\":{\"type\":\"chart\",\"title\":\"asd\",\"description\":\"asd\",
  \"descriptionTitle\":\"\",\"source\":{\"series\":[\"reachTimeSeries\"]},
  \"background\":\"#fafafa\",\"typeConfiguration\":{\"chartType\":\"line\",
  \"fill\":true,\"colors\":[\"#29b6f6\"]}},\"type\":\"Line\",\"metric\":
  \"reachTimeSeries\"}
  `,
}

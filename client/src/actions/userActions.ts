import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import {
  SIGN_IN,
  SIGN_OUT,
  GET_USER,
  SAVE_DASHBOARD,
  GET_DASHBOARDS,
  GET_DASHBOARD,
  DELETE_DASHBOARD,
  SAVE_TEMPLATE,
  GET_TEMPLATES,
  SELECT_TEMPLATE,
  DELETE_TEMPLATE,
  RESET_TEMPLATE,
  UPDATE_TEMPLATE,
  RERENDER,
  RESET_DASHBOARD_STATE,
} from './types'
import store from '../store'
import history from '../utils/history'

// function getToken() {
//   const {user} = store.getState()
//   const token = user.token
//   return token
// }

// const authClient = new ApolloClient({
//   uri: 'https://lst1kmm898.execute-api.eu-west-1.amazonaws.com/dev/graphql',
// })
// const dashboardClient = new ApolloClient({
//   uri:
//     'https://mgll41092m.execute-api.eu-west-1.amazonaws.com/dev/create-dashboards',
// })

// const bucketsClient = new ApolloClient({
//   uri: 'https://marketing-service.beanloop.se/',
// })

// const AUTH_QUERY = gql`
//   mutation SignIn($username: String!, $password: String!) {
//     authenticateUser(username: $username, password: $password) {
//       IdToken
//     }
//   }
// `

// const GET_BUCKETS_DATA = gql`
//   query(
//     $pageId: String!
//     $adAccountId: String!
//     $accessToken: String!
//     $startDate: Date!
//     $endDate: Date!
//   ) {
//     getMarketingData(
//       pageId: $pageId
//       adAccountId: $adAccountId
//       userToken: $accessToken
//       since: $startDate
//       until: $endDate
//     ) {
//       profile {
//         events {
//           marketingProfile {
//             timestamp
//             spent
//             lifetimeBudget
//           }
//           pageProfile {
//             name
//             link
//             coverSource
//           }
//           image
//         }
//       }
//       marketingNumbers {
//         events {
//           reach {
//             value
//             timestamp
//           }
//           totalActions {
//             value
//             timestamp
//           }
//           impressions {
//             value
//             timestamp
//           }
//           clicks {
//             value
//             timestamp
//           }
//           ctr {
//             value
//             timestamp
//           }
//           cpc {
//             value
//             timestamp
//           }
//           cpm {
//             value
//             timestamp
//           }
//           spend {
//             value
//             timestamp
//           }
//           marketingVideoInsights {
//             videoAvgPercentWatchedActions
//             video10SecWatchedActions
//             videoP100WatchedActions
//           }
//         }
//       }
//       adsPixel {
//         events {
//           Purchase
//           Lead
//           CompleteRegistration
//           AddPaymentInfo
//           AddToCart
//           AddToWishlist
//           InitiateCheckout
//           Search
//           ViewContent
//           Contact
//           CustomizeProduct
//           Donate
//           FindLocation
//           Schedule
//           StartTrial
//           SubmitApplication
//           Subscribe
//           PageView
//         }
//       }
//       reachTimeSeries {
//         events {
//           value
//           timestamp
//         }
//       }
//       impressionsTimeSeries {
//         events {
//           value
//           timestamp
//         }
//       }
//       engagementTimeSeries {
//         events {
//           value
//           timestamp
//         }
//       }
//       campaigns
//       calendarCampaigns
//     }
//   }
// `

// const USER_QUERY = gql`
//   query {
//     getUserView {
//       id
//       name
//       agency {
//         id
//         name
//       }
//       brands {
//         id
//         name
//         image
//         channelEntities {
//           id
//           name
//           image
//           type
//           networkId
//           accessToken
//           adAccount {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// `

// const SAVE_TEMPLATE_QUERY = gql`
//   mutation(
//     $id: String!
//     $templateOwnerId: String!
//     $configuration: String!
//     $token: String!
//   ) {
//     addTemplate(
//       userToken: $token
//       Arguments: {
//         Id: $id
//         templateOwnerId: $templateOwnerId
//         name: ""
//         configuration: $configuration
//       }
//     ) {
//       Id
//       templateOwnerId
//       configuration
//     }
//   }
// `

// const GET_TEMPLATES_QUERY = gql`
//   query($templateOwnerId: String!, $token: String!) {
//     getOwnerTemplates(templateOwnerId: $templateOwnerId, userToken: $token) {
//       Id
//       configuration
//     }
//   }
// `

// const SAVE_DASHBOARD_QUERY = gql`
//   mutation(
//     $id: String!
//     $entityId: String!
//     $name: String!
//     $templateOwnerId: String!
//     $jsonBucket: String!
//     $token: String!
//   ) {
//     addDashboardConfig(
//       userToken: $token
//       Arguments: {
//         Id: $id
//         channelEntityId: $entityId
//         dashboardName: $name
//         templateOwnerId: $templateOwnerId
//         bucket: $jsonBucket
//       }
//     ) {
//       Id
//       dashboardName
//     }
//   }
// `
// const DELETE_DASHBOARD_QUERY = gql`
//   mutation($id: String!, $token: String!) {
//     deleteDashboardConfig(Id: $id, userToken: $token) {
//       Id
//       dashboardName
//     }
//   }
// `

// const UPDATE_DASHBOARD_QUERY = gql`
//   mutation(
//     $Id: String!
//     $channelEntityId: String!
//     $dashboardName: String!
//     $templateOwnerId: String!
//     $jsonConfig: String!
//     $jsonBucket: String!
//     $token: String!
//   ) {
//     editDashboardConfig(
//       userToken: $token
//       Id: $Id
//       EditData: {
//         channelEntityId: $channelEntityId
//         dashboardName: $dashboardName
//         templateOwnerId: $templateOwnerId
//         adAccountId: ""
//         configObject: $jsonConfig
//         bucket: $jsonBucket
//       }
//     ) {
//       Id
//       dashboardName
//     }
//   }
// `

// const DELETE_TEMPLATE_QUERY = gql`
//   mutation($id: String!, $token: String!) {
//     deleteTemplate(Id: $id, userToken: $token) {
//       Id
//       name
//     }
//   }
// `
// //TODO: FIX THIS!"
// const UPDATE_TEMPLATE_QUERY = gql`
//   mutation(
//     $id: String!
//     $templateOwnerId: String!
//     $configuration: String!
//     $token: String!
//   ) {
//     editTemplate(
//       userToken: $token
//       Id: $id
//       EditData: {
//         templateOwnerId: $templateOwnerId
//         name: ""
//         configuration: $configuration
//       }
//     ) {
//       Id
//       templateOwnerId
//       configuration
//     }
//   }
// `

// const GET_DASHBOARD_QUERY = gql`
//   query($id: String!, $token: String!) {
//     getDashboardConfig(Id: $id, userToken: $token) {
//       Id
//       channelEntityId
//       dashboardName
//       templateOwnerId
//       configObject
//       bucket
//     }
//   }
// `
// const GET_DASHBOARDS_QUERY = gql`
//   query($id: String!, $token: String!) {
//     getDashboardsForEntity(channelEntityId: $id, userToken: $token) {
//       Id
//       dashboardName
//       configObject
//     }
//   }
// `

export const signIn = (username: string, password: string) => async (
  dispatch: any
) => {
  try {
    // const {data} = await authClient.mutate({
    //   mutation: AUTH_QUERY,
    //   variables: {username, password},
    // })
    const data = {
      authenticateUser: {
        IdToken: '',
      },
    }

    if (
      username === 'login_unchanged_works' &&
      password === 'password_unchanged_works'
    ) {
      data.authenticateUser.IdToken = 'yesToken'
      dispatch({
        type: SIGN_IN,
        payload: data.authenticateUser.IdToken,
      })

      history.push('/')

      return true
    } else {
      data.authenticateUser.IdToken = 'noToken'
      return false
    }
  } catch (err) {
    return false
  }
}

export const signOut = () => async (dispatch: any) => {
  dispatch({
    type: SIGN_OUT,
    payload: null,
  })

  history.push('/')
}

export const getUser = (idToken: string) => async (dispatch: any) => {
  // const userClient = new ApolloClient({
  //   uri: 'https://tyycdxr0sb.execute-api.eu-west-1.amazonaws.com/dev/graphql',
  //   headers: {
  //     authorization: idToken ? `Bearer ${idToken}` : '',
  //   },
  // })

  // const {data} = await userClient.query({
  //   query: USER_QUERY,
  // })

  const data = {
    getUserView: {
      id: '123',
      name: 'guest',
      agency: {
        id: '1234',
        name: 'guestagency',
      },
      brands: [
        {
          id: '1',
          name: 'guestbrand1',
          image:
            'https://1.bp.blogspot.com/-xfZ-qzG3Y_U/VuDoUu4gl4I/AAAAAAAAAIw/JiX_55duj_M/s1600/00205-3D-art-logo-design-free-logos-online-011.png',
          channelEntities: [
            {
              id: '1123456',
              name: 'guestentity1',
              image:
                'https://ping.design/wp-content/uploads/2016/09/20160929-Free-Logos-11.jpg',
              type: 'test',
              networkId: 'test1',
              accessToken: 'none',
              adAccount: {
                id: '1234567',
                name: 'guestAdAccount1',
              },
            },
            {
              id: '112234567',
              name: 'guestentity112',
              image:
                'http://www.bardfieldacademy.org/wp-content/uploads/2016/08/00106-3D-company-logos-design-free-logo-online-02.png',
              type: 'test11',
              networkId: 'test11',
              accessToken: 'none',
              adAccount: {
                id: '11234567',
                name: 'guestAdAccount11',
              },
            },
          ],
        },
        {
          id: '2',
          name: 'guestbrand2',
          image:
            'https://amtech3d.com/wp-content/uploads/2013/05/00111-Abstract-logos-design-free-logo-online-01.png',
          channelEntities: [
            {
              id: '12234562',
              name: 'guestentity2',
              image:
                'https://ping.design/wp-content/uploads/2016/09/20160929-Free-Logos-8.jpg',
              type: 'test',
              networkId: 'test2',
              accessToken: 'none',
              adAccount: {
                id: '1234567',
                name: 'guestAdAccount21',
              },
            },
            {
              id: '122345622',
              name: 'guestentity21',
              image:
                'https://ping.design/wp-content/uploads/2016/09/20160929-Free-Logos-9.jpg',
              type: 'test21',
              networkId: 'test21',
              accessToken: 'none',
              adAccount: {
                id: '12234567',
                name: 'guestAdAccount22',
              },
            },
          ],
        },
      ],
    },
  }

  dispatch({
    type: GET_USER,
    payload: data.getUserView,
  })
}

export const saveDashboard = (config: any) => async (dispatch: any) => {
  const {
    id,
    entityId,
    name,
    pageId,
    adAccountId,
    accessToken,
    endDate,
    startDate,
    templateOwnerId,
  } = config
  // const buckets = await bucketsClient.query({
  //   query: GET_BUCKETS_DATA,
  //   fetchPolicy: 'network-only',
  //   variables: {pageId, adAccountId, accessToken, startDate, endDate},
  // })

  //  const jsonBucket = JSON.stringify(buckets.data.getMarketingData)
  // const token = getToken()
  // const {data} = await dashboardClient.mutate({
  //   mutation: SAVE_DASHBOARD_QUERY,
  //   variables: {id, entityId, name, templateOwnerId, jsonBucket, token},
  // })

  const data = {addDashboardConfig: {Id: id, dashboardName: name}}

  dispatch({
    type: SAVE_DASHBOARD,
    payload: data.addDashboardConfig,
  })
}

export const getDashboards = (id: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.query({
  //   query: GET_DASHBOARDS_QUERY,
  //   fetchPolicy: 'network-only',
  //   variables: {id, token},
  // })

  const data = {
    getDashboardsForEntity: [
      {
        Id: id,
        dashboardName: 'emptydashboard',
      },
    ],
  }

  dispatch({
    type: GET_DASHBOARDS,
    payload: data.getDashboardsForEntity,
  })
}

export const getDashboard = (id: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.query({
  //   query: GET_DASHBOARD_QUERY,
  //   fetchPolicy: 'network-only',
  //   variables: {id, token},
  // })

  const data = {
    getDashboardConfig: {
      Id: 'id1',
      channelEntityId: 'guestentity',
      dashboardName: 'guestdashboard',
      templateOwnerId: 'guest',
      bucket: {
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
      },
    },
  }

  // if (
  //   data.getDashboardConfig.bucket &&
  //   typeof data.getDashboardConfig.bucket === typeof 'string'
  // ) {
  //   data.getDashboardConfig.bucket = await JSON.parse(
  //     data.getDashboardConfig.bucket
  //   )
  // }
  // if (
  //   data.getDashboardConfig.configObject &&
  //   typeof data.getDashboardConfig.configObject === typeof 'string'
  // ) {
  //   data.getDashboardConfig.configObject = await JSON.parse(
  //     data.getDashboardConfig.configObject
  //   )
  // }

  dispatch({
    type: GET_DASHBOARD,
    payload: data.getDashboardConfig,
  })

  history.push('/dashboard')
}

export const resetDashboardState = () => (dispatch: any) => {
  dispatch({
    type: RESET_DASHBOARD_STATE,
    payload: {},
  })
}

export const deleteDashboard = (id: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.mutate({
  //   mutation: DELETE_DASHBOARD_QUERY,
  //   variables: {id, token},
  // })
  const data = {
    deleteDashboardConfig: {
      Id: id,
      dashboardName: 'guestdashboard',
    },
  }

  dispatch({
    type: DELETE_DASHBOARD,
    payload: data.deleteDashboardConfig,
  })
}

export const updateDashboard = (object: any, config: any) => async () => {
  //   const token = getToken()
  //   const {Id, channelEntityId, dashboardName, templateOwnerId, bucket} = object
  //   const jsonConfig = JSON.stringify(config)
  //   const jsonBucket = JSON.stringify(bucket)
  //   const {data} = await dashboardClient.mutate({
  //     mutation: UPDATE_DASHBOARD_QUERY,
  //     variables: {
  //       Id,
  //       channelEntityId,
  //       dashboardName,
  //       templateOwnerId,
  //       jsonConfig,
  //       jsonBucket,
  //       token,
  //     },
  //   })
}

export const saveTemplate = (template: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.mutate({
  //   mutation: SAVE_TEMPLATE_QUERY,
  //   variables: {...template, token},
  // })
  const data = {
    addTemplate: {
      Id: template.id,
      templateOwnerId: template.templateOwnerId,
      configuration: template.configuration,
    },
  }

  dispatch({
    type: SAVE_TEMPLATE,
    payload: data.addTemplate,
  })
}

export const getTemplates = (templateOwnerId: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.query({
  //   query: GET_TEMPLATES_QUERY,
  //   fetchPolicy: 'network-only',
  //   variables: {templateOwnerId, token},
  // })
  const data = {getOwnerTemplates: []}
  dispatch({
    type: GET_TEMPLATES,
    payload: data.getOwnerTemplates,
  })
}

export const selectTemplate = (template: any) => async (dispatch: any) => {
  dispatch({
    type: SELECT_TEMPLATE,
    payload: template,
  })
}
export const resetTemplate = () => async (dispatch: any) => {
  dispatch({
    type: RESET_TEMPLATE,
    payload: null,
  })
}

export const deleteTemplate = (id: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.mutate({
  //   mutation: DELETE_TEMPLATE_QUERY,
  //   variables: {id, token},
  // })

  const data = {
    deleteTemplate: {
      Id: id,
      name: 'guestTemplate',
    },
  }

  dispatch({
    type: DELETE_TEMPLATE,
    payload: data.deleteTemplate,
  })
}

export const updateTemplate = (template: any) => async (dispatch: any) => {
  // const token = getToken()
  // const {data} = await dashboardClient.mutate({
  //   mutation: UPDATE_TEMPLATE_QUERY,
  //   variables: {...template, token},
  // })

  const data = {
    editTemplate: {
      Id: template.id,
      templateOwnerId: template.templateOwnerId,
      configuration: template.configuration,
    },
  }

  dispatch({
    type: UPDATE_TEMPLATE,
    payload: data.editTemplate,
  })
}

export const reRenderNow = (state: Boolean) => (dispatch: any) => {
  dispatch({
    type: RERENDER,
    payload: state,
  })
}

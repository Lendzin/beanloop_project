import {graphql} from 'graphql'
import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools'
import {typeDefs} from '../src/models/graphQL/typeDefs'

const GetAgencyConfigsQuery = {
  id: 'GetDashboardConfigs Query',
  query: `
    query{
      getDashboardConfig(Id:"id", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf") {
        Id
        channelEntityId
        dashboardName
        templateOwnerId
        adAccountId
        configObject
        bucket
            }
          }
    `,
  expected: {
    data: {
      getDashboardConfig: {
        Id: 'TestData',
        channelEntityId: 'TestData',
        dashboardName: 'TestData',
        templateOwnerId: 'TestData',
        adAccountId: 'TestData',
        configObject: 'TestData',
        bucket: 'TestData',
      },
    },
  },
}

const getDashboardsForEntity = {
  id: 'getDashboardsForEntity',
  query: `
    query{
      getDashboardsForEntity(channelEntityId:"channelEntityId" , userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf") {
        Id
        channelEntityId
        dashboardName
        templateOwnerId
        adAccountId
        configObject
        bucket
            }
          }
    `,
  expected: {
    data: {
      getDashboardsForEntity: [
        {
          Id: 'TestData',
          channelEntityId: 'TestData',
          dashboardName: 'TestData',
          templateOwnerId: 'TestData',
          adAccountId: 'TestData',
          configObject: 'TestData',
          bucket: 'TestData',
        },
        {
          Id: 'TestData',
          channelEntityId: 'TestData',
          dashboardName: 'TestData',
          templateOwnerId: 'TestData',
          adAccountId: 'TestData',
          configObject: 'TestData',
          bucket: 'TestData',
        },
      ],
    },
  },
}

const addDashboardConfigMutation = {
  id: 'Add DashboardConfig Mutation',
  query: `
    mutation {
      addDashboardConfig(userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf",
      Arguments: {
        Id:"dashboardName String"
        channelEntityId:"templateOwnerId String"
        dashboardName:"adAccountId String"
        templateOwnerId:"Config String"
        adAccountId: "Bucket String"
        configObject: "Config String"
        bucket: "Bucket string"
        }) {
          Id
          channelEntityId
          dashboardName
          templateOwnerId
          adAccountId
          configObject
          bucket
        }
      }
    `,
  expected: {
    data: {
      addDashboardConfig: {
        Id: 'TestData',
        channelEntityId: 'TestData',
        dashboardName: 'TestData',
        templateOwnerId: 'TestData',
        adAccountId: 'TestData',
        configObject: 'TestData',
        bucket: 'TestData',
      },
    },
  },
}

const DeleteAgencyConfigsQuery = {
  id: 'deleteDashboardConfig',
  query: `
  mutation{
      deleteDashboardConfig(Id:"id", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf") {
        Id
        channelEntityId
        dashboardName
        templateOwnerId
        adAccountId
        configObject
        bucket
            }
          }
    `,
  expected: {
    data: {
      deleteDashboardConfig: {
        Id: 'TestData',
        channelEntityId: 'TestData',
        dashboardName: 'TestData',
        templateOwnerId: 'TestData',
        adAccountId: 'TestData',
        configObject: 'TestData',
        bucket: 'TestData',
      },
    },
  },
}

const EditAgencyConfigsQuery = {
  id: 'editDashboardConfig',
  query: `
  mutation{
    editDashboardConfig(Id:"id", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf",
    EditData: {
      channelEntityId:"templateOwnerId String"
      dashboardName:"adAccountId String"
      templateOwnerId:"Config String"
      adAccountId: "Bucket String"
      configObject: "Config String"
      bucket: "Bucket string"
    }) {
        Id
        channelEntityId
        dashboardName
        templateOwnerId
        adAccountId
        configObject
        bucket
        }
    }
    `,
  expected: {
    data: {
      editDashboardConfig: {
        Id: 'TestData',
        channelEntityId: 'TestData',
        dashboardName: 'TestData',
        templateOwnerId: 'TestData',
        adAccountId: 'TestData',
        configObject: 'TestData',
        bucket: 'TestData',
      },
    },
  },
}

describe('GraphQLDashboardConfigTest', () => {
  const cases = [
    GetAgencyConfigsQuery,
    getDashboardsForEntity,
    addDashboardConfigMutation,
    DeleteAgencyConfigsQuery,
    EditAgencyConfigsQuery,
  ]
  const mockSchema = makeExecutableSchema({typeDefs})

  addMockFunctionsToSchema({
    schema: mockSchema,
    mocks: {
      String: () => 'TestData',
    },
  })

  cases.forEach(TestCase => {
    const {id, query, expected} = TestCase

    test(`GraphQLTestCase: ${id}`, async () => {
      return await expect(graphql(mockSchema, query)).resolves.toEqual(expected)
    })
  })
})

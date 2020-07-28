import {resolvers} from '../src/models/graphQL/resolvers'
import {mockConfig} from './Mocks/mockData'

import mockingoose from 'mockingoose'
import {config} from '../src/models/mongoose/configMoongooseSchema'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTg2ODg5MzgsImV4cCI6MTU5MDIyNDkzOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdHVkZW50ZXIgcMOlIExOVSJ9.QD1E2iUrOlw1fkVdHno-QqGAcr08v_g7KXVqb8J8mgI'
describe('GraphQLDashboardConfigResolver', () => {
  mockingoose(config)
    .toReturn(mockConfig, 'findOne')
    .toReturn(mockConfig, 'save')
    .toReturn(mockConfig, 'findOneAndDelete')
    .toReturn([mockConfig, mockConfig], 'find')

  test('`GraphQLDashboardConfigResolver: getDashboardConfig', async () => {
    const actual = await resolvers.Query.getDashboardConfig(null, {
      Id: 'test',
      userToken: token,
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(mockConfig)
  })

  test('`GraphQLDashboardConfigResolver: getDashboardsForEntity', async () => {
    const actual = await resolvers.Query.getDashboardsForEntity(null, {
      channelEntityId: 'test',
      userToken: token,
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject([
      mockConfig,
      mockConfig,
    ])
  })

  test('`GraphQLDashboardConfigResolver: addDashboardConfig', async () => {
    const actual = await resolvers.Mutation.addDashboardConfig(null, {
      userToken: token,
      Arguments: {
        Id: 'testData',
        channelEntityId: 'testData',
        dashboardName: 'testData',
        templateOwnerId: 'testData',
        adAccountId: 'testData',
        configObject: 'testData',
        bucket: 'testData',
      },
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(mockConfig)
  })

  test('`GraphQLDashboardConfigResolver: deleteDashboardConfig', async () => {
    const actual = await resolvers.Mutation.deleteDashboardConfig(null, {
      Id: 'test',
      userToken: token,
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(mockConfig)
  })

  test('`GraphQLDashboardConfigResolver: editDashboardConfig', async () => {
    const actual = await resolvers.Mutation.editDashboardConfig(null, {
      Id: 'test',
      userToken: token,
      EditData: {
        channelEntityId: 'New data',
        dashboardName: 'New data',
        templateOwnerId: 'New data',
        adAccountId: 'New data',
        configObject: 'New data',
        bucket: 'New data',
      },
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(mockConfig)
  })
})

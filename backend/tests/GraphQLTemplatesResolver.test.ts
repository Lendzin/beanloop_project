import {resolvers} from '../src/models/graphQL/resolvers'
import {mockTemplateData} from './Mocks/mockData'

import mockingoose from 'mockingoose'
import {Template} from '../src/models/mongoose/configMoongooseSchema'

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NTg2ODg5MzgsImV4cCI6MTU5MDIyNDkzOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIm5hbWUiOiJTdHVkZW50ZXIgcMOlIExOVSJ9.QD1E2iUrOlw1fkVdHno-QqGAcr08v_g7KXVqb8J8mgI'

describe('GraphQLDashboardTemplateResolver', () => {
  mockingoose(Template)
    .toReturn(mockTemplateData, 'findOne')
    .toReturn(mockTemplateData, 'save')
    .toReturn(mockTemplateData, 'findOneAndDelete')
    .toReturn([mockTemplateData, mockTemplateData], 'find')

  test('`GraphQLDashboardTemplateResolver: getTemplate', async () => {
    const actual = await resolvers.Query.getTemplate(null, {
      Id: 'test',
      userToken: token,
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(
      mockTemplateData
    )
  })

  test('`GraphQLDashboardTemplateResolver: getOwnerTemplates', async () => {
    const actual = await resolvers.Query.getOwnerTemplates(null, {
      templateOwnerId: 'test',
      userToken: token,
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject([
      mockTemplateData,
      mockTemplateData,
    ])
  })

  test('`GraphQLDashboardTemplateResolver: addTemplate', async () => {
    const actual = await resolvers.Mutation.addTemplate(null, {
      userToken: token,
      Arguments: {
        Id: 'testData',
        templateOwnerId: 'testData',
        name: 'testData',
        configuration: 'testData',
      },
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(
      mockTemplateData
    )
  })

  test('`GraphQLDashboardTemplateResolver: deleteTemplate', async () => {
    const actual = await resolvers.Mutation.deleteTemplate(null, {
      Id: 'test',
      userToken: token,
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(
      mockTemplateData
    )
  })

  test('`GraphQLDashboardTemplateResolver: editTemplate', async () => {
    const actual = await resolvers.Mutation.editTemplate(null, {
      Id: 'test',
      userToken: token,
      EditData: {
        templateOwnerId: 'New data',
        name: 'New data',
        configuration: 'New data',
      },
    })
    return expect(JSON.parse(JSON.stringify(actual))).toMatchObject(
      mockTemplateData
    )
  })

  test('`GraphQLDashboardTemplateResolver: editTemplate', async () => {
    mockingoose(Template).reset()

    const actual = await resolvers.Mutation.editTemplate(null, {
      Id: 'test',
      userToken: token,
      EditData: {
        templateOwnerId: 'New data',
        name: 'New data',
        configuration: 'New data',
      },
    })

    return expect(actual).toEqual(expect.any(Error))
  })
})

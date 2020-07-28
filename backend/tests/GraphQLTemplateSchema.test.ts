import {graphql} from 'graphql'
import {addMockFunctionsToSchema, makeExecutableSchema} from 'graphql-tools'
import {typeDefs} from '../src/models/graphQL/typeDefs'

const getTemplate = {
  id: 'getTemplate',
  query: `
    query{
        getTemplate(Id:"id", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf") {
            Id
            templateOwnerId
            name
            configuration
          }
      }
      `,
  expected: {
    data: {
      getTemplate: {
        Id: 'TestData',
        templateOwnerId: 'TestData',
        configuration: 'TestData',
        name: 'TestData',
      },
    },
  },
}

const getOwnerTemplates = {
  id: 'getOwnerTemplates',
  query: `
      query{
        getOwnerTemplates(templateOwnerId:"templateOwnerId", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf") {
              Id
              templateOwnerId
              name
              configuration
            }
        }
        `,
  expected: {
    data: {
      getOwnerTemplates: [
        {
          Id: 'TestData',
          templateOwnerId: 'TestData',
          configuration: 'TestData',
          name: 'TestData',
        },
        {
          Id: 'TestData',
          templateOwnerId: 'TestData',
          configuration: 'TestData',
          name: 'TestData',
        },
      ],
    },
  },
}

const addTemplate = {
  id: 'addTemplate',
  query: `
      mutation{
        addTemplate(userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf",
        Arguments: {
            Id: "Id"
            templateOwnerId: "templateOwnerId"
            name: "name"
            configuration: "configuration"
        }) {
              Id
              templateOwnerId
              name
              configuration
            }
        }
        `,
  expected: {
    data: {
      addTemplate: {
        Id: 'TestData',
        templateOwnerId: 'TestData',
        configuration: 'TestData',
        name: 'TestData',
      },
    },
  },
}

const deleteTemplate = {
  id: 'deleteTemplate',
  query: `
      mutation{
        deleteTemplate(Id:"id", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf") {
              Id
              templateOwnerId
              name
              configuration
            }
        }
        `,
  expected: {
    data: {
      deleteTemplate: {
        Id: 'TestData',
        templateOwnerId: 'TestData',
        configuration: 'TestData',
        name: 'TestData',
      },
    },
  },
}

const editTemplate = {
  id: 'editTemplate',
  query: `
        mutation{
            editTemplate(Id:"id", userToken: "jashdhajfahjsfgasf.asfdasfsaf.sadfasdfasf",
            EditData: {
                templateOwnerId: "new"
                name: "new"
                configuration: "new"
            } ) {
                Id
                templateOwnerId
                name
                configuration
              }
          }
          `,
  expected: {
    data: {
      editTemplate: {
        Id: 'TestData',
        templateOwnerId: 'TestData',
        configuration: 'TestData',
        name: 'TestData',
      },
    },
  },
}

describe('GraphQLTemplateTest', () => {
  const cases = [
    getTemplate,
    getOwnerTemplates,
    addTemplate,
    deleteTemplate,
    editTemplate,
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

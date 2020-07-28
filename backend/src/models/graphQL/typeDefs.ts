import {gql} from 'apollo-server-lambda'

export const typeDefs = gql`
  # GraphQL type for Config
  type Config {
    Id: String
    channelEntityId: String
    dashboardName: String
    templateOwnerId: String
    adAccountId: String
    configObject: String
    bucket: String
  }

  type Template {
    Id: String
    templateOwnerId: String
    name: String
    configuration: String
  }

  type Query {
    getDashboardConfig(Id: String, userToken: String!): Config
    getDashboardsForEntity(
      channelEntityId: String
      userToken: String!
    ): [Config]
    getTemplate(Id: String, userToken: String!): Template
    getOwnerTemplates(templateOwnerId: String, userToken: String!): [Template]
  }

  input ConfigInput {
    Id: String!
    channelEntityId: String
    dashboardName: String
    templateOwnerId: String
    adAccountId: String
    configObject: String
    bucket: String
  }

  input ConfigEditInput {
    channelEntityId: String
    dashboardName: String
    templateOwnerId: String
    adAccountId: String
    configObject: String
    bucket: String
  }

  input TemplateInput {
    Id: String!
    templateOwnerId: String
    name: String
    configuration: String
  }

  input EditTemplateInput {
    templateOwnerId: String
    name: String
    configuration: String
  }

  type Mutation {
    addDashboardConfig(userToken: String!, Arguments: ConfigInput): Config
    deleteDashboardConfig(Id: String, userToken: String): Config
    editDashboardConfig(
      Id: String
      userToken: String
      EditData: ConfigEditInput
    ): Config
    addTemplate(userToken: String!, Arguments: TemplateInput): Template
    deleteTemplate(Id: String, userToken: String): Template
    editTemplate(
      Id: String
      userToken: String
      EditData: EditTemplateInput
    ): Template
  }
`

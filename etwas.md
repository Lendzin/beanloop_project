query{
 getDashboardConfig(Id: String, userToken: String!) {
    Id
    channelEntityId
    dashboardName
    templateOwnerId
    adAccountId
    configObject
    bucket
  }
}

query{
 getDashboardsForEntity(channelEntityId: String, userToken: String!) {
    Id
    channelEntityId
    dashboardName
    templateOwnerId
    adAccountId
    configObject
    bucket
  }
}

query{
 getTemplate(Id: String, userToken: String!) {
    Id
    templateOwnerId
    name
    configuration
  }
}

query{
 getOwnerTemplates(templateOwnerId: String, userToken: String!) {
    Id
    templateOwnerId
    name
    configuration
  }
}

mutation {
  addDashboardConfig(userToken: String!,
  Arguments: {
    Id: String! Required
    channelEntityId: String
    dashboardName: String
    templateOwnerId: String
    adAccountId: String
    configObject: String
    bucket: String
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

mutation {
  deleteDashboardConfig(Id: String, userToken: String!) {
    Id
    channelEntityId
    dashboardName
    templateOwnerId
    adAccountId
    configObject
    bucket
  }
}

mutation {
  editDashboardConfig(Id: String, userToken: String!,
  EditData: {
    channelEntityId: String
    dashboardName: String
    templateOwnerId: String
    adAccountId: String
    configObject: String
    bucket: String
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


mutation {
  addTemplate(userToken: String!,
  Arguments: {
    Id: String Required
    templateOwnerId: String
    name: String
    configuration: String
  }) {
    Id
    templateOwnerId
    name
    configuration
  }
}

mutation {
  addDashboardConfig(Id: String, userToken: String!) {
    Id
    templateOwnerId
    name
    configuration
  }
}

mutation {
  editTemplate(Id: String, userToken: String!,
   EditData: {
    templateOwnerId: String
    name: String
    configuration: String
  }) {
    Id
    templateOwnerId
    name
    configuration
  }
}
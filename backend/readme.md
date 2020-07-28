## To Start local instance:

run npm install <br />
npm start <br />

Grapiql on Dev Route: <br />
Get: /dev/create-dashboards

## GraphQl

### Querys

#### getDashboardConfig

```javascript
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
```

#### getDashboardsForEntity

```javascript
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
```

#### getTemplate

```javascript
query{
 getTemplate(Id: String, userToken: String!) {
    Id
    templateOwnerId
    name
    configuration
  }
}
```

#### getOwnerTemplates

```javascript
query{
 getOwnerTemplates(templateOwnerId: String, userToken: String!) {
    Id
    templateOwnerId
    name
    configuration
  }
}
```

### Mutation

#### addDashboardConfig

```javascript
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
```

#### deleteDashboardConfig

```javascript
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
```

#### editDashboardConfig

```javascript
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
```

#### addTemplate

```javascript
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
```

#### deleteTemplate

```javascript
mutation {
  addDashboardConfig(Id: String, userToken: String!) {
    Id
    templateOwnerId
    name
    configuration
  }
}
```

#### editTemplate

```javascript
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
```

## MongoDB Schemas

#### configSchema

```javascript
{
  Id: {
    type: String,
    unique: true,
  },
  owner: String,
  dashboardName: String,
  templateOwnerId: String,
  adAccountId: String,
  configObject: String,
  bucket: String,
  channelEntityId: String,
}
```

#### TemplateSchema

```javascript
{
  Id: {
    type: String,
    unique: true,
  },
  owner: String,
  templateOwnerId: String,
  name: String,
  configuration: String,
}
```

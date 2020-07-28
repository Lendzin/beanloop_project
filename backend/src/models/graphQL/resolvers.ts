import {ApolloError} from 'apollo-server-lambda'
import {Template, config} from '../mongoose/configMoongooseSchema'
import {ConnectToBD, disconnect} from '../mongoose/connectToDB'

const atob = require('atob')

interface IMutateConfigs {
  Id: String
  dashboardName: String
  templateOwnerId: String
  adAccountId: String
  configObject: String
  bucket: String
}

interface ITemplate {
  Id: String
  templateOwnerId: String
  name: String
  configuration: String
}

interface IEditConfigInput {
  channelEntityId: string
  dashboardName: string
  templateOwnerId: string
  adAccountId: string
  configObject: string
  bucket: string
}

interface ITemplateEdit {
  templateOwnerId: string
  name: string
  configuration: string
}

// Querys
const findConfig = async (id: String, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const res: any = await config.findOne({Id: id})
    disconnect()

    if (res.owner !== decodedValue.name)
      return new ApolloError('Error: Something went wrong')
    return res
  } catch (e) {
    return new ApolloError(e)
  }
}

const getDashboardsForEntity = async (Id: String, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    console.log(decodedValue.name)
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const res: any = await config.find({channelEntityId: Id})
    disconnect()

    const resArray: Array<IMutateConfigs> = []
    res.forEach((conf: any) => {
      if (conf.owner === decodedValue.name) resArray.push(conf)
    })

    return resArray
  } catch (e) {
    return new ApolloError(e)
  }
}

const getTemplate = async (Id: String, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const res: any = await Template.findOne({Id: Id})
    disconnect()

    if (res.owner !== decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    return res
  } catch (e) {
    return new ApolloError(e)
  }
}

const getOwnerTemplates = async (
  templateOwnerId: String,
  userToken: string
) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const res: any = await Template.find({templateOwnerId: templateOwnerId})
    disconnect()

    const resArray: Array<ITemplate> = []
    res.forEach((conf: any) => {
      if (conf.owner === decodedValue.name) resArray.push(conf)
    })

    return resArray
  } catch (e) {
    return new ApolloError(e)
  }
}

// Mutations
const AddConfig = async (Config: IMutateConfigs, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const newConfig = await new config({
      owner: decodedValue.name,
      ...Config,
    }).save()
    disconnect()

    return newConfig
  } catch (e) {
    return new ApolloError(e)
  }
}

const deleteDashboardConfig = async (Id: String, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const deletedConfig = await config.findOneAndDelete({
      Id: Id,
      owner: decodedValue.name,
    })
    disconnect()

    if (!deletedConfig)
      return new ApolloError(
        'Something wrong, Config does not exist or you dont have permission to delete choosen Config'
      )

    return deletedConfig
  } catch (e) {
    return new ApolloError(e)
  }
}

const editDashboardConfig = async (
  Id: String,
  {
    channelEntityId,
    dashboardName,
    templateOwnerId,
    adAccountId,
    configObject,
    bucket,
  }: IEditConfigInput,
  userToken: string
) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const doc: any = await config.findOne({Id: Id, owner: decodedValue.name})
    if (!doc)
      return new ApolloError(
        'Cannot find Config or you dont have permission to edit config'
      )
    if (channelEntityId) doc.channelEntityId = channelEntityId
    if (dashboardName) doc.dashboardName = dashboardName
    if (templateOwnerId) doc.templateOwnerId = templateOwnerId
    if (adAccountId) doc.adAccountId = adAccountId
    if (configObject) doc.configObject = configObject
    if (bucket) doc.bucket = bucket

    const res = await doc.save()
    disconnect()
    return res
  } catch (e) {
    return new ApolloError(e)
  }
}

const addTemplate = async (templateArgs: ITemplate, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const tmp = await new Template({
      owner: decodedValue.name,
      ...templateArgs,
    }).save()
    disconnect()

    return tmp
  } catch (e) {
    return new ApolloError(e)
  }
}

const deleteTemplate = async (Id: String, userToken: string) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')
    ConnectToBD()
    const tmp = await Template.findOneAndDelete({
      Id: Id,
      owner: decodedValue.name,
    })
    disconnect()
    if (!tmp)
      return new ApolloError(
        'Something wrong, Config does not exist or you dont have permission to delete choosen Config'
      )
    
    return tmp
  } catch (e) {
    return new ApolloError(e)
  }
}

const editTemplate = async (
  Id: String,
  {templateOwnerId, name, configuration}: ITemplateEdit,
  userToken: string
) => {
  try {
    const jwtPayload = userToken.split('.')[1]
    let decodedValue = JSON.parse(atob(jwtPayload))
    if (!decodedValue.name)
      return new ApolloError('Error: Something went wrong')

    ConnectToBD()
    const doc: any = await Template.findOne({Id: Id, owner: decodedValue.name})

    if (!doc)
      return new ApolloError(
        'Cannot find Config or you dont have permission to edit config'
      )

    if (templateOwnerId) doc.templateOwnerId = templateOwnerId
    if (name) doc.name = name
    if (configuration) doc.configuration = configuration
    const res = await doc.save()
    disconnect()

    return res
  } catch (e) {
    return new ApolloError(e)
  }
}

export const resolvers = {
  Query: {
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    getDashboardConfig: async (parent: any, {Id, userToken}: any) =>
      await findConfig(Id, userToken),
    getDashboardsForEntity: async (
      // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
      parent: any,
      {channelEntityId, userToken}: any
    ) => getDashboardsForEntity(channelEntityId, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    getTemplate: async (parent: any, {Id, userToken}: any) =>
      getTemplate(Id, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    getOwnerTemplates: async (parent: any, {templateOwnerId, userToken}: any) =>
      getOwnerTemplates(templateOwnerId, userToken),
  },
  Mutation: {
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    addDashboardConfig: async (parent: any, {Arguments, userToken}: any) =>
      AddConfig(Arguments, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    deleteDashboardConfig: async (parent: any, {Id, userToken}: any) =>
      deleteDashboardConfig(Id, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    editDashboardConfig: async (parent: any, {Id, EditData, userToken}: any) =>
      editDashboardConfig(Id, EditData, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    addTemplate: async (parent: any, {Arguments, userToken}: any) =>
      addTemplate(Arguments, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    deleteTemplate: async (parent: any, {Id, userToken}: any) =>
      deleteTemplate(Id, userToken),
    // @ts-ignore, Ignore Decorator for Parent argument that is unused but required
    editTemplate: async (parent: any, {Id, EditData, userToken}: any) =>
      editTemplate(Id, EditData, userToken),
  },
}

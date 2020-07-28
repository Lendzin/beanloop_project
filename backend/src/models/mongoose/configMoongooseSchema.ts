import mongoose from 'mongoose'
const Schema = mongoose.Schema

const configSchema = new Schema({
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
})

export const config = mongoose.model('DashboardConfigs', configSchema)

const TemplateSchema = new Schema({
  Id: {
    type: String,
    unique: true,
  },
  owner: String,
  templateOwnerId: String,
  name: String,
  configuration: String,
})

export const Template = mongoose.model('Templates', TemplateSchema)

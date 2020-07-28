import mongoose from 'mongoose'
const connectionUri =
  'mongodb://projectGroup:beanloop2019@ds147566.mlab.com:47566/beanloop-project'

export const ConnectToBD = () => {
  mongoose.connect(connectionUri, {
    bufferCommands: false,
    bufferMaxEntries: 0,
  })
}

export const disconnect = () => {
  mongoose.connection.close()
}

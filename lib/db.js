import {MongoClient} from 'mongodb'

const uri  = "mongodb+srv://technoopuneet:root@contactkeeper.gb3sw.mongodb.net/next-auth?retryWrites=true&w=majority";
const db = null 

async function connectDb() { 
   const client = await MongoClient.connect(uri)
   return client
}


export async function createUser(data){
  const client = await connectDb()
  const db = client.db() 
  const user = await db.collection('users').insertOne(data)
  client.close()
  return user
}

export async function findUser(email){
   const client = await connectDb()
   const db = client.db() 
   const user = await db.collection('users').findOne({email:email})
   client.close()
   return user

 }


export default connectDb



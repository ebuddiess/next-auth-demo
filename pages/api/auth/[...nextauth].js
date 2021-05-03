import nextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import clientdb  from '../../../lib/db'
import {comparePWD} from '../../../lib/auth'




export default nextAuth({
    session : {
        jwt : true
    } ,
    providers : [
        Providers.Credentials({
           async authorize (credentials) {
               const client = await clientdb()
               const db =  client.db()
               const users = await db.collection('users')
               const user = await users.findOne({email:credentials.email})
               
               if(!user){
               client.close()

                   throw new Error('No User Found')
               }

               const isMatch = await comparePWD(credentials.password,user.password)
  
               if(!isMatch){
               client.close()

                throw new Error('Incorrect Password')
                }

               client.close()

               return ({email : user.email})
            }
        })
    ]
})
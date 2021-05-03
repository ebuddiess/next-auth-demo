import {hash , compare} from 'bcryptjs'

export async function hashPassword(password) {
   const hashpassword = await hash(password,12)
   return hashpassword
 }

 export async function comparePWD(password , hashedOne){
   
  const isMatch = await compare(password,hashedOne) 
  return isMatch

 }

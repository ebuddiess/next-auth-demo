import connectDB , {createUser , findUser} from '../../../lib/db'
import {hashPassword} from '../../../lib/auth'

async function handler(req,res){
    if(req.method === 'POST'){
    const { email , password} = req.body ;
    const hashedpassword = await hashPassword(password)
    const data =  {
        email ,  password : hashedpassword
    }

    const existingUser = await findUser(email)

    if(existingUser) {
        res.status(400).json({msg :"User already exist"})
        return ;
    }

    const user  =  await createUser(data)
    return res.status(201).json({msg:"created User"})
    }
}

export default handler 
import { useState , useRef } from 'react';

import {signIn} from 'next-auth/client';

import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
   const emailref = useRef("")
   const pwdref = useRef("")


  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function createUser(email,password){
    const res = await fetch('/api/auth/signup',{
      method : 'POST',
      body : JSON.stringify({email,password}),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    return res.json()
  }

  async function submitHandler(e){
   e.preventDefault()

   if(isLogin){
    const result = await signIn('credentials' , {redirect:false , email : emailref.current.value , password : pwdref.current.value})
    console.log(result)
    window.location.href = "/profile"
   }else{
      try {
      const res =  await createUser(emailref.current.value,pwdref.current.value)
      const result = await signIn('credentials' , {redirect:false , email : emailref.current.value , password : pwdref.current.value})
      window.location.href = "/profile"
      } catch (error) {
        console.log(error)
      }
   }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' ref={emailref} id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' ref={pwdref} id='password' required />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler}>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;

import React, { useContext, useState } from 'react';
import './AuthForm.css';
import { connectSupabase } from '../supabase/supabase';
import Loader from '../loader/Loader';
import LoginForm from '../Login/Login';
import SingUp from '../signUp/SignUp';
import { userContext } from '../contextApi/Context';


// Tip: In keys ko .env file mein hona chahiye security ke liye
const AuthForm = () => {
  const {setRerender ,  Rerender ,
     DobaraChala, setDobaraChala, 
     GoToLogin,IsCheckAdmin} =
      useContext(userContext)
  const [toogle , setToogle] = useState(true)
  return(
    <>
<userContext.Provider value={{setToogle , connectSupabase , 
  setRerender , Rerender , 
  DobaraChala, setDobaraChala,
   GoToLogin,IsCheckAdmin}}>
    { toogle ?  < LoginForm/> :
    <SingUp/>}
    </userContext.Provider>
    </>
  )
  
  ;
};

export default AuthForm;
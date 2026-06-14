import { useContext, useState, useEffect } from "react"

import ShalwarKameezCatalog from "../ShalwarKameez/ShalwarKameez"

import { userContext } from "../contextApi/Context"
import AuthForm from "../AuthForm/AuthForm"
import { connectSupabase } from "../supabase/supabase"
import Loader from "../loader/Loader"
import OrderCard from "../OrderCard/OrderCard"
// ✅ Import karo upar
import useAuth from "../CurrentUsres/CurrentUsres"

function ProductHandle(props) {
  let { checkClick, DobaraChala, setDobaraChala, getIndexData, GoLog  , GoToLogin} = useContext(userContext)
console.log(GoLog);

  const [Rerender, setRerender] = useState(false)


  const { currentUser , Loading } = useAuth(DobaraChala)

  
  let checkCondition = checkClick.split(' ').join('')

  if (Loading) {
if(!GoLog){


    return (
      <>
          
         <userContext.Provider value={{ checkCondition , Rerender, setRerender, DobaraChala, setDobaraChala, getIndexData }}>
              <ShalwarKameezCatalog />
            </userContext.Provider>
       
      </>
    )} else{
      return (
        <userContext.Provider value={{setRerender ,  Rerender , DobaraChala, setDobaraChala, GoToLogin}}>
         <AuthForm/>
         </userContext.Provider>
      )
    }
  } else {
    return <Loader />
  }
}

export default ProductHandle
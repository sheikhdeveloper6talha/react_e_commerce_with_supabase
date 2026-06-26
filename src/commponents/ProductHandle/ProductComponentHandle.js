import { useContext, useState, useEffect } from "react"

import ShalwarKameezCatalog from "../ShalwarKameez/ShalwarKameez"

import { userContext } from "../contextApi/Context"
import AuthForm from "../AuthForm/AuthForm"
import { connectSupabase } from "../supabase/supabase"
import Loader from "../loader/Loader"
import OrderCard from "../OrderCard/OrderCard"
// ✅ Import karo upar
import UseAuth from "../CurrentUsres/CurrentUsres"

function ProductHandle(props) {
  let { checkClick, DobaraChala, 
    setDobaraChala, getIndexData, 
    GoLog  , GoToLogin ,
     SendProduct , ReFreshProducts,
    openPopup , ClosePopup , 
    Open,ReFreshProductsRender,
  IsCheckAdmin , Rerender,
setRerender} =
      useContext(userContext)





  const { currentUser , Loading } = UseAuth(DobaraChala)


  
  let checkCondition = checkClick.split(' ').join('')

  if(checkCondition === 'Order') return <userContext.Provider value={{ReFreshProductsRender}}> <OrderCard/></userContext.Provider>
  if (!Loading) {
if(!GoLog){


    return (
      <>
          
         <userContext.Provider value={{ ReFreshProducts, checkCondition , 
          Rerender, setRerender, 
          DobaraChala, setDobaraChala,
           getIndexData, SendProduct,
           openPopup , ClosePopup,
           Open
           }}>
              <ShalwarKameezCatalog />
            </userContext.Provider>
       
      </>
    )} else{
      return (
        <userContext.Provider value={{setRerender ,  Rerender ,
         DobaraChala, setDobaraChala, 
         GoToLogin, IsCheckAdmin}}>
         <AuthForm/>
         </userContext.Provider>
      )
    }
  } else {
    return <Loader />
  }
}

export default ProductHandle
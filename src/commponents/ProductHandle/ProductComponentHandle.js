import { useContext, useState, useEffect } from "react"
import ProductSearch from "../Premium/Premium"
import ShalwarKameezCatalog from "../ShalwarKameez/ShalwarKameez"
import NewArrivals from '../newArrivals/NewArrivals'
import ExclusiveSale from '../ExclusiveSale/ExclusiveSale'
import { userContext } from "../contextApi/Context"
import AuthForm from "../AuthForm/AuthForm"
import { connectSupabase } from "../supabase/supabase"
import Loader from "../loader/Loader"
import OrderCard from "../OrderCard/OrderCard"

function ProductHandle(props) {
  let { checkClick, DobaraChala, setDobaraChala, getIndexData} = useContext(userContext)

  const [currentUser, setCurrentUser] = useState(null);
  const [Rerender, setRerender] = useState(false);
  const [Loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true)
  }, 2000);
  const getCurrentUser = async () => {
    try {
      // Supabase se current logged-in user ka data mangwain
      const { data: { user }, error } = await connectSupabase.auth.getUser();
      setCurrentUser(user)

      if (error) throw error;

      else {

      }
    } catch (err) {
      console.log(err);

    } finally {
      console.log('Sucess');

    }



  };
  useEffect(() => {

    getCurrentUser();
  }, [DobaraChala]);



  let checkCondition = checkClick.split(' ').join('')
  
  if (Loading) {

    return (
      <>
        {currentUser ? (


          checkCondition === "PremiumKurtis" ? (
            <userContext.Provider value={{ Rerender, setRerender, DobaraChala, setDobaraChala,getIndexData }}>
              <ProductSearch />
            </userContext.Provider>
          ) : checkCondition === "ShalwarKameez" ? (
            <userContext.Provider value={{ Rerender, setRerender, DobaraChala, setDobaraChala,getIndexData }}>
              <ShalwarKameezCatalog />
            </userContext.Provider>
          ) : checkCondition === "NewArrivals" ? (
            <userContext.Provider value={{ Rerender, setRerender, DobaraChala, setDobaraChala, getIndexData}}>
              <NewArrivals />
            </userContext.Provider>

          ) : checkCondition === "ExclusiveSale" ? (
            <userContext.Provider value={{ Rerender, setRerender, DobaraChala, setDobaraChala, getIndexData}}>
              <ExclusiveSale />
            </userContext.Provider>

          ) : checkCondition === "Order" ? (<OrderCard/>) : ""

        ) : (
          <userContext.Provider value={{ Rerender, setRerender, DobaraChala, setDobaraChala, }}>

            <AuthForm />
          </userContext.Provider>
        )}
      </>
    )
  } else {
    return (
      <Loader />)
  }
}
export default ProductHandle
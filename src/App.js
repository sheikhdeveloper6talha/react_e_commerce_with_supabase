import Categories from "./commponents/Categories/Categories";
import Footer from "./commponents/footer/footer";
import HeroSection from "./commponents/hero/hero";
import Navbar from "./commponents/navbar/navbar";
import TopTicker from "./commponents/text/text";
import { userContext } from "./commponents/contextApi/Context";
import { useCallback, useEffect, useState } from "react";
import ProductHandle from "./commponents/ProductHandle/ProductComponentHandle";
import Loader from "./commponents/loader/Loader";
import CartDrawer from "./commponents/Addcart/AddCart";
import AuthForm from "./commponents/AuthForm/AuthForm";
import Admin from "./Admin/Admin";
import UseRefresh from "./commponents/RefreshData/RefreshData";
import {  getCurrentUserData } from "./commponents/CurrentUsres/CurrentUsres";
import UseAuth from "./commponents/CurrentUsres/CurrentUsres";
import { UsersHit } from "./Admin/Commponent/ApiCaling/Users";

function App() {
  let [checkClick, setCheckClick] = useState('')
  let [DobaraChala, setDobaraChala] = useState(false)
  let [First, setFirst] = useState(true)
  let [CartData, setCartData] = useState(false)
  let [SendProduct, setSendProduct] = useState([])
  let [Order, setOrder] = useState('')
  let [GoLog, setGoLog] = useState(false)
  let [Open, setOpen] = useState(false)
  let [CheckUserAndAdmin, setCheckUserAndAdmin] = useState(false)
  const [Rerender, setRerender] = useState(false)

  const { ReFreshProducts, ReFreshProductsRender } = UseRefresh()
  const { currentUser, Loading } = UseAuth()

  
  const myFunc = useCallback(async () => {
    if (!currentUser) return
    const sendId = await getCurrentUserData(currentUser?.id)
    if (sendId?.type) {
      setCheckUserAndAdmin(sendId.type)
    }
  }, [currentUser])

  useEffect(() => {
    myFunc()
  }, [myFunc])

  const IsCheckAdmin = useCallback((type) => {
    setCheckUserAndAdmin(type)
  }, [CheckUserAndAdmin])

  const openPopup = useCallback(() => {
    setOpen(true)
  }, [])

  const ClosePopup = useCallback(() => {
    setOpen(false)
  }, [])

  const order = useCallback((reviveOrder) => {
    setOrder(reviveOrder)
  }, [Order])

  const GoToLogin = useCallback(() => {
    setGoLog(!GoLog)
    window.scrollBy({ top: 550, behavior: 'smooth' })
  }, [GoLog])

  const OpendCart = useCallback(() => {
    setCartData(!CartData)
  }, [CartData])

  const getIndexData = useCallback((reciveProduct, setSendDataCheckOut) => {
    if (!reciveProduct) return alert('Please select Size')
    setSendProduct((pre) => [...pre, reciveProduct])
    setSendDataCheckOut('')
  }, [SendProduct])

  // ✅ Loader — jab tak user load na ho
  if (Loading) return <Loader />

  // ✅ Admin dashboard
  if (CheckUserAndAdmin === 'admin') {
    return (
      <userContext.Provider value={{ IsCheckAdmin, ReFreshProducts }}>
        <Admin />
      </userContext.Provider>
    )
  }

  // ✅ Client side
  return (
    <>
      <TopTicker />

      <userContext.Provider value={{ setCheckClick, DobaraChala, setDobaraChala, OpendCart, SendProduct }}>
        <Navbar />
      </userContext.Provider>

      {!checkClick && (
        <userContext.Provider value={{ setCheckClick }}>
          <HeroSection />
        </userContext.Provider>
      )}

      {!checkClick && (
        <userContext.Provider value={{
          setCheckClick, DobaraChala, setDobaraChala,
          GoToLogin, IsCheckAdmin, Rerender, setRerender
        }}>
          {GoLog ? <AuthForm /> : <Categories />}
        </userContext.Provider>
      )}

      <br /><br /><br /><br /><br />

      <userContext.Provider value={{
        checkClick, DobaraChala, setDobaraChala,
        getIndexData, GoLog, GoToLogin, SendProduct,
        ReFreshProducts, openPopup, ClosePopup, Open,
        ReFreshProductsRender, IsCheckAdmin, Rerender, setRerender
      }}>
        {checkClick && <ProductHandle />}
      </userContext.Provider>

      {CartData && (
        <userContext.Provider value={{
          OpendCart, DobaraChala, setDobaraChala,
          SendProduct, setSendProduct, order,
          GoToLogin, ReFreshProductsRender, ClosePopup
        }}>
          <CartDrawer />
        </userContext.Provider>
      )}

      <Footer />
    </>
  )
}

export default App;
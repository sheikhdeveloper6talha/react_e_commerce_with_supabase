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



function App() {
  let [checkClick , setCheckClick] = useState('')
  let [DobaraChala , setDobaraChala] = useState(false)
  let [First , setFirst] = useState(true)
  let [CartData , setCartData] = useState(false)
  let [SendProduct , setSendProduct] = useState([])
  let [Order , setOrder] = useState('')
  let [GoLog , setGoLog] = useState(false)
  let [ReFreshProducts , setReFreshProducts] = useState(0)

// ReFreshProducts 


const ReFreshProductsRender = useCallback (()=>{
  setReFreshProducts(prev => prev + 1)
  console.log('I am A ReFreshProductsRender');
  
},[ReFreshProducts])

// order comfrim

const order = useCallback ((reviveOrder)=>{
setOrder(reviveOrder)
  console.log('I am A order');

},[Order])

// login me jane ke liye hai

const GoToLogin = useCallback( ()=>{
  setGoLog(!GoLog)
window.scrollBy({
  top : 550,
  behavior : 'smooth'
})
  console.log('I am A GoToLogin');

},[GoLog])
// y wala function Open cart menu ke liye hai

const OpendCart = useCallback( ()=>{
  setCartData(!CartData)  
  console.log('I am A OpendCart');

},[CartData])
// y loader ke liye hai
useEffect(() => {
    const timer = setTimeout(() => {
      setFirst(false)
    }, 2000);
    return () => clearTimeout(timer)
  }, [])

 const  getIndexData = useCallback( (reciveProduct , setSendDataCheckOut)=>{
  

  if(!reciveProduct ) return alert('Please select Size')
 
    setSendProduct((pre)=> [...pre , reciveProduct])
 setSendDataCheckOut('')
 console.log('I am a getIndexData');
 
},[SendProduct])
 
  if(!First){
  return (
  <>
<TopTicker/>
 
<userContext.Provider  value={{
  setCheckClick,
  DobaraChala,
  setDobaraChala,
OpendCart,
SendProduct,

}}>
<Navbar/>
</userContext.Provider>
{!checkClick &&  <userContext.Provider value={{setCheckClick}}> <HeroSection/></userContext.Provider>}
{!checkClick && <userContext.Provider value={{
  setCheckClick,
  DobaraChala,
  setDobaraChala,
  GoToLogin,
}}>
 {GoLog ? <AuthForm/> :  <Categories/>}
</userContext.Provider>}
<br/>
<br/>
<br/>
<br/>
<br/>
<userContext.Provider value={{
  checkClick,
    DobaraChala,
  setDobaraChala,
  getIndexData,
  GoLog,
  GoToLogin,
  SendProduct,
  ReFreshProducts
}}>
{checkClick &&   <ProductHandle/>}
</userContext.Provider>

{CartData && <userContext.Provider value={{OpendCart , DobaraChala 
  ,setDobaraChala, SendProduct , setSendProduct , order , GoToLogin , ReFreshProductsRender }}>
 <CartDrawer/> 
</userContext.Provider> }
<Footer/>


  </>
  );
  }else{
    return(
      <Loader/>
    )
  }
}

export default App;

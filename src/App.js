import Categories from "./commponents/Categories/Categories";
import Footer from "./commponents/footer/footer";
import HeroSection from "./commponents/hero/hero";
import Navbar from "./commponents/navbar/navbar";
import TopTicker from "./commponents/text/text";
import { userContext } from "./commponents/contextApi/Context";
import { useEffect, useState } from "react";
import ProductHandle from "./commponents/ProductHandle/ProductComponentHandle";
import Loader from "./commponents/loader/Loader";
import CartDrawer from "./commponents/Addcart/AddCart";



function App() {
  let [checkClick , setCheckClick] = useState('')
  let [DobaraChala , setDobaraChala] = useState(false)
  let [First , setFirst] = useState(true)
  let [CartData , setCartData] = useState(false)
  let [SendProduct , setSendProduct] = useState([])
  let [Order , setOrder] = useState('')
  let [GoLog , setGoLog] = useState(false)



// order comfrim

const order = (reviveOrder)=>{
setOrder(reviveOrder)
console.log(Order);

}

// login me jane ke liye hai

const GoToLogin = ()=>{
  setGoLog(!GoLog)
console.log('asas');

}
// y wala function Open cart menu ke liye hai

const OpendCart = ()=>{
  setCartData(!CartData)  
}
// y loader ke liye hai
useEffect(() => {
    const timer = setTimeout(() => {
      setFirst(false)
    }, 2000);
    return () => clearTimeout(timer)
  }, [])

 const  getIndexData = (reciveProduct , setSendDataCheckOut)=>{
  console.log(reciveProduct);
  if(reciveProduct === "") return alert('Please select Size')
  setSendProduct((pre)=> [...pre , reciveProduct])
 setSendDataCheckOut('')
}
 
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
}}>
  <Categories/>
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
}}>
{checkClick &&   <ProductHandle/>}
</userContext.Provider>

{CartData && <userContext.Provider value={{OpendCart , DobaraChala 
  ,setDobaraChala, SendProduct , setSendProduct , order , GoToLogin }}>
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

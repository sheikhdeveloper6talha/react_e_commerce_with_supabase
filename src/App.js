import Categories from "./commponents/Categories/Categories";
import Footer from "./commponents/footer/footer";
import HeroSection from "./commponents/hero/hero";
import Navbar from "./commponents/navbar/navbar";
import TopTicker from "./commponents/text/text";
import { userContext } from "./commponents/contextApi/Context";
import { useState } from "react";
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



// order comfrim

const order = (reviveOrder)=>{
setOrder(reviveOrder)
console.log(Order);

}


// y wala function Open cart menu ke liye hai

const OpendCart = ()=>{
  setCartData(!CartData)  
}
// y loader ke liye hai
  setTimeout(() => {
    setFirst(false)
  }, 2000);

 const  getIndexData = (reciveProduct)=>{
  console.log(reciveProduct);
  
  setSendProduct((pre)=> [...pre , reciveProduct])
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
SendProduct
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
  getIndexData
}}>
{checkClick &&   <ProductHandle/>}
</userContext.Provider>

{CartData && <userContext.Provider value={{OpendCart , DobaraChala 
  ,setDobaraChala, SendProduct , setSendProduct , order}}>
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

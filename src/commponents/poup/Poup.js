import { useContext, useEffect, useRef, useState } from 'react'
import './Poup.css'
import { userContext } from '../contextApi/Context'
import getData from '../ProductsItems/ProductsItems'
function Popup (){
    let {ClosePopup , sendProducts ,
       getIndexData , SendProduct , 
       ReFreshProducts } =
        useContext(userContext)
  const [SendDataCheckOut , setSendDataCheckOut] = useState(null)
const length = useRef(0)
const sizeArray = ["XXL" , 'XL' , 'L' , 'M' , 'S']
const sizeGet = (reciveSize)=>{
 if (!sendProducts) return alert('Nnhee hai')

 setSendDataCheckOut( {
   ...sendProducts,
   sizes: reciveSize
 })
 
 
}    

useEffect(() => {
 setSendDataCheckOut(sendProducts)
   
}, [ReFreshProducts ])    
useEffect(()=>{
let a = SendProduct.filter((e)=> e?.id === sendProducts?.id)
  length.current = a.length
  getData()
},[SendProduct])
const addCartItems = ()=>{

if(SendDataCheckOut.sizes === 'M' ||
  SendDataCheckOut.sizes === 'L' ||
  SendDataCheckOut.sizes === 'S' ||
  SendDataCheckOut.sizes === 'XL' ||
  SendDataCheckOut.sizes === 'XXL' 
){

   getIndexData(SendDataCheckOut , setSendDataCheckOut)
}else{
  return alert('Please Select Size')
}
   

}


    return(
  <div className='container'>
    <div className='close'>
      <p onClick={()=> ClosePopup()}>&#10006;</p>
    </div>
    <div className='items'>
      <img src={sendProducts?.image_url}/>
      <h2>{sendProducts?.name}</h2>
      <h4>{sendProducts?.description}</h4>
      <h3>Price {sendProducts?.price}</h3>
      <div className='categorey'>
        <p>{sendProducts?.type}</p>
      <div className='Size'>
        {sizeArray.map((itemsSize)=>{
          return(
            <p key={itemsSize} onClick={()=> sizeGet(itemsSize)}>{itemsSize}</p>
          )
        })} 
      </div>
      
{  (length.current) <  (+sendProducts.stock) ?   <button  onClick={()=> addCartItems()}>Add to cart</button>    :   <button >Not Available</button>}
      </div>
    </div>
  </div>
)

}

export default Popup
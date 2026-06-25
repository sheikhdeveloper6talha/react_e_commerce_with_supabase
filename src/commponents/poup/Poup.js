import { useContext, useEffect, useRef, useState } from 'react'
import './Poup.css'
import { userContext } from '../contextApi/Context'
import getData from '../ProductsItems/ProductsItems'
function Popup (){
    let {setOpen , sendProducts , getIndexData , SendProduct} = useContext(userContext)
  const [SendDataCheckOut , setSendDataCheckOut] = useState(null)
const length = useRef(0)
const sizeArray = ["XXL" , 'XL' , 'L' , 'M' , 'S']
const sizeGet = (reciveSize)=>{
 if (!sendProducts) return alert('Nnhee hai')

 setSendDataCheckOut({
   ...sendProducts,
   sizes: reciveSize
 })
}    

useEffect(() => {
 setSendDataCheckOut(sendProducts)
}, [])    

const addCartItems = ()=>{


  if(!SendDataCheckOut ) return alert('plese size')
 
  
   

      getIndexData(SendDataCheckOut , setSendDataCheckOut)
   

let a = SendProduct.filter((e)=> e?.id === sendProducts?.id)
  length.current = a.length
  getData()
}


    return(
  <div className='container'>
    <div className='close'>
      <p onClick={()=> setOpen(false)}>&#10006;</p>
    </div>
    <div className='items'>
      <img src={sendProducts.image_url}/>
      <h2>{sendProducts.name}</h2>
      <h4>{sendProducts.description}</h4>
      <h3>Price {sendProducts.price}</h3>
      <div className='categorey'>
        <p>{sendProducts.type}</p>
      <div className='Size'>
        {sizeArray.map((itemsSize)=>{
          return(
            <p key={itemsSize} onClick={()=> sizeGet(itemsSize)}>{itemsSize}</p>
          )
        })} 
      </div>
{  (length.current+1) <  (+sendProducts.stock) ?   <button  onClick={()=> addCartItems()}>Add to cart</button>    :   <button >Not Available</button>}
      </div>
    </div>
  </div>
)

}

export default Popup
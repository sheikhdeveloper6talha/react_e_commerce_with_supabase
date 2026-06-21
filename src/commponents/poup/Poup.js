import { useContext, useEffect, useState } from 'react'
import './Poup.css'
import { userContext } from '../contextApi/Context'
function Popup (){
    let {setOpen , sendProducts , getIndexData} = useContext(userContext)
  const [SendDataCheckOut , setSendDataCheckOut] = useState(null)
console.log(SendDataCheckOut);
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
  console.log(SendDataCheckOut.sizes);
  if(!SendDataCheckOut ) return alert('plese size')
    getIndexData(SendDataCheckOut , setSendDataCheckOut)
  
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
        <button  onClick={()=> addCartItems()}>Add to cart</button>
      </div>
    </div>
  </div>
)

}

export default Popup
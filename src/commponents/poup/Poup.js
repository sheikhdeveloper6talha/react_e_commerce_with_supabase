import { useContext, useEffect, useState } from 'react'
import './Poup.css'
import { userContext } from '../contextApi/Context'
function Popup (){
    let {setOpen , sendProducts , getIndexData} = useContext(userContext)
  let [SendDataCheckOut , setSendDataCheckOut] = useState('')
const sizeGet = (reciveSize)=>{
console.log(reciveSize);
const newSizing = {...sendProducts , size : reciveSize }
setSendDataCheckOut(newSizing)
}    
    

    return(
  <div className='container'>
    <div className='close'>
      <p onClick={()=> setOpen(false)}>&#10006;</p>
    </div>
    <div className='items'>
      <img src={sendProducts.image}/>
      <h2>{sendProducts.name}</h2>
      <h4>{sendProducts.description}/</h4>
      <h3>{sendProducts.price}</h3>
      <div className='categorey'>
        <p>{sendProducts.type}</p>
      <div className='Size'>
        {sendProducts.size.map((itemsSize)=>{
          return(
            <p onClick={()=> sizeGet(itemsSize)}>{itemsSize}</p>
          )
        })} 
      </div>
        <button onClick={()=> getIndexData(SendDataCheckOut , setSendDataCheckOut)}>Add to cart</button>
      </div>
    </div>
  </div>
)

}

export default Popup
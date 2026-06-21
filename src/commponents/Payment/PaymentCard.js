import { useContext, useState , useEffect, use } from "react";
import "./PaymentCard.css"; // CSS file import
import { userContext } from "../contextApi/Context";
import { connectSupabase } from "../supabase/supabase";
import Loader from "../loader/Loader";
const PaymentCard = () => {
    let {setOrderCompo , RenderCart , setSendProduct , setRenderCart , OpendCart} = useContext(userContext)
    const [loader , setLoader] = useState(true)
    const [checks , setChecks] = useState('')

 
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    file: null,
    id : ''
  });

// get current Users

    const getCurrentUser = async () => {
       try {
         const {
           data: { user }
         } = await connectSupabase.auth.getUser();
if(user){
    console.log(user.id);
    
   const { data, error } = await connectSupabase
  .from('UsersIfo')
  .select()
  .match({ id: user.id})
  console.log(data[0].name);
 setForm({name : data[0].name || '' , email : data[0].email || '' , id: user.id})
 setLoader(false)



const {data : check} = await connectSupabase
.from('Order')
.select()
.match({id : user.id})
console.log(check);
setChecks(check)


}

       } catch (error) {
         console.log(error);
       }


      };
   
     useEffect(() => {
       getCurrentUser();
 
     }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({...form, [name]: files? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Order placed! Fake payment done ✅");
     // cut ho ke band ho jayega
  };


//   {orderNow function create}
const orderNowHandler = async () => {
  if (form.phone.length < 11) return alert('Please fill phone number')

  try {

checks.map((checkValue)=>{
  if(checkValue.id === form.id){
    console.log('data hai isme');
    
  }
})    
    // Step 1: Pehle main order save karo
    const { data: orderData, error: orderError } = await connectSupabase
      .from('Order') // table naam small letter
      .insert({
        id: form.id,
        phoneNumber: form.phone, // snake_case use karo
        Adress: form.address, // spelling theek
        status: false,
        total_amount: RenderCart.reduce((sum, item) => sum + Number(item.price) * item.qty, 300),
    
      })
      .select()

      
    // Step 2: Ab cart ke items alag table me save karo
    const orderItems = RenderCart.map((item , index) => ({
      id :  Math.round(Math.random() * 10000000),
      uuid: form.id, // order ka id link kar diya
      name: item.name,
      users: form.name,
      type: item.type,
      price: (+item.price)+300,
      image: item.image_url,
      qty: item.qty,
      size : item.sizes
    } ) )

    const { data ,  error: itemsError } = await connectSupabase
      .from('orderItems') // alag table
      .insert(orderItems)
.select()

if(data) {
  await Promise.all  (  RenderCart.map(async (items)=>{
  console.log(items);
  
   const { error: stocks} = await connectSupabase
  .from('ProductitemsAdd')
  .update({'stock' : Number(items.stock) - items.qty })
  .eq('id' , items.id)
  if(stocks)  alert('Stock not Updates')
})
)
}
    if (orderError) throw orderError




    if (itemsError) throw itemsError

    console.log('Order save ho gaya:', orderData.id)
    alert('Order placed successfully!')


  } catch (error) {
    console.log(error.message)
    alert('Order failed: ' + error.message)
  }
  setRenderCart([])
  setSendProduct([])
setOrderCompo(false)
OpendCart()
}





if(!loader){
  return (
    <div className="payment-overlay" >
      <div className="payment-ticket" style={{paddingBottom : window.innerHeight+`px`}}>
        <div className="payment-header">
          Payment Details
          <button className="close-btn" onClick={()=> setOrderCompo(false)}>×</button>
        </div>

        {/* Ye cut wali line hai */}
        <div className="cut-line"></div>

        <form className="payment-body" onSubmit={handleSubmit}>
          <div className="total-box">Total: Rs. {RenderCart.reduce((totle , current) =>
             totle + Number(current.price.slice(4).replace(/,/g, '')),300)}</div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            disabled
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            disabled
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            required
          />

          {/* QR Code */}
          <div className="qr-section">
            <p style={{marginBottom: '8px', fontSize: '14px', color: '#555'}}>
              Scan QR for Payment
            </p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FakePayment123"
              alt="QR Code"
            />
          </div>

          {/* File Upload */}
          <div className="file-wrapper">
  <input
    type="file"
    name="file"
    className="file-input"
    onChange={handleChange}
    accept="image/*"
    id="fileUpload"
  />
  <label htmlFor="fileUpload" className="file-label">
    {form.file ? form.file.name : "📎 Click to upload payment screenshot"}
  </label>
</div>

          <button type="submit" className="order-btn" onClick={orderNowHandler}>Order Now</button>
        </form>
      </div>
    </div>
  );}else{
    return(
        <Loader/>
    )
  }
};

export default PaymentCard;
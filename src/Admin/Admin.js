
import { useContext, useState } from 'react';
import './Admin.css';
import AddProduct from './Commponent/AddProduct/AddProducts';
import UsedContext from './Commponent/ContextApi/Context';
import AdminDashboard from './Commponent/Dashboard/Dashboard';
import OrdersClient from './Commponent/Order/Order';

import Sidebar from './Commponent/Sidebar/Sidebar';
import UserList from './Commponent/Users/Users';
import ProductGrid from './Commponent/Products/Products';
import { userContext } from '../commponents/contextApi/Context';
import UseRefresh from '../commponents/RefreshData/RefreshData';

function Admin() {
  const {ReFreshProducts , ReFreshProductsRender} = UseRefresh()
let [Check , setCheck] = useState('Dashboard')
let {IsCheckAdmin,} =
 useContext(userContext)
const LinkTab = (recive)=>{
setCheck(recive)
}
  return (
    <>
    <div className='main-Container'>
      <UsedContext.Provider value={{LinkTab , IsCheckAdmin}}>
<Sidebar/>
      </UsedContext.Provider>
    {Check === 'Dashboard' ? 
    <AdminDashboard/>
     : Check === 'Users' ?
     <UserList/> 
     : Check === 'Order' ? 
     <userContext.Provider value={
      {
        ReFreshProducts
        }
        }>
      <OrdersClient/>
      </userContext.Provider> 
     : Check === 'AddProducts' ?
     <AddProduct/>
     : Check === 'Products' ? 
     <ProductGrid/>
     : ""
  }
    </div>
    </>
  );
}

export default Admin;

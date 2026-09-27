
import { useContext, useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import { userContext } from '../../../commponents/contextApi/Context';
import { connectSupabase } from '../../../commponents/supabase/supabase';
import './Dashboard.css';

const AdminDashboard = () => {
  const { ReFreshProducts } = useContext(userContext)
  const [Stats, setStats] = useState({ Orders: 0, Products: 0, ActiveUsers: 0, TotalUsers: 0 })
  const [RecentOrders, setRecentOrders] = useState([])
  const [Loading, setLoading] = useState(true)

  const getDashboardData = async () => {
    try {
      const [OrderData, ProductData, UserData] = await Promise.all([
        connectSupabase.from('orderItems').select(),
        connectSupabase.from('ProductitemsAdd').select(),
        connectSupabase.from('UsersIfo').select()
      ])

      if (OrderData.error) return alert(OrderData.error.message)
      if (ProductData.error) return alert(ProductData.error.message)
      if (UserData.error) return alert(UserData.error.message)

      const Users = UserData.data || []
      const Orders = OrderData.data || []

      setStats({
        Orders: Orders.length,
        Products: (ProductData.data || []).length,
        ActiveUsers: Users.filter((user) => user.agreeTerms).length,
        TotalUsers: Users.length
      })

      setRecentOrders(
        [...Orders]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 8)
      )
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()

    const channel = connectSupabase
      .channel('admin-dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orderItems' }, getDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ProductitemsAdd' }, getDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'UsersIfo' }, getDashboardData)
      .subscribe()

    return () => connectSupabase.removeChannel(channel)
  }, [ReFreshProducts])

  if (Loading) return <Loader />

  return (
    <div className="admin-container" >

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>Overview</h1>
        </header>

        {/* Stats Section */}
        <section className="stats-grid">
          <div className="stat-card"><h3>Total Orders</h3><p>{Stats.Orders}</p></div>
          <div className="stat-card"><h3>Total Products</h3><p>{Stats.Products}</p></div>
          <div className="stat-card"><h3>Active Users</h3><p>{Stats.ActiveUsers}</p>
            <small className="stat-sub">of {Stats.TotalUsers} registered</small>
          </div>
        </section>

        {/* Recent Orders Table */}
        <section className="data-section">
          <h2>Recent Orders</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {RecentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.users}</td>
                    <td>
                      <span className={order.status === 'shipped' || order.status === 'delivered' ? 'status-shipped' : 'status-pending'}>
                        {order.status || 'pending'}
                      </span>
                    </td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>PKR {order.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {RecentOrders.length === 0 && <p className="no-data">Abhi tak koi order nahi aaya.</p>}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;


import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container" >
    

      {/* Main Content */}
      <main className="main-content">
        <header>
          <h1>Overview</h1>
        </header>

        {/* Stats Section */}
        <section className="stats-grid">
          <div className="stat-card"><h3>Total Orders</h3><p>1,240</p></div>
          <div className="stat-card"><h3>Total Products</h3><p>350</p></div>
          <div className="stat-card"><h3>Active Users</h3><p>8,900</p></div>
        </section>

        {/* Recent Orders Table */}
        <section className="data-section">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-7721</td>
                <td>Ali Khan</td>
                <td><span className="status-shipped">Shipped</span></td>
                <td>$120.00</td>
              </tr>
              <tr>
                <td>#ORD-7722</td>
                <td>Sara Ahmed</td>
                <td><span className="status-pending">Pending</span></td>
                <td>$85.50</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
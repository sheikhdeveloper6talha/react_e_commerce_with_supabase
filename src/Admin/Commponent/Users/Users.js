import React, { useEffect, useState } from 'react';
import './Users.css';
import {UsersHit} from '../ApiCaling/Users';
import Loader from '../loader/Loader';
import { connectSupabase } from '../../../commponents/supabase/supabase';
const UserList = () => {
  // Mock Data for Users
  const [users , setUsers] =  useState([]);
  const [Loading , setLoading] =  useState(true);
  const getDataUsers = async  () => {
    let showUsers = await UsersHit()
    
    
if(!showUsers) return alert('Net Problem'), setLoading(true)
    setUsers(showUsers)
    setLoading(false)
    }
  useEffect(()=>{
getDataUsers()
const channel = connectSupabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',        // 👈 INSERT, UPDATE, DELETE sab ek saath
          schema: 'public',
          table: 'UsersIfo'
        },
        (payload) => {

          if (payload.eventType === 'UPDATE') {
            setUsers(prev => prev.map(order => order.id === payload.new.id ? payload.new : order))
            
          }
        }
      )
      .subscribe()

    return () => connectSupabase.removeChannel(channel)
},[])
if(Loading){
return <Loader/>
 }  return (
    <div className="users-section">
      {/* Upper Statistics Header */}
      <div className="users-header">
        <div className="header-text">
          <h2>All Users</h2>
          <p className="sub-text">Manage your core team members and their status</p>
        </div>
        <span className="counter-badge">{users.filter((e)=> e.agreeTerms).length} Active Members</span>
      </div>

      {/* Responsive Grid System */}
      <div className="users-grid">
        {users.map((user) => (
          
          <div key={user?.id} className="user-profile-card">
            
            {/* Avatar & Dynamic Status Dot */}
            <div className="avatar-container">
              <div className="avatar-circle">{user.agreeTerms}</div>
         <span className={`status-dot ${user.agreeTerms ? 'active' : ''}`}></span>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              <h3 className="profile-name">{user?.name}</h3>
              <p className="profile-email">{user?.email}</p>
              <p className="profile-role">createAt {user?.createAt}</p>
            </div>

            {/* Responsive Action Trigger */}
            <div className="profile-actions">
              <button className="btn-view">View Profile</button>
              <button className="btn-settings">⚙️</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )

};

export default UserList;
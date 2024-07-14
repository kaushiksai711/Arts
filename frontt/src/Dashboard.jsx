import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function Dashboard() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div className='container5' id='A' height='500px'>
          <h5>Welcome to your dashboard, {user.name}!</h5>
          <h5><b>Email:</b> {user.email}</h5>
        </div>
      ) : (
        <p>Please log in to see your dashboard details.</p>
      )}
    </div>
  );
}

export default Dashboard;

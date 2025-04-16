import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import sessionTimeout from './utils/sessionTimeout';

function App() {
  useEffect(() => {
    // Check token expiration on component mount
    sessionTimeout.checkTokenExpiration();
    
    // The session timeout class handles setting up activity listeners
    // and will automatically log out after inactivity
  }, []);

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App

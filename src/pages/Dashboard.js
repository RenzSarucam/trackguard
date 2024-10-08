import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import dashboard from '../assets/dashboard.png';
import logout from '../assets/logout.png';
import people from '../assets/people.png';
import question from '../assets/question.png';
import report from '../assets/report.png';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState(''); // Correctly define `setEmail`

  useEffect(() => {
    // Fetch the current user from Firebase
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email); // Set the email of the logged-in user
    } else {
      // Handle the case where there's no user logged in
      setEmail('Admin');
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {isSidebarOpen && (
        <aside className="w-64 bg-gray-500 text-gray-200 flex flex-col">
          {/* Logo */}
          <div className="p-4 flex justify-center items-center">
            {/* Add the logo here */}
          </div>

          {/* User Profile */}
          <div className="flex items-center p-4 border-b border-gray-700">
            <div>
              <h2 className="text-xl font-bold">Admin</h2> {/* Display the email */}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex-1 p-4">
            <ul>
              <li className="mb-2 flex items-center">
                <img src={dashboard} alt="Dashboard" className="mr-2 w-8 h-8" />
                <button className="flex-grow bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                  <NavLink
                    to="/dashboard"
                    activeClassName="bg-blue-500"
                    className="w-full text-left"
                  >
                    Dashboard
                  </NavLink>
                </button>
              </li>
              <li className="mb-2 flex items-center">
                <img src={people} alt="People" className="mr-2 w-8 h-8" />
                <button className="flex-grow bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                  <NavLink
                    to="/people"
                    activeClassName="bg-blue-500"
                    className="w-full text-left"
                  >
                    People
                  </NavLink>
                </button>
              </li>
              <li className="mb-2 flex items-center">
                <img src={report} alt="Reports" className="mr-2 w-8 h-8" />
                <button className="flex-grow bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                  <NavLink
                    to="/register"
                    activeClassName="bg-blue-500"
                    className="w-full text-left"
                  >
                    Register
                  </NavLink>
                </button>
              </li>
              <li className="mb-2 flex items-center">
                <img src={question} alt="Help" className="mr-2 w-8 h-8" />
                <button className="flex-grow bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
                  <NavLink
                    to="/help"
                    activeClassName="bg-blue-500"
                    className="w-full text-left"
                  >
                    Help
                  </NavLink>
                </button>
              </li>
            </ul>

            {/* Emergency Contact Section */}
            <div className="mt-4 bg-gray-600 text-gray-200 p-4 rounded">
              <h1 className="text-xl font-bold mb-4">Emergency Contact</h1>
              <div>
                <h2 className="text-lg font-bold">PANABO POLICE</h2>
                <p>(084) 823-1656</p>
                <p>0907 312 2991 (Smart)</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">FIRE STATION (Main)</h2>
                <p>(084) 823-1773</p>
                <p>0928-458-7586</p>
                <p>0977-422-7686</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">FIRE STATION (Nanyo)</h2>
                <p>0917 156 9149</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">EMERGENCY RESCUE SERVICES</h2>
                <p>(084) 822-1198</p>
              </div>
            </div>
          </div>

          {/* Logout Section */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              <img src={logout} alt="Logout" className="mr-2 w-8 h-8" />
              <Link to="/" className="text-gray-300 hover:text-red-300">Logout</Link>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content and Sidebar Toggle Button */}
      <div className="flex-1 flex flex-col">
        <div className="md:hidden p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white bg-gray-800 p-2 rounded"
          >
            {isSidebarOpen ? 'Close Menu' : 'Open Menu'}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 p-6">
          {/* Map Section */}
          <div className="w-1/2 bg-gray-400 p-4 flex justify-center items-center">
            <div className="map-container bg-white w-full h-full flex justify-center items-center">
              {/* Add your map component here */}
              <h2 className="text-xl">Map goes here</h2>
            </div>
          </div>

          {/* Message and Details Section */}
          <div className="w-1/2 bg-gray-300 p-4 flex flex-col justify-center">
            <div className="message-container bg-white p-4 rounded shadow">
              <h1 className="text-2xl font-bold mb-4">Message</h1>
              <p>Details about the selected item will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

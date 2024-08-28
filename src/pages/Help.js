import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../firebase'; // Import Firebase auth
import dashboard from '../assets/dashboard.png';
import logout from '../assets/logout.png';
import people from '../assets/people.png';
import question from '../assets/question.png';
import report from '../assets/report.png';

function Help() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState('');

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
    <div className="flex h-screen flex-row">
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
              <h2 className="text-xl font-bold">{email}</h2>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="flex flex-row justify-center items-center h-full bg-gray-300">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
              <h1 className="text-4xl font-bold mb-6">Help</h1>
              <section className="flex flex-row justify-between">
                <div className="w-1/2 mr-4">
                  <h2 className="text-2xl font-bold mb-4">When to Call the Police</h2>
                  <p className="mb-4">
                    Call the police if you witness or are involved in any of the following situations:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Criminal activity, such as theft, assault, or vandalism</li>
                    <li>Suspicious behavior or persons</li>
                    <li>Domestic violence or abuse</li>
                    <li>Car accidents with injuries or major damage</li>
                    <li>Any emergency situation requiring immediate assistance</li>
                  </ul>
                </div>
                <div className="w-1/2 ml-4">
                  <h2 className="text-2xl font-bold mb-4">Safety Tips</h2>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Always be aware of your surroundings and report anything unusual.</li>
                    <li>Keep emergency numbers saved in your phone.</li>
                    <li>If you feel threatened, do not hesitate to contact authorities.</li>
                    <li>Lock your doors and windows, even when at home.</li>
                    <li>Avoid sharing personal information with strangers.</li>
                  </ul>
                </div>
              </section>

              <section className="flex flex-row justify-between mt-6">
                <div className="w-1/2 mr-4">
                  <h2 className="text-2xl font-bold mb-4">How to Report an Incident</h2>
                  <p className="mb-4">
                    When reporting an incident, provide as much detail as possible, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Your name and contact information</li>
                    <li>The exact location of the incident</li>
                    <li>A description of the people involved</li>
                    <li>The nature of the incident (what happened, when, and how)</li>
                    <li>Any immediate danger or injuries</li>
                  </ul>
                </div>
                <div className="w-1/2 ml-4">
                  <h2 className="text-2xl font-bold mb-4">Important Contacts</h2>
                  <p className="mb-4">
                    Make sure you know how to reach your local police station and other emergency services:
                  </p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Police: (084) 823-1656</li>
                    <li>Fire Station: (084) 823-1773</li>
                    <li>Emergency Rescue: (084) 822-1198</li>
                  </ul>
                </div>
              </section>

              <p className="text-lg mt-6">
                Stay safe, and don't hesitate to reach out to the police or other authorities if you need help.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Help;

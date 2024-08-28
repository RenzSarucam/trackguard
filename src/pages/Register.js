import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import dashboard from '../assets/dashboard.png';
import logout from '../assets/logout.png';
import people from '../assets/people.png';
import question from '../assets/question.png';
import report from '../assets/report.png';

function Register() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [registeredPeople, setRegisteredPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    // Fetch the current user from Firebase
    const currentUser = auth.currentUser;
    if (currentUser) {
      setEmail(currentUser.email); // Set the email of the logged-in user
    } else {
      // Handle the case where there's no user logged in
      setEmail('Admin');
    }

    // Fetch data from Firestore
    const fetchPeople = async () => {
      const peopleCollection = collection(db, 'people');
      const peopleSnapshot = await getDocs(peopleCollection);
      const peopleList = peopleSnapshot.docs.map(doc => doc.data());
      setRegisteredPeople(peopleList); // Update state with fetched data
    };

    fetchPeople(); // Call the function to fetch data
  }, []);

  // Filtered list based on search query
  const filteredPeople = registeredPeople.filter(person =>
    `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <h2 className="text-xl font-bold">Admin</h2>
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

        <main className="flex-1 p-6">
          <div className="home-container flex flex-col justify-center items-center h-full bg-gray-300">
            <h1 className="text-4xl font-bold mb-8">Register</h1>
            
            {/* Search Bar */}
            <div className="mb-6 w-full max-w-md">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-400"
              />
            </div>

            {/* Registered Sign-Ups Table */}
            <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] w-full max-w-6xl overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Registered Sign-Ups</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Age</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Gender</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Address</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Contact Number</th>
                    <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">Relative's Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPeople.length ? (
                    filteredPeople.map((person, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b border-gray-200">{person.firstName} {person.lastName}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{person.age}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{person.gender}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{person.address}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{person.contactNumber}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{person.relativeContactNumber}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-2 px-4 border-b border-gray-200 text-center text-gray-600">No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;

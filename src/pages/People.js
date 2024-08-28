import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase auth and Firestore
import { addDoc, collection } from 'firebase/firestore'; // Import Firestore functions
import dashboard from '../assets/dashboard.png';
import logout from '../assets/logout.png';
import people from '../assets/people.png';
import question from '../assets/question.png';
import report from '../assets/report.png';

function People() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    address: '',
    contactNumber: '',
    relativeContactNumber: '',
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with the form data to Firestore
      await addDoc(collection(db, 'people'), {
        ...formData,
        createdAt: new Date(),
      });

      // Optionally reset the form after submission
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        address: '',
        contactNumber: '',
        relativeContactNumber: '',
      });

      alert('Registration successful!');
    } catch (error) {
      console.error('Error saving document: ', error);
      alert('There was an error saving the data.');
    }
  };

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
            <h1 className="text-4xl font-bold mb-8">People</h1>
            <form className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter age"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactNumber">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="relativeContactNumber">
                  Relative Contact Number
                </label>
                <input
                  type="text"
                  id="relativeContactNumber"
                  name="relativeContactNumber"
                  value={formData.relativeContactNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter relative contact number"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default People;

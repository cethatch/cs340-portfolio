/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./RegistrationsTableRow";
import { useNavigate } from 'react-router-dom';

import axios from "axios";

const RegistrationsTable = () => {
  const [registrations, setRegistrations] = useState([]);
  
  // Fetch registrations from backend
  const fetchRegistrations = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "registrations";
      const response = await axios.get(URL);
      setRegistrations(response.data);
    } catch (error) {
      alert("Error fetching registrations from the server.");
      console.error("Error fetching registrations:", error);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div>
      <h2>Registrations Table</h2>
      {registrations.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No registrations found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Student Name</th>
              <th>Class name</th>
              <th>ClassInstance ID</th>
              <th>Invoice ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration) => (
              <TableRow key={registration.registrationID} registration={registration} fetchRegistrations={fetchRegistrations} />
            ))}
            
            
          </tbody>
        </table>
      )} 
    </div>
  );
};

export default RegistrationsTable;
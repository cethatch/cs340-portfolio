/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./InstructorsTableRow";
import axios from "axios";

const InstructorsTable = () => {
  const [instructors, setInstructors] = useState([]);
  
  const fetchInstructors = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "instructors";
      const response = await axios.get(URL);
      setInstructors(response.data);
    } catch (error) {
      alert("Error fetching instructors from the server.");
      console.error("Error fetching instructors:", error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  return (
    <>
      <h3>Instructors Table</h3>
        {instructors.length === 0 ? (
          <div>
            <RiCreativeCommonsZeroFill size={70} color="#ccc" />
            <p>No classes found.</p>
          </div>
        ) : (
        <table>
          <thead>
            <tr>
              <th>Instructor ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Hire Date</th>
              <th>Specialty</th>
              <th>Hourly Rate</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.instructorID} instructor={instructor} fetchInstructors={fetchInstructors} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default InstructorsTable;
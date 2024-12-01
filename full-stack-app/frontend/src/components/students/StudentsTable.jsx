/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./StudentsTableRow";
import axios from "axios";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "students";
      const response = await axios.get(URL);
      setStudents(response.data);
    } catch (error) {
      alert("Error fetching students from the server.");
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <>
      <h2>Students Table</h2>
      {students.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No students found.</p>
        </div>
      ) : (
        <div>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <TableRow key={student.studentID} student={student} fetchStudents={fetchStudents} />
            ))}
          </tbody>
        </table></div>
      )}
    </>

  );
};

export default StudentsTable;
/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import TableRow from "./InstructorAssignmentsTableRow";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

import axios from "axios";

const InstructorAssignmentsTable = () => {
  const [assignments, setAssignments] = useState([]);
  
  const fetchClassInstructors = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "instructor_assignments";
      const response = await axios.get(URL);
      setAssignments(response.data);
    } catch (error) {
      alert("Error fetching instructor assignments from the server.");
      console.error("Error fetching instructor assignments:", error);
    }
  };

  useEffect(() => {
    fetchClassInstructors();
  }, []);

  return (
    <div>

      <h3>Instructor Assignments Table</h3>
      {assignments.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No assignments found.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Assignment ID</th>
              <th>Instructor Name</th>
              <th>ClassInstance ID</th>
              <th>Class Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Kitchen Address</th>
              <th>Private Event?</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.classInstructorID} assignment={assignment} fetchClassInstructors={fetchClassInstructors} />
            ))}
          </tbody>
        </table>
     )}
    </div>
  );
};

export default InstructorAssignmentsTable;
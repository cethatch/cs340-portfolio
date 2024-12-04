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
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const DeleteInstructorAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const classInstructor = location.state.assignment;

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Send delete request to backend server
    try {
      const URL = import.meta.env.VITE_API_URL + "instructor_assignments/" + classInstructor.classInstructorID;
      const response = await axios.delete(URL)
      if (response.status !== 200) {
        alert("Error deleting instructor assignment");
      } else {
        alert(response.data.message);
        // Redirect to instructor assignments page
        navigate("/instructor_assignments");
        }
      } catch (err) {
        console.log("Error deleting instructor assignment:", err);
      }
    };

  return (
    <div>
      <h3>Delete Instructor Assignment Entry</h3>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Assignment ID</td>
              <td>{classInstructor.classInstructorID}</td>
            </tr>
            <tr>
              <td>Instructor First Name</td>
              <td>{classInstructor.instFirstName}</td>
            </tr>
            <tr>
              <td>Instructor Last Name</td>
              <td>{classInstructor.instLastName}</td>
            </tr>
            <tr>
              <td>Class Name</td>
              <td>{classInstructor.className}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{new Date(classInstructor.classDate).toISOString().split('T')[0]} </td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{new Date(`1970-01-01T${classInstructor.classTime}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}</td>
            </tr>
            <tr>
              <td>Kitchen Address</td>
              <td> {classInstructor.kitchenLocation} </td>
            </tr>
          </tbody>
        </table>
        
        <button type="submit" className="submitButton">Delete Assignment</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructor_assignments")}>
          Cancel
        </button>
      </form>
    </div>
    
  );
};

export default DeleteInstructorAssignment;
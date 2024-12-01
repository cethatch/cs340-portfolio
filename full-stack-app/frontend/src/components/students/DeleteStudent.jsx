/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const DeleteStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const student = location.state.student;

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Send delete request to backend server
    try {
      const URL = import.meta.env.VITE_API_URL + "students/" + student.studentID;
      const response = await axios.delete(URL)
      if (response.status !== 200) {
        alert("Error deleting student");
      } else {
        alert(response.data.message);
        // Redirect to students page
        navigate("/students");
        }
      } catch (err) {
        console.log("Error deleting student:", err);
      }
    };

  return (
    <div>
      <h2>Delete Student Entry</h2>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Student ID</td>
              <td>{student.studentID}</td>
            </tr>
            <tr>
              <td>Student first name: </td>
              <td>{student.firstName}</td>
            </tr>
            <tr>
              <td>Student last name: </td>
              <td>{student.lastName}</td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="submitButton">Delete Student</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/students")}>
          Cancel
        </button>
      </form>
    </div>
    
  );
};

export default DeleteStudent;
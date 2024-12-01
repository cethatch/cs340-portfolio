/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const DeleteInstructor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const instructor = location.state.instructor;

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Send delete request to backend server
    try {
      const URL = import.meta.env.VITE_API_URL + "instructors/" + instructor.instructorID;
      const response = await axios.delete(URL)
      if (response.status !== 200) {
        alert("Error deleting instructor");
      } else {
        alert(response.data.message);
        // Redirect to instructors page
        navigate("/instructors");
        }
      } catch (err) {
        console.log("Error deleting instructor:", err);
      }
    };

  return (
    <div>
      <h2>Delete Instructor Entry</h2>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Instructor ID</td>
              <td>{instructor.instructorID}</td>
            </tr>
            <tr>
              <td>First name:</td>
              <td>{instructor.instFirstName}</td>
            </tr>
            <tr>
              <td>Last name:</td>
              <td>{instructor.instLastName}</td>
            </tr>
          </tbody>
        </table>
       
        <button type="submit" className="submitButton">Delete Instructor</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructors")}>
          Cancel
        </button>
      </form>
    </div>
    
  );
};

export default DeleteInstructor;
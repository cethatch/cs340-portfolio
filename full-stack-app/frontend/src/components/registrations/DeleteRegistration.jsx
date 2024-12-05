/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const DeleteRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const registration = location.state.registration;

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Send delete request to backend server
    try {
      const URL = import.meta.env.VITE_API_URL + "registrations/" + registration.registrationID;
      const response = await axios.delete(URL)
      if (response.status !== 200) {
        alert("Error deleting registration");
      } else {
        alert(response.data.message);
        // Redirect to kitchens page
        navigate("/registrations");
        }
      } catch (err) {
        console.log("Error deleting registration:", err);
      }
    };

  return (
    <div>
      <h2>Delete Registration Entry</h2>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Registration ID</td>
              <td>{registration.registrationID}</td>
            </tr>
            <tr>
              <td>Student name:</td>
              <td>{registration.firstName + " " + registration.lastName}</td>
            </tr>
            <tr>
              <td>Class name:</td>
              <td>{registration.className}</td>
            </tr>
            <tr>
              <td>Class date:</td>
              <td>{new Date(registration.classDate).toISOString().split('T')[0]}</td>
            </tr>
            <tr>
              <td>Class time:</td>
              <td>{new Date(`1970-01-01T${registration.classTime}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}</td>
            </tr>
            <tr>
              <td>Kitchen address:</td>
              <td>{registration.kitchenLocation}</td>
            </tr>
          </tbody>
        </table>
        
        <button type="submit" className="submitButton">Delete Registration</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/registrations")}>
          Cancel
        </button>
      </form>
    </div>
    
  );
};

export default DeleteRegistration;
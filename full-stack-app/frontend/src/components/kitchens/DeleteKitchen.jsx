/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

const DeleteKitchen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const kitchen = location.state.kitchen;

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Send delete request to backend server
    try {
      const URL = import.meta.env.VITE_API_URL + "kitchens/" + kitchen.kitchenID;
      const response = await axios.delete(URL)
      if (response.status !== 200) {
        alert("Error deleting kitchen");
      } else {
        alert(response.data.message);
        // Redirect to kitchens page
        navigate("/kitchens");
        }
      } catch (err) {
        console.log("Error deleting kitchen:", err);
      }
    };

  return (
    <div>
      <h2>Delete Kitchen Entry</h2>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Kitchen ID</td>
              <td>{kitchen.kitchenID}</td>
            </tr>
            <tr>
              <td>Kitchen Address</td>
              <td>{kitchen.kitchenLocation}</td>
            </tr>
            <tr>
              <td>Room Capacity (persons)</td>
              <td>{kitchen.capacity}</td>
            </tr>
          </tbody>
        </table>
       
        <button type="submit" className="submitButton">Delete Kitchen</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/kitchens")}>
          Cancel
        </button>
      </form>
    </div>
    
  );
};

export default DeleteKitchen;
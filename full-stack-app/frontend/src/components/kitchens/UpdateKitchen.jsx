/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateKitchen = () => {
  const { kitchenID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevKitchen = location.state.kitchen;

  const [formData, setFormData] = useState({
    kitchenLocation: prevKitchen.kitchenLocation || '',
    capacity: prevKitchen.capacity || ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    event.target.select();
  };

  function isUpdate(){
    // Check if formData is equal to prevPerson
    if (JSON.stringify(formData) === JSON.stringify({
      kitchenLocation: prevKitchen.kitchenLocation || '',
      capacity: prevKitchen.capacity || ''
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevKitchen
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "kitchens/" + kitchenID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating kitchen");
        } else {
          alert(response.data.message);
          // Redirect to kitchens page
          navigate("/kitchens");
        }
      } catch (err) {
        console.log("Error updating kitchen:", err);
      }
    }
  };

  return (
    <div>
      <h3>Update kitchen:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
          <tr>
            <td>Kitchen ID:</td>
            <td>{prevKitchen.kitchenID}</td>
          </tr>
          <tr>
              <td><label>Kitchen Address:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="kitchenLocation"
                    onChange={handleInputChange}
                    maxLength={100}
                    required
                    defaultValue={prevKitchen.kitchenLocation}
                    onFocus={handleSelect}
                  />
              </td>
          </tr>
        
        <tr>
          <td><label>Room Capacity (Persons)</label></td>
          <td>
              <input
                type="number"
                name="capacity"
                min={0}
                max={2147483647}
                onChange={handleInputChange}
                defaultValue={prevKitchen.capacity}
                onFocus={handleSelect}
              />
          </td>
        </tr>
        
        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update kitchen</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/kitchens")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateKitchen;
/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateKitchen() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kitchenLocation: "",
    capacity: ""
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new person object from the formData
    const newKitchen = {
        kitchenLocation: formData.kitchenLocation,
        capacity: formData.capacity
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "kitchens";
      const response = await axios.post(URL, newKitchen);
      if (response.status === 201) {
        navigate("/kitchens");
      } else {
        alert("Error creating kitchen.");
      }
    } catch (error) {
      alert("Error creating kitchen.");
      console.error("Error creating kitchen:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        kitchenLocation: "",
        capacity: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
        <h3>Add a new kitchen:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="kitchenLocation">Kitchen Address:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="kitchenLocation"
                            required
                            maxLength={100}
                            defaultValue={formData.kitchenLocation}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="capacity">Room Capacity (persons):</label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="capacity"
                            min={0}
                            defaultValue={formData.capacity}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Kitchen</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/kitchens")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateKitchen;
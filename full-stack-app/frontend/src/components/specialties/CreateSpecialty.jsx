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

function CreateSpecialty() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialtyName: ""
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new specialty object from the formData
    const newSpecialty = {
        specialtyName: formData.specialtyName
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "specialties";
      const response = await axios.post(URL, newSpecialty);
      if (response.status === 201) {
        navigate("/specialties");
      } else {
        alert("Error creating specialty.");
      }
    } catch (error) {
      alert("Error creating specialty.");
      console.error("Error creating specialty:", error);
    }
  // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        specialtyName: ""
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
        <h3>Add a new specialty:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="className">Specialty name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="specialtyName"
                            required
                            defaultValue={formData.specialtyName}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Specialty</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/specialties")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateSpecialty;
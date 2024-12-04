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

function CreateClass() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    className: "",
    duration: "",
    cost: "",
    classDescription: "",
  });
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new person object from the formData
    const newClass = {
        className: formData.className,
        duration: formData.duration,
        registrationCost: formData.registrationCost,
        classDescription: formData.classDescription,
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "classes";
      const response = await axios.post(URL, newClass);
      if (response.status === 201) {
        navigate("/classes");
      } else {
        alert("Error creating class.");
      }
    } catch (error) {
      alert("Error creating class.");
      console.error("Error creating class:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        className: "",
        duration: "",
        cost: "",
        description: "",
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
        <h3>Add a new class:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="className">Class Name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="className"
                            required
                            maxLength={100}
                            defaultValue={formData.className}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="duration">Duration (Minutes)</label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="duration"
                            min={0}
                            defaultValue={formData.duration}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="registrationCost">Registration Cost (USD)</label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="registrationCost"
                            placeholder="$0.00"
                            step='0.01'
                            min={0}
                            value={formData.registrationCost}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="classDescription">Description</label>
                        </td>
                        <td>
                            <input type="text" 
                            name="classDescription" 
                            value={formData.classDescription} 
                            onChange={handleInputChange} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Class</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/classes")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateClass;
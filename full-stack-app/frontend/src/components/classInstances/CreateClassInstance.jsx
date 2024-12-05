/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateClassInstance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    classID: "",
    classDate: "",
    classTime: "",
    kitchenID: "",
    privateEvent: ""
  });

  const [classOptions, setClassOptions] = useState([]);

  // Fetch class options from the backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "classes";
        const response = await axios.get(URL);
        setClassOptions(response.data);
      } catch (error) {
        console.error("Error fetching class options:", error);
        alert("Could not load class options");
      }
    };

    fetchClasses();
  }, []);

  const [kitchenOptions, setKitchenOptions] = useState([]);

  // Fetch kitchen options from the backend
  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "kitchens";
        const response = await axios.get(URL);
        setKitchenOptions(response.data);
      } catch (error) {
        console.error("Error fetching kitchen options:", error);
        alert("Could not load kitchen options");
      }
    };

    fetchKitchens();
  }, []);
  
  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new classInstance object from the formData
    const newClassInstance = {
        classID: formData.classID,
        classDate: formData.classDate,
        classTime: formData.classTime,
        kitchenID: formData.kitchenID,
        privateEvent: formData.privateEvent ? 1 : 0
    };

    try {
      const URL = import.meta.env.VITE_API_URL + "schedule";
      const response = await axios.post(URL, newClassInstance);
      
      if (response.status === 201) {
        navigate("/schedule");
      } else {
        alert("Error scheduling class.");
      }
    } catch (error) {
      alert("Error scheduling class.");
      console.error("Error scheduling class:", error);
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        classID: "",
        classDate: "",
        classTime: "",
        kitchenID: "",
        privateEvent: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type==="checkbox" ? checked : value,
    }));
  };

  return (
    <>
        <h3>Schedule a class:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="className">Class Name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <select id="classID" 
                            name="classID" 
                            required
                            defaultValue={formData.classID}
                            onChange={handleInputChange}
                            style={{width: 300, height: 30}} 
                            >
                                <option value={""}>Select a class type</option>
                                {classOptions.map((class_type) => (
                                    <option key={class_type.classID} value={class_type.classID}>
                                        {class_type.className}
                                    </option>
                                ))}
                            </select>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="classDate">Date: <span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="classDate"
                            required
                            defaultValue={formData.classDate}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="classTime">Time:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="time"
                            name="classTime"
                            defaultValue={formData.classTime}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="kitchenID">Kitchen Address:</label>
                        </td>
                        <td>
                            <select id="kitchenID" 
                            name="kitchenID" 
                            defaultValue={formData.kitchenID}
                            onChange={handleInputChange}
                            style={{width: 300, height: 30}}
                            >
                                <option value={""}>Select a kitchen address</option>
                                {kitchenOptions.map((kitchen) => (
                                    <option key={kitchen.kitchenID} value={kitchen.kitchenID}>
                                        {kitchen.kitchenLocation}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="privateEvent">Private Event?</label>
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            name="privateEvent"
                            style={{cursor: "pointer"}}
                            defaultValue={formData.privateEvent}
                            onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Add to Schedule</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/schedule")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateClassInstance;
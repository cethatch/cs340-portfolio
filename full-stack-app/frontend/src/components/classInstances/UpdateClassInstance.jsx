/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdateClassInstance = () => {
  const { classInstanceID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevClassInstance = location.state.classInstance;

  const [formData, setFormData] = useState({
    classID: prevClassInstance.classID,
    classDate: prevClassInstance.classDate,
    classTime: prevClassInstance.classTime,
    kitchenID: prevClassInstance.kitchenID || '',
    privateEvent: prevClassInstance.privateEvent ? 1 : 0
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

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;    
    setFormData((prevData) => ({
      ...prevData,
      [name]: type==="checkbox" ? checked : value,
    }));
  };


  function isUpdate(){
    // Check if formData is equal to prevPerson
    if (JSON.stringify(formData) === JSON.stringify({
      classID: prevClassInstance.classID || '',
      classDate: prevClassInstance.classDate || '',
      classTime: prevClassInstance.classTime || '',
      kitchenLocation: prevClassInstance.kitchenLocation || '',
      privateEvent: prevClassInstance.privateEvent ? 1 : 0
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPerson
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "schedule/" + classInstanceID;
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating scheduled class.");
        } else {
          alert(response.data.message);
          // Redirect to schedule page
          navigate("/schedule");
        }
      } catch (err) {
        console.log("Error updating scheduled class.:", err);
      }
    }
  };


  return (
    <div>
      <h3>Update scheduled class:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
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
                      value={formData.classID || ""}
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
                      defaultValue={formData.classDate ? new Date(formData.classDate).toISOString().split('T')[0] : ""}
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
                      value={formData.kitchenID}
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
                    style={{ cursor: "pointer" }}
                    checked={formData.privateEvent === 1} 
                    onChange={(e) => setFormData((prevFormData) => ({
                      ...prevFormData,
                      privateEvent: e.target.checked ? 1 : 0,
                    }))}
                  />
                </td>
              </tr>
          </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/schedule")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateClassInstance;
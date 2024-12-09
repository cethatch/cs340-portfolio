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

const UpdateClass = () => {
  const { classID } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const prevClass = location.state.class_entry;

  const [formData, setFormData] = useState({
    className: prevClass.className || '',
    duration: prevClass.duration || '',
    registrationCost: prevClass.registrationCost || '',
    classDescription: prevClass.classDescription || '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function isUpdate(){
    // Check if formData is equal to prevPerson
    if (JSON.stringify(formData) === JSON.stringify({
      className: prevClass.className || '',
      duration: prevClass.duration || '',
      registrationCost: prevClass.registrationCost || '',
      classDescription: prevClass.classDescription || '',
    })) {
      alert("No changes made.");
      return false;
    }
    return true
  }

  // Select the entire form field for easy editting
  const handleSelect = (event) => {
      event.target.select();
    };

  const handleSubmit = async (event) => {
    // Stop default form behavior which is to reload the page
    event.preventDefault();
    // Check if formData is equal to prevPerson
    if (isUpdate()){
      try {
        const URL = import.meta.env.VITE_API_URL + "classes/" + classID;
        console.log(URL);
        const response = await axios.put(URL, formData);
        if (response.status !== 200) {
          alert("Error updating class");
        } else {
          // alert(response.data.message);
          // Redirect to people page
          navigate("/classes");
        }
      } catch (err) {
        console.log("Error updating person:", err);
      }
    }
  };

  return (
    <div>
      <h3>Update class:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
          <tr>
              <td><label>Class Name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="className"
                    onChange={handleInputChange}
                    required
                    defaultValue={prevClass.className}
                    onFocus={event => {
                      event.target.select();
                    }}
                  />
              </td>
          </tr>
        
        <tr>
          <td><label>Duration (Minutes)</label></td>
          <td>
              <input
                type="number"
                name="duration"
                min={0}
                max={2147483647}
                onChange={handleInputChange}
                defaultValue={prevClass.duration}
                onFocus={event => {
                  event.target.select();
                }}
              />
          </td>
        </tr>
        <tr>
          <td><label>Registration Cost (USD):</label></td>
          <td>
              <input
                type="number"
                name="registrationCost"
                min={0}
                max={9999.99}
                step='0.01'
                onChange={handleInputChange}
                defaultValue={prevClass.registrationCost}
                onFocus={handleSelect}
              />
          </td>
        </tr>
        <tr>
          <td><label>Description:</label></td>
          <td>
              <textarea id="classDescription" 
                name="classDescription"
                wrap="hard"
                defaultValue={formData.classDescription}
                onChange={handleInputChange}
                onFocus={handleSelect}
                style={{width: 300, height: 100}} 
                ></textarea>
          </td>
        </tr>
        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/classes")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateClass;
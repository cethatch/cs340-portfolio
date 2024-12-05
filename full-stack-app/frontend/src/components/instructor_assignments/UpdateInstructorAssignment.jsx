/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";

const UpdateInstructorAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevAssignment = location.state.assignment;

  const [formData, setFormData] = useState({
    instructorID: prevAssignment.instructorID || '',
    classInstanceID: prevAssignment.classInstanceID || '',
  });

  const [classOptions, setClassOptions] = useState([]);
  const [classInstances, setClassInstances] = useState([]);
  const [instructorOptions, setInstructorOptions] = useState([]);
  const [filters, setFilters] = useState({ className: "", classDate: "", classTime: "" });
  const [selectedClassInstance, setSelectedClassInstance] = useState(prevAssignment.classInstanceID);

  // Fetch class name options from the backend
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "classes";
        const response = await axios.get(URL);
        setClassOptions(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
        alert("Could not load classes");
      }
    };

    fetchClasses();
  }, []);

  // Fetch scheduled classInstance options from the backend
  useEffect(() => {
    const fetchClassInstances = async () => {
      try {
        const URL = import.meta.env.VITE_API_URL + "schedule";
        const response = await axios.get(URL);
        setClassInstances(response.data);
      } catch (error) {
        console.error("Error fetching scheduled classes:", error);
        alert("Could not load scheduled classes");
      }
    };

    fetchClassInstances();
  }, []);

  // Fetch instructor options from the backend
  useEffect (() => {
    const fetchInstructors = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "instructors";
            const response = await axios.get(URL);
            setInstructorOptions(response.data);
        } catch (error) {
            console.log("Error fetching instructor options:", error);
            alert("Could not load instructor options");
        }
    };

    fetchInstructors();
  }, []);

  function isUpdate() {
    if (
        formData.instructorID === prevAssignment.instructorID &&
        selectedClassInstance === prevAssignment.classInstanceID
    ) {
        alert("No changes made.");
        return false;
    }
    return true;
}

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Filter class instances based on selected filters
  const filteredClassInstances = classInstances.filter((instance) => {
    const instanceDate = new Date(instance.classDate).toISOString().split("T")[0];
    const instanceTime = instance.classTime.slice(0, 5);
    return (
      (!filters.className || instance.className === filters.className) &&
      (!filters.classDate || instanceDate === filters.classDate) &&
      (!filters.classTime || instanceTime === filters.classTime) 
    );
  });

  const handleCheckboxChange = (classInstanceID) => {
    setSelectedClassInstance((prev) =>
      prev === classInstanceID ? null : classInstanceID 
    );
  };

  const handleSubmit = async (e) => {
    // Prevent page reload
    e.preventDefault();
    // Create a new person object from the formData
    
    const newClassInstructor = {
        instructorID: formData.instructorID,
        classInstanceID: selectedClassInstance
    };
    if (isUpdate()){
        console.log(JSON.stringify(newClassInstructor));
        try {
        const URL = import.meta.env.VITE_API_URL + "instructor_assignments/" + prevAssignment.classInstructorID;
        const response = await axios.put(URL, newClassInstructor);
        if (response.status === 200) {
            navigate("/instructor_assignments");
        } else {
            alert("Error updating instructor assignment.");
        }
        } catch (error) {
        alert("Error updating instructor assignment.");
        console.error("Error updating instructor assignment:", error);
        }
    }
    // Reset the form fields
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormData({
        instructorID: "",
        classInstanceID: "",
    });
    };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };  

  return (
    <>
      <h3>Update instructor assignment:</h3>
      <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <h4>Select an instructor: <span className='req'> * </span></h4>
              <select id="instructorID" 
              name="instructorID" 
              value={formData.instructorID || ""}
              onChange={handleInputChange}
              style={{width: 375, height: 40, marginLeft: 15, padding: 10}} 
              >
                <option value={""}>Select an instructor</option>
                {instructorOptions.map((instructor) => (
                  <option key={instructor.instructorID} value={instructor.instructorID}>
                  {instructor.instFirstName + " " + instructor.instLastName}
                  </option>
                  ))}
              </select>
            
            <h4>Select a scheduled class: <span className='req'> * </span></h4>
            <div className="filterContainer">
              <FaFilter/>
                      <select id="className" 
                        name="className" 
                        onChange={handleFilterChange}
                        style={{width: 200, height: 30}} 
                        >
                              <option value={""}>Select a class</option>
                              {classOptions.map((class_entry) => (
                                <option key={class_entry.className} value={class_entry.className}>
                                {class_entry.className}
                                </option>
                                ))}
                                
                      </select>

                      <input
                        type="date"
                        name="classDate"
                        onChange={handleFilterChange}
                        />

                      <input
                        type="time"
                        name="classTime"
                        onChange={handleFilterChange}
                        />
            </div>

          
          {filteredClassInstances.length === 0 ? (
              <div>
                <p>No scheduled classes found with given filters.</p>
                <RiCreativeCommonsZeroFill size={100} color="pink" />
              </div>
            
          ) : (
            <table style={{width: 1000}}>
              <thead>
                <tr>
                  <th>Select a Class Instance:</th>
                  <th>ClassInstance ID</th>
                  <th>Class Name</th>
                  <th>Class Date</th>
                  <th>Class Time</th>
                  <th>Kitchen Address</th>
                </tr>
              </thead>
              <tbody>
              {filteredClassInstances.map((instance) => (
                        <tr key={instance.classInstanceID}>
                            <td>
                            {instance.classInstanceID === prevAssignment.classInstanceID ? (
                                <span>Previous</span>
                            ) : (
                                <input
                                type="checkbox"
                                name="selectedClassInstance"
                                style={{ cursor: "pointer" }}
                                checked={selectedClassInstance === instance.classInstanceID}
                                onChange={() => handleCheckboxChange(instance.classInstanceID)}
                                />
                            )}
                            </td>
                            <td>{instance.classInstanceID}</td>
                            <td>{instance.className}</td>
                            <td>{new Date(instance.classDate).toLocaleDateString()}</td>
                            <td>{new Date(`1970-01-01T${instance.classTime}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}</td>
                            <td>{instance.kitchenLocation}</td>
                          </tr>
              ))}
              </tbody>
            </table>
          )}
        
      <button type="submit" className="submitButton">Update Assignment</button>
      <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructor_assignments")}> Cancel </button>
      </form>
      
    </>
  );
};

export default UpdateInstructorAssignment;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreateClass = () => {
function CreateClass() {
  const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     className: "",
//     duration: "",
//     cost: "",
//     description: "",
//   });
  
//   const handleSubmit = async (e) => {
//     // Prevent page reload
//     e.preventDefault();
//     // Create a new person object from the formData
//     const newClass = {
//         className: formData.className,
//         duration: formData.duration,
//         cost: formData.cost,
//         description: formData.description,
//     };

//     try {
//       const URL = import.meta.env.VITE_API_URL + "classes";
//       const response = await axios.post(URL, newClass);
//       if (response.status === 201) {
//         navigate("/classes");
//       } else {
//         alert("Error creating class.");
//       }
//     } catch (error) {
//       alert("Error creating class.");
//       console.error("Error creating class:", error);
//     }
//     // Reset the form fields
//     resetFormFields();
//   };

//   const resetFormFields = () => {
//     setFormData({
//         className: "",
//         duration: "",
//         cost: "",
//         description: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

    const handleSubmit = () => {
        navigate("/classes");
    }

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
                            // defaultValue={formData.fname}
                            // onChange={handleInputChange}
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
                            // defaultValue={formData.lname}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="cost">Registration Cost (USD)</label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="cost"
                            placeholder="$0.00"
                            min={0}
                            // value={formData.homeworld}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="description">Description</label>
                        </td>
                        <td>
                            <input type="text" 
                            name="description" 
                            // value={formData.age} 
                            // onChange={handleInputChange} 
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Person</button>
        </form>
    </>
  );
}

export default CreateClass;
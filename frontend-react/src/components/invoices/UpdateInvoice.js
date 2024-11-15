import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateInvoice = () => {
//   const { id } = useParams();
  const navigate = useNavigate();
//   const location = useLocation();
//   const prevPerson = location.state.person;

//   const [formData, setFormData] = useState({
//     fname: prevPerson.fname || '',
//     lname: prevPerson.lname || '',
//     homeworld: prevPerson.homeworld || '',
//     age: prevPerson.age || '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   function isUpdate(){
//     // Check if formData is equal to prevPerson
//     if (JSON.stringify(formData) === JSON.stringify({
//       fname: prevPerson.fname || '',
//       lname: prevPerson.lname || '',
//       homeworld: prevPerson.homeworld || '',
//       age: prevPerson.age || '',
//     })) {
//       alert("No changes made.");
//       return false;
//     }
//     return true
//   }

//   const handleSubmit = async (event) => {
//     // Stop default form behavior which is to reload the page
//     event.preventDefault();
//     // Check if formData is equal to prevPerson
//     if (isUpdate()){
//       try {
//         const URL = import.meta.env.VITE_API_URL + "people/" + id;
//         const response = await axios.put(URL, formData);
//         if (response.status !== 200) {
//           alert("Error updating person");
//         } else {
//           alert(response.data.message);
//           // Redirect to people page
//           navigate("/people");
//         }
//       } catch (err) {
//         console.log("Error updating person:", err);
//       }
//     }
//   };

    // Remove once backend is working and use the method above:
    const handleSubmit = () => {
        navigate("/invoices");
    }

  return (
    <div>
      <h3>Update invoice:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
            <tr>
              <td><label htmlFor="invoiceID">Invoice ID</label></td>
              <td>
              
              </td>
          </tr>
          <tr>
                        <td>
                            <label htmlFor="studentName">Student name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <select id="studentName"
                            name="studentName" 
                            required
                            // defaultValue={formData.specialty}
                            // onChange={handleInputChange}
                            style={{width: 300, height: 30}} 
                            >
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="invoiceDate">Invoice date:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="invoiceDate"
                            required
                            // defaultValue={formData.instLastName}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="totalDue">Total Due:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="totalDue"
                            required
                            // defaultValue={formData.phoneNumber}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="paymentComplete">Payment complete?</label>
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            name="paymentComplete"
                            // defaultValue={formData.phoneNumber}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="comments">Comments: </label>
                        </td>
                        <td>
                            <select id="comments" 
                            name="comments" 
                            required
                            // defaultValue={formData.specialty}
                            // onChange={handleInputChange}
                            style={{width: 300, height: 30}} 
                            >
                            </select>
                        </td>
                    </tr>

        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/invoices")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateInvoice;
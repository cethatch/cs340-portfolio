import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import TableRow from "./InvoicesTableRow";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

// import axios from "axios";

const InvoicesTable = () => {
  // const [classes, setClasses] = useState([]);
  const navigate = useNavigate();


  // const fetchClasses = async () => {
  //   try {
  //     const URL = import.meta.env.VITE_API_URL + "classes";
  //     const response = await axios.get(URL);
  //     setClasses(response.data);
  //   } catch (error) {
  //     alert("Error fetching classes from the server.");
  //     console.error("Error fetching classes:", error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchClasses();
  // }, []);

  return (
    <div>

      <h3>Invoices Table</h3>
      {/* {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : ( */}
        <table>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Student ID</th>
              <th>Student First</th>
              <th>Student Last</th>
              <th>Invoice Date</th>
              <th>Invoice Total</th>
              <th>Paid?</th>
              <th>Comments</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {classes.map((class) => (
              <TableRow key={class.id} class={class} fetchClasses={fetchClasses} />
            ))} */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="editCol">
                <BiEditAlt 
                onClick={() => navigate("/invoices/update")} 
                size={25} 
                style={{ cursor: "pointer" }} />
              </td>
              <td className="editCol">
                <MdDelete
                onClick={() => navigate("/invoices/delete")} 
                size={25} 
                style={{ cursor: "pointer"}} />
              </td>
            </tr>
            
          </tbody>
        </table>
      {/* )} */}
    </div>
  );
};

export default InvoicesTable;
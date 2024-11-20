// import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
// const TableRow = ({ classes, fetchClasses }) => {
const TableRow = () => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    // navigate("/classes/update/" + classes.id, { state: { classes } });
    navigate("/classes/update/");
  };

  return (
    // <tr key={classes.id}>
    //   <td>{classes.id}</td>
    //   <td>{classes.fname}</td>
    //   <td>{classes.lname}</td>
    //   <td>{classes.homeworld}</td>
    //   <td>{classes.age}</td>
    //   <td>
    //     <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
    //   </td>
    // </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="editCol">
          <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }}/>
        </td>
      </tr>

  );
};

export default TableRow;
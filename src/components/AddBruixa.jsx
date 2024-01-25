// import { useState } from "react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const API_URL = "http://localhost:5005";

// function AddBruixa(props) {
//   const [gat, setGat] = useState("");
//   const [peix, setPeix] = useState(new Date()); // Set an initial date value

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { nuvolId } = props;

//     const requestBody = { gat, peix, nuvolId };

//     axios
//       .post(`${API_URL}/api/bruixes`, requestBody)
//       .then((response) => {
//         setGat("");
//         setPeix(new Date()); // Reset date to initial value

//         props.refreshNuvol();
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <div className="AddBruixa">
//       <h3>Add New Bruixa</h3>

//       <form onSubmit={handleSubmit}>
//         <label>Gat:</label>
//         <input
//           type="text"
//           name="gat"
//           value={gat}
//           onChange={(e) => setGat(e.target.value)}
//         />

//         <label>Date:</label>
//         <DatePicker
//           selected={peix}
//           onChange={(date) => setPeix(date)}
//           dateFormat="dd-MM-yyyy" // You can customize the date format based on your needs
//         />

//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// }

// export default AddBruixa;

import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = "http://localhost:5005";

function AddBruixa(props) {
  const [gat, setGat] = useState("");
  const [peix, setPeix] = useState(new Date()); // Set an initial date value

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nuvolId } = props;

    const requestBody = { gat, peix, nuvolId };

    axios
      .post(`${API_URL}/api/bruixes`, requestBody)
      .then((response) => {
        setGat("");
        setPeix(new Date()); // Reset date to initial value

        props.refreshNuvol();
      })
      .catch((error) => console.log(error));
  };

  const formattedDate = peix.toLocaleDateString("en-GB"); // Format date to dd-MM-yyyy

  return (
    <div className="AddBruixa">
      <h3>Add New Bruixa</h3>

      <form onSubmit={handleSubmit}>
        <label>Gat:</label>
        <input
          type="text"
          name="gat"
          value={gat}
          onChange={(e) => setGat(e.target.value)}
        />

        <label>Date:</label>
        <DatePicker
          selected={peix}
          onChange={(date) => setPeix(date)}
          dateFormat="dd-MM-yyyy"
          // You can customize the date format based on your needs
        />

        {/* Display formatted date */}

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddBruixa;

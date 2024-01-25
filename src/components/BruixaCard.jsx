// // import React from "react";
// // import Card from "./GenericCard"; // Adjust the import path as needed

// // // BruixaCard
// // function BruixaCard({ _id, gat, peix, refreshNuvol }) {
// //   return (
// //     <Card type="Bruixa" data={{ _id, gat, peix }} refreshNuvol={refreshNuvol} />
// //   );
// // }

// // export default BruixaCard;

// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function BruixaCard({ _id, gat, peix, refreshNuvol }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedGat, setUpdatedGat] = useState(gat || "");
//   const [updatedPeix, setUpdatedPeix] = useState(peix || "");

//   const handleDelete = () => {
//     axios
//       .delete(`${API_URL}/api/bruixes/${_id}`)
//       .then(() => {
//         refreshNuvol();
//       })
//       .catch((error) => console.log("Error deleting Bruixa:", error));
//   };

//   const handleUpdate = () => {
//     axios
//       .put(`${API_URL}/api/bruixes/${_id}`, {
//         gat: updatedGat,
//         peix: updatedPeix,
//       })
//       .then(() => {
//         refreshNuvol();
//         setIsEditing(false); // Hide the form after updating
//       })
//       .catch((error) => console.log("Error updating Bruixa:", error));
//   };

//   const toggleEditForm = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div key={_id} className="Bruixa card">
//       {isEditing ? (
//         <div>
//           <label>Gat:</label>
//           <input
//             type="text"
//             value={updatedGat}
//             onChange={(e) => setUpdatedGat(e.target.value)}
//           />

//           <label>Peix:</label>
//           <input
//             type="text"
//             value={updatedPeix}
//             onChange={(e) => setUpdatedPeix(e.target.value)}
//           />

//           <button onClick={handleUpdate}>Save</button>
//         </div>
//       ) : (
//         <>
//           {/* <h3>{gat}</h3> */}
//           <p>{peix}</p>
//           <button onClick={handleDelete}>Delete</button>
//           <button onClick={toggleEditForm}>Update</button>
//           <p>bdsfjdf</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default BruixaCard;

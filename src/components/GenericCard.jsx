// // GenericCard.jsx
// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function Card({ type, data, refreshNuvol }) {
//   const [isEditing, setIsEditing] = useState(false);

//   // Destructuring data based on the type
//   const { _id, title, description, gat, peix } = data;

//   const handleDelete = () => {
//     axios
//       .delete(
//         `${API_URL}/api/${type === "Fantasma" ? "fantasmes" : "bruixes"}/${_id}`
//       )
//       .then(() => {
//         refreshNuvol();
//       })
//       .catch((error) => console.log(`Error deleting ${type}:`, error));
//   };

//   const handleUpdate = () => {
//     const updateData =
//       type === "Fantasma" ? { title, description } : { gat, peix };

//     axios
//       .put(
//         `${API_URL}/api/${
//           type === "Fantasma" ? "fantasmes" : "bruixes"
//         }/${_id}`,
//         updateData
//       )
//       .then(() => {
//         refreshNuvol();
//         setIsEditing(false); // Hide the form after updating
//       })
//       .catch((error) => console.log(`Error updating ${type}:`, error));
//   };

//   const toggleEditForm = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div key={_id} className={`${type} card`}>
//       {isEditing ? (
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             value={type === "Fantasma" ? title : gat}
//             onChange={(e) =>
//               type === "Fantasma"
//                 ? setUpdatedTitle(e.target.value)
//                 : setUpdatedGat(e.target.value)
//             }
//           />

//           <label>Description:</label>
//           <textarea
//             value={type === "Fantasma" ? description : peix}
//             onChange={(e) =>
//               type === "Fantasma"
//                 ? setUpdatedDescription(e.target.value)
//                 : setUpdatedPeix(e.target.value)
//             }
//           />

//           <button onClick={handleUpdate}>Save</button>
//         </div>
//       ) : (
//         <>
//           <h3>{type === "Fantasma" ? title : gat}</h3>
//           <p>{type === "Fantasma" ? description : peix}</p>
//           <button onClick={handleDelete}>Delete</button>
//           <button onClick={toggleEditForm}>Update</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Card;

import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Card({ type, data, refreshNuvol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(data.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    data.description
  );
  const [updatedGat, setUpdatedGat] = useState(data.gat);
  const [updatedPeix, setUpdatedPeix] = useState(data.peix);

  // Destructuring data based on the type
  const { _id } = data;

  const handleDelete = () => {
    axios
      .delete(
        `${API_URL}/api/${type === "Fantasma" ? "fantasmes" : "bruixes"}/${_id}`
      )
      .then(() => {
        refreshNuvol();
      })
      .catch((error) => console.log(`Error deleting ${type}:`, error));
  };

  const handleUpdate = () => {
    const updateData =
      type === "Fantasma"
        ? { title: updatedTitle, description: updatedDescription }
        : { gat: updatedGat, peix: updatedPeix };

    axios
      .put(
        `${API_URL}/api/${
          type === "Fantasma" ? "fantasmes" : "bruixes"
        }/${_id}`,
        updateData
      )
      .then(() => {
        refreshNuvol();
        setIsEditing(false); // Hide the form after updating
      })
      .catch((error) => console.log(`Error updating ${type}:`, error));
  };

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div key={_id} className={`${type} card`}>
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={type === "Fantasma" ? updatedTitle : updatedGat}
            onChange={(e) =>
              type === "Fantasma"
                ? setUpdatedTitle(e.target.value)
                : setUpdatedGat(e.target.value)
            }
          />

          <label>Description:</label>
          <textarea
            value={type === "Fantasma" ? updatedDescription : updatedPeix}
            onChange={(e) =>
              type === "Fantasma"
                ? setUpdatedDescription(e.target.value)
                : setUpdatedPeix(e.target.value)
            }
          />

          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          <h3>{type === "Fantasma" ? data.title : data.gat}</h3>
          <p>{type === "Fantasma" ? data.description : data.peix}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleEditForm}>Update</button>
        </>
      )}
    </div>
  );
}

export default Card;

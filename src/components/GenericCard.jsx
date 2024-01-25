// import React, { useState } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// function Card({ type, data, refreshNuvol }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedTitle, setUpdatedTitle] = useState(data.title);
//   const [updatedDescription, setUpdatedDescription] = useState(
//     data.description
//   );

//   // Destructuring data based on the type
//   const { _id } = data;

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
//       type === "Fantasma"
//         ? { title: updatedTitle, description: updatedDescription }
//         : { gat: updatedGat, peix: updatedPeix };

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
//             value={type === "Fantasma" ? updatedTitle : updatedGat}
//             onChange={(e) =>
//               type === "Fantasma"
//                 ? setUpdatedTitle(e.target.value)
//                 : setUpdatedGat(e.target.value)
//             }
//           />

//           <label>Description:</label>
//           <textarea
//             value={type === "Fantasma" ? updatedDescription : updatedPeix}
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
//           <h3>{type === "Fantasma" ? data.title : data.gat}</h3>
//           <p>{type === "Fantasma" ? data.description : data.peix}</p>
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
  const [updatedGarden, setUpdatedGarden] = useState(data.garden);
  const [updatedFlower, setUpdatedFlower] = useState(data.flower);

  // Destructuring data based on the type
  const { _id } = data;

  const handleDelete = () => {
    axios
      .delete(
        `${API_URL}/api/${
          type === "Fantasma"
            ? "fantasmes"
            : type === "Bruixa"
            ? "bruixes"
            : "goblins"
        }/${_id}`
      )
      .then(() => {
        refreshNuvol();
      })
      .catch((error) => console.log(`Error deleting ${type}:`, error));
  };

  const handleUpdate = () => {
    let updateData;

    if (type === "Fantasma") {
      updateData = { title: updatedTitle, description: updatedDescription };
    } else if (type === "Bruixa") {
      updateData = { gat: updatedGat, peix: updatedPeix };
    } else if (type === "Goblin") {
      updateData = { garden: updatedGarden, flower: updatedFlower };
    }

    axios
      .put(
        `${API_URL}/api/${
          type === "Fantasma"
            ? "fantasmes"
            : type === "Bruixa"
            ? "bruixes"
            : "goblins"
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
            value={
              type === "Fantasma"
                ? updatedTitle
                : type === "Bruixa"
                ? updatedGat
                : updatedGarden
            }
            onChange={(e) =>
              type === "Fantasma"
                ? setUpdatedTitle(e.target.value)
                : type === "Bruixa"
                ? setUpdatedGat(e.target.value)
                : setUpdatedGarden(e.target.value)
            }
          />

          <label>Description:</label>
          <textarea
            value={
              type === "Fantasma"
                ? updatedDescription
                : type === "Bruixa"
                ? updatedPeix
                : updatedFlower
            }
            onChange={(e) =>
              type === "Fantasma"
                ? setUpdatedDescription(e.target.value)
                : type === "Bruixa"
                ? setUpdatedPeix(e.target.value)
                : setUpdatedFlower(e.target.value)
            }
          />

          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          <h3>
            {type === "Fantasma"
              ? data.title
              : type === "Bruixa"
              ? data.gat
              : data.garden}
          </h3>
          <p>
            {type === "Fantasma"
              ? data.description
              : type === "Bruixa"
              ? data.peix
              : data.flower}
          </p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleEditForm}>Update</button>
        </>
      )}
    </div>
  );
}

export default Card;

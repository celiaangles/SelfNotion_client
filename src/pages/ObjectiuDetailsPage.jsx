import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ObjectiuDetailsPage(props) {
  const [objectiu, setObjectiu] = useState(null);
  const { objectiuId } = useParams();

  const getObjectiu = () => {
    axios
      .get(`${API_URL}/api/objectius/${objectiuId}`)
      .then((response) => {
        const oneObjectiu = response.data;
        setObjectiu(oneObjectiu);
      })
      .catch((error) => console.log("joder"));
  };

  useEffect(() => {
    getObjectiu();
  }, []);

  return (
    <div className="ObjectiuDetails">
      {objectiu && (
        <>
          <h1>{objectiu.serp}</h1>
          <p>{objectiu.mico}</p>
          <p>a ver k tal</p>
        </>
      )}

      <Link to="/objectius">
        <button>Back to objectius</button>
      </Link>
      <h1>perro flauta</h1>

      <Link to={`/objectius/edit/${objectiuId}`}>
        <button>Edit Objectiu</button>
      </Link>
    </div>
  );
}

export default ObjectiuDetailsPage;

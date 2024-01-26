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
          <h2>{objectiu.mico}</h2>
          <p>{objectiu.mussol}</p>
        </>
      )}

      <Link to="/projects">
        <button>Back to objectius</button>
      </Link>

      <Link to={`/objectius/edit/${objectiuId}`}>
        <button>Edit Objectiu</button>
      </Link>
    </div>
  );
}

export default ObjectiuDetailsPage;

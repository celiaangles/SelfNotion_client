import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function NuvolDetailsPage(props) {
  const [nuvol, setNuvol] = useState(null);
  const { nuvolId } = useParams();

  const getNuvol = () => {
    axios
      .get(`${API_URL}/api/nuvols/${nuvolId}`)
      .then((response) => {
        const oneNuvol = response.data;
        setNuvol(oneNuvol);
      })
      .catch((error) => console.log("joder"));
  };

  useEffect(() => {
    getNuvol();
  }, []);

  return (
    <div className="NuvolDetails">
      {nuvol && (
        <>
          <h1>{nuvol.papallona}</h1>
          <p>{nuvol.cuc}</p>
          <p>kjsdnf</p>
        </>
      )}

      <Link to="/nuvols">
        <button>Back to nuvols</button>
      </Link>

      <Link to={`/nuvols/edit/${nuvolId}`}>
        <button>Edit Nuvol</button>
      </Link>
    </div>
  );
}

export default NuvolDetailsPage;

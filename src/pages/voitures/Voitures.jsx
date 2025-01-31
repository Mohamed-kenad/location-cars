import { useEffect , useState} from "react";
import axios from "axios";
import Voiture from "./Voiture";


function Voitures() {
  const [voitures, setVoitures] = useState([]);
  useEffect(() => { 
    axios.get('http://localhost:8080/voitures')
    .then((response) => {setVoitures(response.data);})
    }, []);
  return (
    <>
        <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {voitures.map((voiture) => (
          <Voiture key={voiture.id} voitures={voiture} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Voitures;
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";

function AccCard({ accomodation }) {
  const [images, setImages] = useState([]);
  const storage = getStorage();
  useEffect(() => {
    const imagesRef = ref(storage, accomodation.id);
    listAll(imagesRef)
      .then((res) => {
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          setImages((prev) => [...prev, url]);
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);
  const navigation = useNavigate();

  function handleNavigateSubPage() {
    navigation(`/home/accomodations/${accomodation.id}`);
  }
  return (
    <div className="AccCard" onClick={handleNavigateSubPage}>
      <div className="img">{images.length > 0 && <img src={images[0]} />}</div>
      <div className="acc-card-info">
        <div className="side-one">
          <h4>{accomodation.room_name}</h4>

          <h6>{accomodation.hotel_name}</h6>
          <p>{accomodation.rating}</p>
          <p>{accomodation.description}</p>
        </div>
        <div>
          <p>{accomodation.price}</p>
        </div>
      </div>
    </div>
  );
}
export default AccCard;

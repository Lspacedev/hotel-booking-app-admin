import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { IoStarSharp } from "react-icons/io5";

function AccCard({ accomodation }) {
  const storage = getStorage();
  const navigation = useNavigate();

  function handleNavigateSubPage() {
    navigation(`/home/accomodations/${accomodation.id}`);
  }
  function printStars(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
    return arr;
  }
  return (
    <div className="AccCard" onClick={handleNavigateSubPage}>
      <div className="img">
        {accomodation.images.length > 0 && <img src={accomodation.images[0]} />}
      </div>
      <div className="acc-card-info">
        <div className="side-one">
          <h4>{accomodation.room_name}</h4>

          <h6>{accomodation.hotel_name}</h6>
          <p>
            {printStars(accomodation.rating) &&
              printStars(accomodation.rating).map((elem, i) => (
                <IoStarSharp key={i} className="star" />
              ))}
          </p>
          <p>{accomodation.description}</p>
        </div>
        <div>
          <p>R{accomodation.price}</p>
        </div>
      </div>
    </div>
  );
}
export default AccCard;

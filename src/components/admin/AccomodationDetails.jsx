import { deleteDoc, updateDoc, collection, doc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdArrowBack } from "react-icons/io";

function AccomodationDetails() {
  const [loading, setLoading] = useState(true);

  const [edit, setEdit] = useState(false);
  const [obj, setObj] = useState({
    price: "",
    room_name: "",
    room_type: "",
    hotel_name: "",
    address: "",
    rating: "",
    guests: "",
    amenities: "",
    policies: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const { accomodation_id } = useParams();
  useEffect(() => {
    const imagesRef = ref(storage, accomodation_id);
    listAll(imagesRef)
      .then((res) => {
        res.items.forEach(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          setImages((prev) => [...prev, url]);
        });
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  //use accomodation_id to find accomodation in array
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  const [accomodation] = accomodations.filter(
    (accomodation) => accomodation.id === accomodation_id
  );
  const navigation = useNavigate();
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //check if properties are empty

    let updatedObj = {};
    if (obj.price !== "") {
      updatedObj.price = obj.price;
    }
    if (obj.room_name !== "") {
      updatedObj.room_name = obj.room_name;
    }
    if (obj.room_type !== "") {
      updatedObj.room_type = obj.room_type;
    }
    if (obj.hotel_name !== "") {
      updatedObj.hotel_name = obj.hotel_name;
    }
    if (obj.address !== "") {
      updatedObj.address = obj.address;
    }
    if (obj.rating !== "") {
      updatedObj.rating = obj.rating;
    }
    if (obj.guests !== "") {
      updatedObj.guests = obj.guests;
    }
    if (obj.amenities !== "") {
      updatedObj.amenities = obj.amenities;
    }
    if (obj.policies !== "") {
      updatedObj.policies = obj.policies;
    }
    if (obj.description !== "") {
      updatedObj.description = obj.description;
    }

    let updateConfirmation = window.confirm(
      "You are about to update accomodation information. Continue?"
    );
    if (updateConfirmation) {
      //update accomodation to firestore
      try {
        const accomodationsCollection = collection(
          db,
          "admin",
          "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
          "accomodations"
        );
        const accomodationRef = doc(accomodationsCollection, accomodation_id);
        if (JSON.stringify(updatedObj) !== "{}") {
          await updateDoc(accomodationRef, updatedObj);
          alert("Updated successfully");
        } else {
          alert("Nothing to update");
        }
      } catch (err) {
        console.log(err);
      }
    }
    // toggleClicked();
  }

  async function deleteAccomodation() {
    let deleteConfirmation = window.confirm(
      "Are you sure you want to delete accomodation?"
    );
    if (deleteConfirmation) {
      const accomodationsCollection = collection(
        db,
        "admin",
        "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
        "accomodations"
      );
      const docRef = doc(accomodationsCollection, accomodation_id);
      try {
        await deleteDoc(docRef);
        alert("deleted succesfully");
        navigation("/home/accomodations");
      } catch (error) {
        console.log(error);
      }
    }
  }
  function goBack() {
    navigation("/home/accomodations");
  }
  if (loading) return <div className="Loading">Loading...</div>;

  return (
    <div className="AccomodationDetails">
      <IoMdArrowBack onClick={goBack} className="back" />

      <div className="accomodation-content">
        {edit === true ? (
          <div className="accomodation-update-form">
            <div className="form-title-close">
              <h3>Enter Accomodation Information</h3>
              <div className="form-close" onClick={() => setEdit(false)}>
                x
              </div>
            </div>

            <div className="room_name">
              <label htmlFor="room_name">
                Room Name
                <input
                  type="text"
                  id="room_name"
                  name="room_name"
                  onChange={(e) => handleChange(e)}
                  value={obj.room_name}
                />
              </label>
            </div>
            <div className="room_type">
              <label htmlFor="room_type">
                Room Type
                <select
                  name="room_type"
                  onChange={(e) => handleChange(e)}
                  value={obj.room_type}
                >
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </label>
            </div>

            <div className="hotel_name">
              <label htmlFor="hotel_name">
                Hotel Name
                <select
                  name="hotel_name"
                  onChange={(e) => handleChange(e)}
                  value={obj.hotel_name}
                >
                  <option></option>
                  <option value="Pretoria">Pretoria</option>
                  <option value="Johannesburg">Johannesburg</option>
                  <option value="Cape Town">Cape Town</option>
                </select>
              </label>
            </div>
            <div className="price">
              <label htmlFor="price">
                Price
                <input
                  type="text"
                  id="price"
                  name="price"
                  onChange={(e) => handleChange(e)}
                  value={obj.price}
                />
              </label>
            </div>

            <div className="address">
              <label htmlFor="address">
                Address
                <textarea
                  id="address"
                  name="address"
                  onChange={(e) => handleChange(e)}
                  value={obj.address}
                ></textarea>
              </label>
            </div>

            <div className="rating">
              <label htmlFor="rating">
                Rating
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  onChange={(e) => handleChange(e)}
                  value={obj.rating}
                />
              </label>
            </div>
            <br />
            <div className="guests">
              <label htmlFor="guests">
                Nr of guests
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  onChange={(e) => handleChange(e)}
                  value={obj.guests}
                />
              </label>
            </div>
            <br />
            <div className="amenities">
              <label htmlFor="amenities">
                Amenities
                <textarea
                  id="amenities"
                  name="amenities"
                  onChange={(e) => handleChange(e)}
                  value={obj.amenities}
                ></textarea>
              </label>
            </div>
            <div className="policies">
              <label htmlFor="policies">
                Policies
                <textarea
                  id="policies"
                  name="policies"
                  onChange={(e) => handleChange(e)}
                  value={obj.policies}
                ></textarea>
              </label>
            </div>
            <div className="description">
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  onChange={(e) => handleChange(e)}
                  value={obj.description}
                ></textarea>
              </label>
            </div>

            <button className="update" onClick={handleSubmit}>
              Update
            </button>
          </div>
        ) : (
          <div>
            <h3 className="acc-name">
              {accomodation && accomodation.room_name}
            </h3>
            <h4>{accomodation && accomodation.hotel_name}</h4>
            <p className="acc-address">
              {accomodation && accomodation.address}
            </p>
            <div className="img">
              {images.length > 0 && <img src={images[0]} />}
            </div>

            <div className="accomodation-info">
              <h4>{accomodation && accomodation.price}</h4>
              <div className="acc-info-section">
                <h5>Room description</h5>
                <p>{accomodation && accomodation.description}</p>
              </div>
              <div className="acc-info-section">
                <h5>Policies</h5>
                <p>{accomodation && accomodation.policies}</p>
              </div>
              <div className="acc-details">
                <h5>Room Amenities</h5>
                <p>{accomodation && accomodation.amenities}</p>
              </div>
              <div className="update-delete-btns">
                <button className="update-btn" onClick={() => setEdit(true)}>
                  Update
                </button>
                <button className="delete-btn" onClick={deleteAccomodation}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AccomodationDetails;

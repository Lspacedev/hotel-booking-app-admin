import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, collectionGroup, addDoc } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref,
  listAll,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../config/firebase";

function AccomodationForm({ toggleClicked }) {
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");

  const [obj, setObj] = useState({
    price: "",
    room_name: "",
    room_type: "Standard",
    hotel_name: "Pretoria",
    address: "",
    rating: "",
    guests: "",
    amenities: "",
    policies: "",
    description: "",
    gallery: [],
    bookings: [],
    reviews: [],
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  const uploadFile = (id, img) => {
    if (img === null) {
      alert("Please select an image");
      return;
    }
    const imageRef = ref(storage, `${id}/${img.name}`);

    uploadBytes(imageRef, img)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    //add accomodation to firestore

    try {
      const docRef = await addDoc(
        collection(
          db,
          "admin",
          "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
          "accomodations"
        ),
        obj
      );
      console.log(docRef);
      uploadFile(docRef.id, img1);
      uploadFile(docRef.id, img2);
      uploadFile(docRef.id, img3);
      alert("Added successfully");
    } catch (err) {
      console.log(err);
    }
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="AccomodationForm">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter Accomodation Information</h3>
          <div className="form-close" onClick={handleFormClose}>
            x
          </div>
        </div>
        <form>
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
          <div className="gallery">
            <label htmlFor="gallery">
              Gallery
              <input
                type="file"
                name="gallery"
                onChange={(e) => {
                  setImg1(e.target.files[0]);
                }}
              />
              <input
                type="file"
                name="gallery"
                onChange={(e) => {
                  setImg2(e.target.files[0]);
                }}
              />
              <input
                type="file"
                name="gallery"
                onChange={(e) => {
                  setImg3(e.target.files[0]);
                }}
              />
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

          <input
            id="task-add-submit"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default AccomodationForm;

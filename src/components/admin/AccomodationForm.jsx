import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function AccomodationForm({ toggleClicked }) {
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [img3, setImg3] = useState(null);
  const [images, setImages] = useState([]);
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
  const navigation = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  const uploadFile = async (img) => {
    if (img === null) {
      alert("Please select an image");
      return;
    }
    try {
      const imageRef = ref(storage, `${img.name}`);
      const snapshot = await uploadBytes(imageRef, img);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      img1 === null ||
      img2 === null ||
      img3 === null ||
      obj.price === "" ||
      obj.room_name === "" ||
      obj.address === "" ||
      obj.rating === "" ||
      obj.guests === "" ||
      obj.amenities === "" ||
      obj.policies === "" ||
      obj.description === ""
    ) {
      alert("Please enter all fields");
      return;
    }
    let arr = [];
    //add accomodation to firestore

    try {
      const url1 = await uploadFile(img1);
      const url2 = await uploadFile(img2);
      const url3 = await uploadFile(img3);
      arr.push(url1);
      arr.push(url2);
      arr.push(url3);

      const docRef = await addDoc(
        collection(
          db,
          "admin",
          "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
          "accomodations"
        ),
        {
          ...obj,
          images: arr,
        }
      );

      alert("Added successfully");
      navigation(0);
    } catch (err) {
      console.log(err);
    }
    // toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="AccomodationForm">
      <div className="form-div">
        <form>
          <div className="form-title-close">
            <div className="form-close" onClick={handleFormClose}>
              <IoCloseOutline />
            </div>
          </div>
          <div className="room_name-hotel_name">
            <label htmlFor="room_name">
              Room Name
              <input
                type="text"
                id="room_name"
                name="room_name"
                maxLength="25"
                onChange={(e) => handleChange(e)}
                value={obj.room_name}
              />
            </label>
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
          <div className="room_type"></div>
          <div className="gallery">
            <label htmlFor="gallery">
              Gallery
              <div>
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
              </div>
            </label>
          </div>

          <div className="price">
            <label htmlFor="price">
              Price
              <input
                type="text"
                id="price"
                name="price"
                maxLength="10"
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
                maxLength="150"
                onChange={(e) => handleChange(e)}
                value={obj.address}
              ></textarea>
            </label>
          </div>

          <div className="rating-guests">
            <label htmlFor="rating">
              Rating
              <input
                type="number"
                max="5"
                min="1"
                id="rating"
                name="rating"
                onChange={(e) => handleChange(e)}
                value={obj.rating}
              />
            </label>
            <label htmlFor="guests">
              Nr of guests
              <input
                type="number"
                max="15"
                min="1"
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
                maxLength="150"
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
                maxLength="150"
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
                maxLength="150"
                onChange={(e) => handleChange(e)}
                value={obj.description}
              ></textarea>
            </label>
          </div>

          <input
            id="task-add-submit"
            type="submit"
            value="Submit"
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default AccomodationForm;

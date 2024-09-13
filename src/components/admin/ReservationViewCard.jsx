import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";

function ReservationViewCard() {
  const { booking_id } = useParams();
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  let bookingObj = {};
  let currentRoom = {};
  accomodations.forEach((accomodation) => {
    accomodation.bookings.forEach((booking) => {
      if (booking.bookingId === booking_id) {
        bookingObj = { ...booking };
        currentRoom = { ...accomodation };
      }
    });
  });

  async function approve() {
    let bookings =
      JSON.stringify(currentRoom) !== "{}" ? [...currentRoom.bookings] : [];
    let newBookings = bookings.map((booking) => {
      if (booking.bookingId === bookingObj.bookingId) {
        let obj = { ...booking };
        obj.status = "approved";
        return obj;
      }
      return booking;
    });

    console.log(newBookings);

    //update booking obj in accomodation booking
    try {
      const accomodationsCollection = collection(
        db,
        "admin",
        "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
        "accomodations"
      );
      const accomodationRef = doc(accomodationsCollection, bookingObj.roomId);
      console.log(accomodationRef);
      await updateDoc(accomodationRef, {
        bookings: newBookings,
      });
      alert("updated bookings");
    } catch (err) {
      console.log(err);
    }
  }
  async function reject() {
    let bookings =
      JSON.stringify(currentRoom) !== "{}" ? [...currentRoom.bookings] : [];
    let newBookings = bookings.map((booking) => {
      if (booking.bookingId === bookingObj.bookingId) {
        let obj = { ...booking };
        obj.status = "rejected";
        return obj;
      }
      return booking;
    });

    console.log(newBookings);

    //update booking obj in accomodation booking
    try {
      const accomodationsCollection = collection(
        db,
        "admin",
        "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
        "accomodations"
      );
      const accomodationRef = doc(accomodationsCollection, bookingObj.roomId);
      console.log(accomodationRef);
      await updateDoc(accomodationRef, {
        bookings: newBookings,
      });
      alert("updated bookings");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="ReservationViewCard">
      <div className="img-guest">
        <div className="img"></div>
        <div className="guest">
          <h3 className="guest-name">User Id: {bookingObj.userId}</h3>
          <div className="view-checkin-out">
            <div>
              <p>Check in</p>
              <h6>{bookingObj.checkIn}</h6>
            </div>
            <div>
              <p>Check Out</p>
              <h6>{bookingObj.checkOut}</h6>
            </div>
          </div>
          <div className="guests-room-type">
            <div>
              <p>Nr of guests</p>
              <h6>Number</h6>
            </div>
            <div>
              <p>Room Type</p>
              <h5>{currentRoom.room_type}</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="accomodation-info">
        <h4>{currentRoom.price}</h4>
        <div className="acc-info-section">
          <h5>Room description</h5>
          <p>{currentRoom && currentRoom.description}</p>
        </div>
        <div className="acc-info-section">
          <h5>Amenities</h5>
          <p>{currentRoom && currentRoom.amenities}</p>
        </div>
        <div className="acc-info-section">
          <h5>Policies</h5>
          <p>{currentRoom && currentRoom.policies}</p>
        </div>

        <div className="view-btns">
          <button className="approve-btn" onClick={approve}>
            Approve
          </button>
          <button className="reject-btn" onClick={reject}>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
export default ReservationViewCard;

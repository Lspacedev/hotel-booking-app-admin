import { useNavigate } from "react-router-dom";

function ReservationCard({ booking }) {
  const navigation = useNavigate();

  function handleNavigateSubPage() {
    navigation(`/home/reservations/${booking.bookingId}`);
  }
  return (
    <div className="ReservationCard">
      <h5>{booking.hotel_name}</h5>
      <h6>Booking Id: {booking.bookingId}</h6>
      <h6>Room Id: {booking.roomId}</h6>
      <p>User Id: {booking.userId}</p>
      <div className="checkin-out">
        <div>
          <p>Check in</p>
          <p>{booking.checkIn}</p>
        </div>
        <div>
          <p>Check Out</p>
          <p>{booking.checkOut}</p>
        </div>
      </div>
      <div className="status-date">
        <div>
          <p>Status</p>
          <p>{booking.status}</p>
        </div>
        {/* <div>
          <p>Date</p>
          <p>date</p>
        </div> */}
      </div>
      <div className="v-btn">
        <button onClick={handleNavigateSubPage}>View</button>
      </div>
    </div>
  );
}
export default ReservationCard;

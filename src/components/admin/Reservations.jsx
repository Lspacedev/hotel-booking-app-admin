import ReservationCard from "./ReservationCard";
import { useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";

function Reservations() {
  const { booking_id } = useParams();

  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  let bookings = [];
  accomodations.map((accomodation) => {
    if (accomodation.bookings.length > 0) {
      accomodation.bookings.map((booking) => {
        bookings.push(booking);
        return booking;
      });
    } else {
      return accomodation;
    }
  });

  return (
    <div className="Reservations">
      {booking_id !== "" && typeof booking_id !== "undefined" ? (
        <Outlet />
      ) : (
        <div className="reservations-div">
          <div className="pending-section">
            <h5>Pending</h5>
            {typeof bookings !== "undefined" &&
              bookings.length > 0 &&
              bookings.map(
                (booking, i) =>
                  booking.status === "pending" && (
                    <ReservationCard key={i} booking={booking} />
                  )
              )}
          </div>
          <div className="approved-section">
            <h5>Approved</h5>
            {typeof bookings !== "undefined" &&
              bookings.length > 0 &&
              bookings.map(
                (booking, i) =>
                  booking.status === "approved" && (
                    <ReservationCard key={i} booking={booking} />
                  )
              )}
          </div>
          <div className="cancelled-section">
            <h5>Rejected</h5>
            {typeof bookings !== "undefined" &&
              bookings.length > 0 &&
              bookings.map(
                (booking, i) =>
                  booking.status === "rejected" && (
                    <ReservationCard key={i} booking={booking} />
                  )
              )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Reservations;

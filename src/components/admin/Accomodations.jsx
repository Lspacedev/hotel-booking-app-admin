import AccCard from "./AccCard";
import AddAccomodation from "./AddAccomodation";
import { useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Accomodations() {
  const { accomodation_id } = useParams();
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  return (
    <div className="Accomodations">
      {(typeof accomodation_id === "undefined" || accomodation_id === "") && (
        <AddAccomodation />
      )}

      {typeof accomodation_id !== "undefined" && accomodation_id !== "" ? (
        <Outlet />
      ) : (
        <div className="accomodations-div">
          {typeof accomodations !== "undefined" &&
            accomodations.length > 0 &&
            accomodations.map((accomodation, i) => (
              <AccCard key={i} accomodation={accomodation} />
            ))}
        </div>
      )}
    </div>
  );
}
export default Accomodations;

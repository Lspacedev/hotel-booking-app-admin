import AccCard from "./AccCard";
import AddAccomodation from "./AddAccomodation";
import { useParams, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function Accomodations() {
  const { accomodation_id } = useParams();
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  console.log(accomodations);
  return (
    <div className="Accomodations">
      <AddAccomodation />

      {accomodation_id !== "" && typeof accomodation_id !== "undefined" ? (
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

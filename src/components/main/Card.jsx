import { useNavigate } from "react-router-dom";
import { setSearchTerm } from "../../app/accomodationsSlice";
import { useDispatch } from "react-redux";
function Card({ title, url }) {
  return (
    <div className="Card">
      <div className="img">
        <img src={url} />
      </div>
      <div>{title}</div>
    </div>
  );
}
export default Card;

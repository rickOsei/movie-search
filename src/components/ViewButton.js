import { BsEyeFill } from "react-icons/bs";
import { useSelector } from "react-redux";
/**
 * The ViewButton component is rendered in the MovieCard component, which takes in an onClick event listener that helps open and display more info in the SideModal component.
 */

const ViewButton = ({ handleClick }) => {
  const { generalColor } = useSelector((state) => state.generalColor);

  return (
    <button
      className="view-btn"
      onClick={handleClick}
      style={{ background: generalColor }}
    >
      View Details <BsEyeFill />
    </button>
  );
};

export default ViewButton;

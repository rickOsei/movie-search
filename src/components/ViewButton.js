import { BsEyeFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ViewButton = ({ handleClick }) => {
  const { generalColor } = useSelector((state) => state.generalColor);

  return (
    <button
      className="view-btn"
      onClick={handleClick}
      style={{ background: generalColor }}
    >
      View Pokemon <BsEyeFill />
    </button>
  );
};

export default ViewButton;

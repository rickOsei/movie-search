import "../styling/homeview.css";
import { useSelector } from "react-redux";

/**
 * The Title component represents the logo of the app */

const Title = ({ fontSize, margin }) => {
  const { generalColor } = useSelector((state) => state.generalColor);

  return (
    <h2
      className="main-title"
      style={{ fontSize: fontSize, margin: margin, color: "#818181" }}
    >
      Movie
      <span className="main-title-span" style={{ color: generalColor }}>
        Search
      </span>
    </h2>
  );
};

export default Title;

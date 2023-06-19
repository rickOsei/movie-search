import "../styling/navbar.css";
/**
 * A simple component returning a color circle which is rendered in the navbar and ColorModal components. It takes in two props, the border and color
 */
const ColorSelector = ({ border, color }) => {
  return (
    <article className="color-container" style={{ borderColor: border }}>
      <div className="main-color" style={{ background: color }}></div>
    </article>
  );
};

export default ColorSelector;

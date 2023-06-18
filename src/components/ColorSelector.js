import "../styling/navbar.css";
const ColorSelector = ({ border, color }) => {
  return (
    <article className="color-container" style={{ borderColor: border }}>
      <div className="main-color" style={{ background: color }}></div>
    </article>
  );
};

export default ColorSelector;

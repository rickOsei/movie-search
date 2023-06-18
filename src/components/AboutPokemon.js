const AboutPokemon = ({ height, weight, abilities }) => {
  return (
    <div className="about-container">
      <h1 className="side-modal-title">About</h1>
      <div className="details-container">
        <div className="about-details">
          <h3 className="detail-name">Height</h3>
          <h1 className="detail-value">{height}</h1>
        </div>
        <div className="about-details">
          <h3 className="detail-name">Weight</h3>
          <h1 className="detail-value">{weight}</h1>
        </div>{" "}
        <div className="about-details">
          <h3 className="detail-name">Abilities</h3>
          <div className="detail-value">
            {abilities.map((ability, index) => {
              return <li key={index}>{ability.ability.name}</li>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPokemon;

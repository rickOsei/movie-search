import { useSelector } from "react-redux";

const PokemonStats = ({ stats }) => {
  const { generalColor } = useSelector((state) => state.generalColor);

  return (
    <>
      {stats.map((pokemonStat, index) => {
        const { base_stat, stat } = pokemonStat;
        return (
          <div className="stat-details-container" key={index}>
            <div className="about-details">
              <h3 className="stat-detail-name">{stat.name}</h3>
              <div className="bar-container">
                <div className="stat-bar">
                  <div
                    className="stat-progress"
                    style={{
                      width: `${base_stat}%`,
                      height: "8px",
                      background: generalColor,
                    }}
                  ></div>
                </div>
              </div>

              <h1 className="stat-detail-value">{base_stat}</h1>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PokemonStats;

import { useState } from "react";

import { FiChevronDown } from "react-icons/fi";

const SortingSelectComponent = ({ sorting, setSorting }) => {
  const options = ["latest", "oldest", "a-z", "z-a"];
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSorting(value);
    setIsOpen(false);
  };

  return (
    <article>
      <div className="sorting-dropdown-container" onClick={toggling}>
        <div className="sorting-dropdown-header-icon">
          <div className="sorting-dropdown-header">{sorting || "latest"}</div>
          <FiChevronDown />
        </div>
        {isOpen && (
          <div className="dropdown-list-container">
            <ul className="dropdownlist">
              {options.map((option) => (
                <li
                  onClick={onOptionClicked(option)}
                  key={Math.random()}
                  className="listItem"
                  style={{
                    background: sorting === option ? "#818181" : "transparent",
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
};

export default SortingSelectComponent;

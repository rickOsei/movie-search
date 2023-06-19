import { useState } from "react";

import { FiChevronDown } from "react-icons/fi";

/**
 * The SelectComponent renders a self made select element which is used to determine the number of items on a page
 */

const SelectComponent = ({ itemsPerPage, setItemsPerPage }) => {
  const options = [8, 10];
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setItemsPerPage(value);
    setIsOpen(false);
  };

  return (
    <article>
      <div className="dropdown-container" onClick={toggling}>
        <div className="dropdown-header-icon">
          <div className="dropdown-header">{itemsPerPage || 8}</div>
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
                    background:
                      itemsPerPage === option ? "#818181" : "transparent",
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

export default SelectComponent;

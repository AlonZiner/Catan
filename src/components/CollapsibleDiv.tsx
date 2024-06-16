import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CollapsibleDiv = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleCollapse}
        className="bg-primary-color text-text px-4 rounded items-center w-full"
      >
        <div className="flex justify-between">
          Filter Games {" "}
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleDiv;

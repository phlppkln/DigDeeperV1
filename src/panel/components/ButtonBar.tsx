import React from "react";
import * as index from "../../index";

interface ButtonBarProps {
  skipBtnClicked: () => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ skipBtnClicked }) => {
  const openMoreModal = async () => {
    await index.openMoreModal();
  };

  return (
    <div className="button-bar">
      <button
        className="button button-secondary"
        type="button"
        onClick={openMoreModal}
      >
        <span className="icon icon-help-question"></span>More
      </button>

      <button
        className="button button-secondary"
        type="button"
        onClick={skipBtnClicked}
      >
        Skip to Analysis
      </button>
    </div>
  );
};

export default ButtonBar;

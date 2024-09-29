import React from "react";
import * as index from "../../index";

interface ButtonBarProps {
  skipBtnClicked: () => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ skipBtnClicked }) => {
  const openHelpModal = async () => {
    await index.openHelpModal();
  };

  return (
    <div className="button-bar">
      <button
        className="button button-secondary"
        type="button"
        onClick={openHelpModal}
      >
        <span className="icon icon-help-question"></span>Help
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

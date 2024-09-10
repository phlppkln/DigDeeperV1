import React from "react";
import * as index from "../../index";

interface ButtonBarProps {
  backViewHandler: () => void;
  showBackButton: boolean;
}

const ButtonBar: React.FC<ButtonBarProps> = ({
  backViewHandler,
  showBackButton,
}) => {
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

      {showBackButton ? (
        <button
          className="button button-secondary"
          type="button"
          onClick={backViewHandler}
        >
          Back
        </button>
      ) : null}
    </div>
  );
};

export default ButtonBar;

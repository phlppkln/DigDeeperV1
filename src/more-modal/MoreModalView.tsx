import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import Description from "./components/Description";
import FAQ from "./components/FAQ";
import About from "./components/About";

// IMAGES
import template from "../assets/images/template.png";

const HelpModalView = () => {
  useEffect(() => {}, []);

  const closeModal = async () => {
    await miro.board.ui.closeModal();
  };

  return (
    <div className="more-container">
      <div className="description-modal-container">
        <Description></Description>
        <div className="faq-container">
          <FAQ></FAQ>
        </div>
        <div className="about-container">
          <About></About>
        </div>
      </div>
    </div>
  );
};

export default HelpModalView;

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<HelpModalView />);
}

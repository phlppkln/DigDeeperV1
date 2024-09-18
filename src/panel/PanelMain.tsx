import { useState } from "react";
import { createRoot } from "react-dom/client";
import ButtonBar from "./components/ButtonBar";
import CreateInputPlanesView from "./views/CreateInputPlanesView";
import InputPlaneAnalysisView from "./views/AnalyzeInputPlanesView";
import VisualizeInputPlanesView from "./views/VisualizeInputPlanesView";
import introductionIcon from "../assets/images/cooperation_puzzle_icon_262690.svg";
import * as index from "../index";

const App: React.FC = () => {
  const [introductionFinished, setIntroductionFinished] =
    useState<boolean>(false);

  const loadNextView = () => {
    if (currentView < views.length - 1) {
      setCurrentView(currentView + 1);
    }
  };

  const loadPreviousView = () => {
    if (currentView > 0) {
      setCurrentView(currentView - 1);
    }
  };

  const openHelpModal = async () => {
    await index.openHelpModal();
  };

  const views = [
    <CreateInputPlanesView
      loadNextView={loadNextView}
      showIntroduction={() => setIntroductionFinished(false)}
    ></CreateInputPlanesView>,
    <InputPlaneAnalysisView
      loadNextView={loadNextView}
    ></InputPlaneAnalysisView>,
    <VisualizeInputPlanesView></VisualizeInputPlanesView>,
  ];
  const [currentView, setCurrentView] = useState<number>(0);

  const getMainView = () => {
    if (!introductionFinished) {
      return (
        <div className="panel-container">
          <h1>Dig Deeper</h1>
          <div className="">
            <img
              src={introductionIcon}
              alt="Introduction icon illustrating cooperation"
            />
          </div>
          <p>
            Dig Deeper is an app that empowers you to gather people's
            perspective through spatial positioning of sticky notes. Use Dig
            Deeper to facilitate discussions, gather thoughts and ideas, and
            visualize answers to your questions.
          </p>

          <div className="center-content">
            <div style={{ marginBottom: "16px" }}>
              <button
                className="button button-primary"
                type="button"
                onClick={() => {
                  setIntroductionFinished(true);
                }}
              >
                Start
              </button>
            </div>
            <div>
              <button
                className="button button-secondary"
                type="button"
                onClick={openHelpModal}
              >
                <span className="icon icon-help-question"></span>Help
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="">
        {views[currentView]}
        <ButtonBar
          backViewHandler={loadPreviousView}
          showBackButton={currentView > 0}
        ></ButtonBar>
      </div>
    );
  };

  return (
    <div className="panel-container">
      <div className="panel-content">{getMainView()}</div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

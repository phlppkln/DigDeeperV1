import { useState } from "react";
import { createRoot } from "react-dom/client";
import ButtonBar from "./components/panelButtonBar";
import CreateInputPlanesView from "./views/CreateInputPlanesView";
import InputPlaneAnalysisView from "./views/AnalyzeInputPlanesView";
import VisualizeInputPlanesView from "./views/VisualizeInputPlanesView";

const App: React.FC = () => {

  const [introductionFinished, setIntroductionFinished] = useState<boolean>(false);

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

  const views = [
    <CreateInputPlanesView loadNextView={loadNextView}></CreateInputPlanesView>,
    <InputPlaneAnalysisView
      loadNextView={loadNextView}
    ></InputPlaneAnalysisView>,
    <VisualizeInputPlanesView></VisualizeInputPlanesView>,
  ];
  const [currentView, setCurrentView] = useState<number>(0);

  const getIntroduction = () => {
    let introduction = (
      <div className="introduction-container">
        <h1>Dig Deeper</h1>
        <p>
          Welcome to Dig Deeper, an app that empowers you to
          gather people's perspective through spatial positioning of sticky
          notes on a two-axis plane. Use DigDeeper to facilitate
          collaborative discussions, gather thoughts and ideas, and visualize
          relationships between answers to your questions.
        </p>

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
    )

    if(introductionFinished){
      introduction = (<div></div>)
    }

    return introduction
  };

  return (
    <div className="grid wrapper panel-container">
      <div className="cs1 ce12 panel-container-content">
        <div className="introduction-container">
          {getIntroduction()}
        </div>
        <div className="phase-container">
          {views[currentView]}
          <ButtonBar
            backViewHandler={loadPreviousView}
            showBackButton={currentView > 0}
          ></ButtonBar>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

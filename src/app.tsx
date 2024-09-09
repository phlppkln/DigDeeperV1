import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import CreateInputPlanes from "./components/panel/createInputPlanes";
import InputPlaneAnalysis from "./components/panel/analyzeInputPlanes";
import VisualizeInputPlanes from "./components/panel/visualizeInputPlanes";
import * as index from "./index";

const App: React.FC = () => {
  const [isAnalysisCompleted, setIsAnalysisCompleted] = useState(false);
  const [showCreateInputPlaneContainer, setShowCreateInputPlaneContainer] =
    useState(true);
  const [showAnalyzeContainer, setShowAnalyzeContainer] = useState(false);
  const [showVisualizeContainer, setShowVisualizeContainer] = useState(false);

  useEffect(() => {}, []);

  const analysisCompleted = async () => {
    setIsAnalysisCompleted(true);
  };

  const openHelpModal = async () => {
    await index.openDescriptionModal();
  };

  const skipSetup = () => {
    setShowCreateInputPlaneContainer(false);
    setShowAnalyzeContainer(true);
    setShowVisualizeContainer(false);
  };

  const backClicked = () => {
    if (showAnalyzeContainer) {
      setShowCreateInputPlaneContainer(true);
      setShowAnalyzeContainer(false);
      setShowVisualizeContainer(false);
    }
    if (showVisualizeContainer) {
      setShowCreateInputPlaneContainer(false);
      setShowAnalyzeContainer(true);
      setShowVisualizeContainer(false);
    }
  };

  const showNotification = async (notificationMessage: string) => {
    await miro.board.notifications.showInfo(notificationMessage);
  };

  const getView = () => {
    let view = <div></div>;
    if (showCreateInputPlaneContainer) {
      view = <CreateInputPlanes />;
    } else if (showAnalyzeContainer) {
      view = <InputPlaneAnalysis analysisComplete={analysisCompleted} />;
    } else if (showVisualizeContainer && isAnalysisCompleted) {
      view = <VisualizeInputPlanes />;
    } else if (!isAnalysisCompleted) {
      showNotification(
        "Analysis of frames not completed! Analyze the input planes first."
      );
    }
    return view;
  };


  const getButtonBar = () => {
    let bar = <div></div>;
  
    if (showCreateInputPlaneContainer) {
      bar = (
        <div>
          {bar}
          <div className="skip-setup-button" onClick={skipSetup}>
                Skip Setup
              </div>
        </div>
      );
    }
  
    return bar;
  };

  return (
    <div className="grid wrapper panel-container">
      <div className="cs1 ce12 panel-container-content">
        <div className="phase-container">
          {getView()}

          <div className="button-container">
            {showCreateInputPlaneContainer ? (

            ) : (
              <div></div>
            )}

            <div className="demo-mode-container">
              <button
                className="button button-secondary button-small"
                onClick={openHelpModal}
              >
                <span className="icon icon-help-question"></span> Help
              </button>
            </div>
            {showCreateInputPlaneContainer ? (
              false
            ) : (
              <div onClick={backClicked}>Back</div>
            )}
          </div>
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

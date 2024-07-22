import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import InputPlaneAnalysis from "./components/panel/inputPlaneAnalysis";
import * as index from "./index";
import { saveAs } from "file-saver";

const App: React.FC = () => {
  const [isAnalysisCompleted, setIsAnalysisCompleted] = useState(false);
  const [showCreateInputPlaneContainer, setShowCreateInputPlaneContainer] = useState(true);
  const [showAnalyzeContainer, setShowAnalyzeContainer] = useState(false);
  const [showAnalysisContainer, setShowAnalysisContainer] = useState(false);


  useEffect(() => {}, []);

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  
  const openModal = async () => {
    await index.openModal();
  };

  const exportData = async () => {
    const data = await miro.board.getAppData("data");

    //console.log(data);

    const jsonData = JSON.parse(JSON.stringify(data));
    await miro.board.createStickyNote({
      content: jsonData
    })

    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, "dig-deeper_interview-data.json");
  };


  const analysisCompleted = async () => {
    setIsAnalysisCompleted(true);
  };

  const openHelpModal = async () => {
    await index.openDescriptionModal();
  };



  const skipSetup = () => {
    setShowCreateInputPlaneContainer(false);
    setShowAnalyzeContainer(true);
    setShowAnalysisContainer(false);
  }

  const backClicked = () => {
    if(showAnalyzeContainer) {
      setShowCreateInputPlaneContainer(true);
      setShowAnalyzeContainer(false);
      setShowAnalysisContainer(false);
    }
    if(showAnalysisContainer) {
      setShowCreateInputPlaneContainer(false);
      setShowAnalyzeContainer(true);
      setShowAnalysisContainer(false);
    }
  }

  const getShowAnalyzePlanesContainer = () => {
    let view = <div></div>;
    if (showAnalyzeContainer) {
      view = <InputPlaneAnalysis analysisComplete={analysisCompleted} />;
    } else {
      view = <div></div>;
    }
    return view;
  }
  
  const getShowAnalysisContainer = () => {
    let view = <div></div>;
    if (showAnalyzeContainer) {
      view = (
        <div className="">
        <p>
              After you analyzed the frames, you can explore the perspectives directly in
              Miro or export the analyzed data.
            </p>
          <div className="">
            <button
              disabled={!isAnalysisCompleted}
              className="button button-primary"
              onClick={openModal}
            >
              Dig Deeper
            </button>
          </div>
          <div className="cs1 ce12">
            <button
              disabled={!isAnalysisCompleted}
              className="button button-primary"
              onClick={exportData}
            >
              Export Data
            </button>
            </div>
            </div>
            );
    } else {
      view = <div></div>;
    }
    return view;
}
  
  return (
    <div className="grid wrapper panel-container">
      {/* <button onClick={printSelection}>Print</button>  */}
      <div className="cs1 ce12 panel-container-content">
          <div className="phase-container">
            <div>
              {getShowCreateInputPlaneContainer()}
            </div>


            <button
              className="button button-primary"
              onClick={createSampleFrame}
            >
              Create Sample Frame
            </button>

            <div className="skip-setup-button" onClick={skipSetup}>Skip Setup</div>
          </div>
          { getShowAnalyzePlanesContainer() }
          { getShowAnalysisContainer() }
        <div className="phase-container">
          { showInputPlaneAnalysisContainer ? (
          <div className="">
            
          </div>) : <div></div>}
        </div>
        
        <div className="demo-mode-container">
        <button
              className="button button-secondary button-small"
              onClick={openHelpModal}
            >
              <span className="icon icon-help-question"></span> Help
            </button>
        </div>
        { showCreateInputPlaneContainer ? false : (          
          <div onClick={backClicked}>Back</div>  
        )}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

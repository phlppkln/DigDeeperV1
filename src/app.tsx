import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import InputPlaneAnalysis from "./components/panel/inputPlaneAnalysis";
import * as index from "./index";
import { saveAs } from "file-saver";

const App: React.FC = () => {
  const [isAnalysisCompleted, setIsAnalysisCompleted] = useState(false);
  const [customizeFrame, setCustomizeFrame] = useState(false);
  const [personIdInput, setPersonIdInput] = useState("PersonId");
  const [questionIdInput, setQuestionIdInput] = useState("QuestionId");
  const [questionInput, setQuestionInput] = useState("What international cuisines come to your mind, and how would you rate them?");
  const [topInput, setTopInput] = useState("spicy");
  const [bottomInput, setBottomInput] = useState("mild");
  const [leftInput, setLeftInput] = useState("adventurous");
  const [rightInput, setRightInput] = useState("traditional");

  useEffect(() => {}, []);

  const handlePersonIdInputChange = (event: any) => {
    setPersonIdInput(event.target.value);
  };

  const handleQuestionIdInputChange = (event: any) => {
    setQuestionIdInput(event.target.value);
  };

  const handleQuestionInputChange = (event: any) => {
    setQuestionInput(event.target.value);
  };

  const handleTopInputChange = (event: any) => {
    setTopInput(event.target.value);
  };

  const handleBottomInputChange = (event: any) => {
    setBottomInput(event.target.value);
  };

  const handleLeftInputChange = (event: any) => {
    setLeftInput(event.target.value);
  };

  const handleRightInputChange = (event: any) => {
    setRightInput(event.target.value);
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getData = async () => {
    //setData(appData);
    await sleep(1000);
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

  const openDescriptionModal = async () => {
    await index.openDescriptionModal();
  };

  const createSampleFrame = async () => {
    const frameWidth = 890;
    const frameHeight = 580;
    const frameTitle = personIdInput + ": " + questionIdInput;
    const frame = await miro.board.createFrame({
      title: frameTitle,
      style: {
        fillColor: "#ffffff",
      },
      x: 0, // Default value: horizontal center of the board
      y: 0, // Default value: vertical center of the board
      height: frameHeight,
      width: frameWidth,
    });

    const question = await miro.board.createText({
      content: "<p>" + questionInput + "</p>",
      x: -25,
      y: -247,
      width: 800,
      style: {
        fontSize: 24,
      }
    });

    const top = await miro.board.createText({
      content: "<p>" + topInput + "</p>",
      x: 0,
      y: -194,
      width: 33,
    });

    const right = await miro.board.createText({
      content: "<p>" + rightInput + "</p>",
      x: 369,
      y: 0,
      width: 75,
    });

    const bottom = await miro.board.createText({
      content: "<p>" + bottomInput + "</p>",
      x: 0,
      y: 254,
      width: 27,
    });

    const left = await miro.board.createText({
      content: "<p>" + leftInput + "</p>",
      x: -346,
      y: 0,
      width: 78,
    });

    const connectorTopBottom = await miro.board.createConnector({
      shape: "curved",
      style: {
        startStrokeCap: "rounded_stealth",
        endStrokeCap: "rounded_stealth",
      },
      start: {
        item: top.id,
        snapTo: "bottom",
      },
      end: {
        item: bottom.id,
        snapTo: "top",
      },
    });

    const connectorLeftRight = await miro.board.createConnector({
      shape: "curved",
      style: {
        startStrokeCap: "rounded_stealth",
        endStrokeCap: "rounded_stealth",
      },
      start: {
        item: left.id,
        snapTo: "right",
      },
      end: {
        item: right.id,
        snapTo: "left",
      },
    });

    await frame.add(question);
    await frame.add(top);
    await frame.add(right);
    await frame.add(bottom);
    await frame.add(left);
    await frame.add(connectorTopBottom);
    await frame.add(connectorLeftRight);

    await miro.board.viewport.zoomTo(frame);
  };

  const showCustomizeFrame = () => {
    let view = <div></div>;
    if (customizeFrame) {
      view = (
        <div className="">
          <div className="form-group">
            <label htmlFor="person-id">Person ID</label>
            <input
              className="input"
              type="text"
              placeholder="Person Id"
              id="person-id"
              onChange={handlePersonIdInputChange}
              value={personIdInput}
            />
            <label htmlFor="question-id">Question ID</label>
            <input
              className="input"
              type="text"
              placeholder="Question Id"
              id="question-id"
              onChange={handleQuestionIdInputChange}
              value={questionIdInput}
            />
            <label htmlFor="question">Question</label>
            <input
              className="input"
              type="text"
              placeholder="Question"
              id="question"
              onChange={handleQuestionInputChange}
              value={questionInput}
            />

            {/* Inputs for top, right, bottom, left*/}
            <label htmlFor="left">X-Axis Left</label>
            <input
              className="input"
              type="text"
              placeholder="Left"
              id="left"
              onChange={handleLeftInputChange}
              value={leftInput}
            />
            <label htmlFor="right">X-Axis Right</label>
            <input
              className="input"
              type="text"
              placeholder="Right"
              id="right"
              onChange={handleRightInputChange}
              value={rightInput}
            />
            <label htmlFor="top">Y-Axis Top</label>
            <input
              className="input"
              type="text"
              placeholder="Top"
              id="top"
              onChange={handleTopInputChange}
              value={topInput}
            />
            <label htmlFor="bottom">Y-Axis Bottom</label>
            <input
              className="input"
              type="text"
              placeholder="Bottom"
              id="bottom"
              onChange={handleBottomInputChange}
              value={bottomInput}
            />
            
          </div>
        </div>
      );
    } else {
      view = <div></div>;
    }
    return view;
  };

  const toggleCustomizeFrame = async () => {
    setCustomizeFrame(!customizeFrame);
  };

  let demoMode = false;
  const toggleDemoMode = async () => {
    console.log("toggle Demo mode");
    alert("show demo panel")
    demoMode = !(!demoMode);
  }

  return (
    <div className="grid wrapper panel-container">
      {/* <button onClick={printSelection}>Print</button>  */}
      <div className="cs1 ce12 panel-container-content">
        <div className="demo-mode-container">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={demoMode}
              onClick={toggleDemoMode}
            />
            <span>Demo Mode</span>
          </label>
        </div>
        <div>
          <div className="phase-container">
            <div>
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={customizeFrame}
                  onClick={toggleCustomizeFrame}
                />
                <span>Customize Sample Frame</span>
              </label>
              {showCustomizeFrame()}
            </div>

            <button
              className="button button-primary"
              onClick={createSampleFrame}
            >
              Create Sample Frame
            </button>
          </div>
          <div className="phase-container">
            <InputPlaneAnalysis analysisComplete={analysisCompleted} />
          </div>
        </div>
        <div className="phase-container">
          <div className="">
            <p>
              After you analyzed the frames, you can explore the perspectives directly in
              Miro or export the analyzed data.
            </p>
          </div>
          {/* <button onClick={printSelection}>Print selection</button> */}
          {/* <button onClick={printData}>Print data</button> */}
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
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

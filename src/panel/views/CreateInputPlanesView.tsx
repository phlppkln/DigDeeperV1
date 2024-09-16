import { useEffect, useState } from "react";

interface CreateInputPlanesProps {
  loadNextView: () => void;
  showIntroduction: () => void;
}

const CreateInputPlanesView: React.FC<CreateInputPlanesProps> = ({
  loadNextView,
  showIntroduction,
}) => {
  const [personIdInput, setPersonIdInput] = useState("");
  const [questionIdInput, setQuestionIdInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [topInput, setTopInput] = useState("");
  const [bottomInput, setBottomInput] = useState("");
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");

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
      },
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

  return (
    <div className="">
      <div className="">
        <h2>Create Input Planes</h2>
        <div>
          <button
        className="button button-tertiary"
        type="button"
        onClick={showIntroduction}
      >
        <span className="icon icon-back-1"></span>Back
      </button>
        </div>
        <details>
          <summary>How to use</summary>
          <ol>
            <li>Create a question:</li>
            <ul>
              <li>Enter a question and a brief label for the question.</li>
              <li>
                Enter the values for the two answer scales (top, bottom, left,
                and right).
              </li>
            </ul>
            <li>Set the participants:</li>
            <ul>
              <li>
                Enter the number of participants you want to gather responses
                from.
              </li>
              <li>Enter an identifier of each participant.</li>
            </ul>
          </ol>
        </details>
      </div>
      <div className="form-group">
        <label htmlFor="person-id">Person Id</label>
        <input
          className="input"
          type="text"
          placeholder="Person Id"
          id="person-id"
          onChange={handlePersonIdInputChange}
          value={personIdInput}
        />
        <label htmlFor="question-id">Question Label</label>
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
        <button className="button button-primary" onClick={createSampleFrame}>
          Create Input Plane
        </button>

        <button className="button button-tertiary" onClick={loadNextView}>
          Skip Setup
        </button>
      </div>
    </div>
  );
};

export default CreateInputPlanesView;

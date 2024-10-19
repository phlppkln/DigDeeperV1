import React, { useEffect, useState, useCallback, useRef } from "react";
import { Tooltip } from "react-tooltip";

interface QuestionComponentProps {
  question: QuestionSetup;
  updateQuestion: (question: QuestionSetup) => void;
  deleteQuestion: () => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  updateQuestion = (updatedQuestion: QuestionSetup) => {},
  deleteQuestion = () => {},
}) => {
  useEffect(() => {}, []);

  const [questionIdInput, setQuestionIdInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [topInput, setTopInput] = useState("");
  const [bottomInput, setBottomInput] = useState("");
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  
  const [myQuestion, setMyQuestion]  = useState<QuestionSetup>({
      questionId: questionIdInput,
      questionText: questionInput,
      questionAxisTop: topInput,
      questionAxisBottom: bottomInput,
      questionAxisLeft: leftInput,
      questionAxisRight: rightInput,
    });

  const handleQuestionIdInputChange = (event: any) => {
    setQuestionIdInput(event.target.value);


    updateQuestion({
      ...question,
      questionId: questionIdInput
    });

    // setMyQuestion({
    //   ...myQuestion,
    //   questionId: questionIdInput
    // });
  };

  const handleQuestionInputChange = (event: any) => {
    setQuestionInput(event.target.value);

    question.questionText = questionInput;

    // setMyQuestion({
    //   ...myQuestion,
    //   questionText: questionInput
    // });
  };

  const handleTopInputChange = (event: any) => {
    setTopInput(event.target.value);

    question.questionAxisTop = topInput;


    // setMyQuestion({
    //   ...myQuestion,
    //   questionAxisTop: topInput
    // });
  };

  const handleBottomInputChange = (event: any) => {
    setBottomInput(event.target.value);

    question.questionAxisBottom = bottomInput;

    // setMyQuestion({
    //   ...myQuestion,
    //   questionAxisBottom: bottomInput
    // }); 
  };

  const handleLeftInputChange = (event: any) => {
    setLeftInput(event.target.value);

    question.questionAxisLeft = leftInput;

    // setMyQuestion({
    //   ...myQuestion,
    //   questionAxisLeft: leftInput
    // });
  };

  const handleRightInputChange = (event: any) => {
    setRightInput(event.target.value);

    question.questionAxisRight = rightInput;

    // setMyQuestion({
    //   ...myQuestion,
    //   questionAxisRight: rightInput
    // });
  };

  const questionContainerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    padding: "10px",
    marginBottom: "10px",
    border: "0.2rem solid var(--blackAlpha80)",
    borderRadius: "5px",
  };

  return (
    <div>
      <div className="question-container" style={questionContainerStyle}>
        <div className="form-group">
          <label htmlFor="question-id">
            <div style={{ display: "flex", flexDirection: "row" as "row" }}>
              Question ID {" "}
              <span
                className="icon icon-info"
                data-tooltip-id="my-tooltip"
                data-tooltip-html="We use this ID to reference the question <br /> in the app. It must be unique for <br /> each question."
                data-tooltip-place="top"
              ></span>
            </div>
          </label>
          <input
            className="input"
            type="text"
            placeholder="Question ID"
            id="question-id"
            onChange={handleQuestionIdInputChange}
            value={myQuestion.questionId}
          />
          <label htmlFor="question">
            <div style={{ display: "flex", flexDirection: "row" as "row" }}>
              Question {" "}
              <span 
                className="icon icon-info"
                data-tooltip-id="my-tooltip"
                data-tooltip-html="Enter your question here."
                data-tooltip-place="top"
              ></span>
            </div>
          </label>
          <input
            className="input"
            type="text"
            placeholder="Question Text"
            id="question"
            onChange={handleQuestionInputChange}
            value={myQuestion.questionText}
          />
          <label htmlFor="axis-titles-container">
            <div style={{ display: "flex", flexDirection: "row" as "row" }}>
              Axis Titles {" "}
              <span
                className="icon icon-info"
                data-tooltip-id="my-tooltip"
                data-tooltip-html="The titles for your two answer axis<br />  go here. We recommend to keep them simple."
                data-tooltip-place="top"
              ></span>
            </div>
          </label>
          <div className="axis-titles-container" id="axis-titles-container">
            <input
              className="input axis-title-input"
              type="text"
              placeholder="Top"
              id="top"
              onChange={handleTopInputChange}
              value={myQuestion.questionAxisTop}
            />
            <div className="axis-left-right-container">
              <input
                className="input axis-title-input"
                type="text"
                placeholder="Left"
                id="left"
                onChange={handleLeftInputChange}
                value={myQuestion.questionAxisLeft}
              />
              <input
                className="input axis-title-input"
                type="text"
                placeholder="Right"
                id="right"
                onChange={handleRightInputChange}
                value={myQuestion.questionAxisRight}
              />
            </div>
            <input
              className="input axis-title-input"
              type="text"
              placeholder="Bottom"
              id="bottom"
              onChange={handleBottomInputChange}
              value={myQuestion.questionAxisBottom}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="button button-danger button-small"
            type="button"
            onClick={deleteQuestion}
          >
            Delete
          </button>
        </div>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default QuestionComponent;

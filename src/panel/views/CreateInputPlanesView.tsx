import { useEffect, useState } from "react";
import QuestionsContainer from "../components/QuestionsContainer";
import { Question } from "../components/Question";
import ParticipantsContainer from "../components/ParticipantsContainer";

interface CreateInputPlanesProps {
  loadNextView: () => void;
  showIntroduction: () => void;
}

const CreateInputPlanesView: React.FC<CreateInputPlanesProps> = ({
  loadNextView,
  showIntroduction,
}) => {

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  const addQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };


  const updateQuestion = (updatedQuestion: Question, index: number) => {
    setQuestions(questions.map((q) => (q.questionId === updatedQuestion.questionId ? updatedQuestion : q)));
  };

  const deleteQuestion = (question: Question, index: number) => {
    setQuestions(questions.filter((q) => q.questionId !== question.questionId));
  };

  const addParticipant = (participant: string) => {
    setParticipants([...participants, participant]);
  };

  const deleteParticipant = (participant: string) => {
    setParticipants(participants.filter((p) => p !== participant));
  };

  const steps = [<QuestionsContainer questions={questions} addQuestion={addQuestion} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}></QuestionsContainer>, <ParticipantsContainer participants={participants} addParticipant={addParticipant} deleteParticipant={deleteParticipant}></ParticipantsContainer>];

  const createInputPlanes = () => {
    // TODO: create input planes
    // createInputPlanes();
    console.log("Create Input Planes");
    loadNextView();
  };

  const nextBtnClicked = () => {
    if(currentStep === 0 && questions.length === 0) {
      setShowErrorMessage(true);
      return;
    }
    if(currentStep === 1 && participants.length === 0) {
      setShowErrorMessage(true);
      return;
    }
    setShowErrorMessage(false);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Error: unknown state of setup of input planes");
    }
  };

  const prevBtnClicked = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      console.log("Error: unknown state of setup of input planes");
    }
  };

  const errorMessage = {
    message: "Add at least one question and one participant.",
    style: {
      color: "red",
      visibility: showErrorMessage ? "visible" as "visible" : "hidden" as "hidden",
    }
  }

  return (
    <div className="">
      <div className="create-input-planes-introduction">
        <div>
          <button
            className="button button-tertiary button-small"
            type="button"
            onClick={showIntroduction}
          >
            <span className="icon icon-back-1"></span>Back
          </button>
        </div>
        <details>
          <summary>How To</summary>
          <ol>
            <li>Create your questions:</li>
            <ul>
              <li>Enter a question and a label for the question.</li>
              <li>
                Enter the values for the two answer scales (top, bottom, left,
                and right).
              </li>
            </ul>
            <li>Add the participants:</li>
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

      <div className="create-input-planes-content">{steps[currentStep]}</div>

      <div className="create-input-planes-actions">
        <div
          style={{
            display: "flex",
            flexDirection: "row" as "row",
            justifyContent: "space-between",
          }}
        >
          <button
            className="button button-secondary"
            type="button"
            onClick={prevBtnClicked}
            disabled={currentStep === 0}
          >
            Back
          </button>
          <button
            className="button button-primary"
            type="button"
            onClick={nextBtnClicked}
          >
            {currentStep < steps.length - 1 ? "Next" : "Create Input Planes"}
          </button>
        </div>
        <div className="error-message" style={errorMessage.style}>{errorMessage.message}</div>
      </div>
    </div>
  );
};

export default CreateInputPlanesView;

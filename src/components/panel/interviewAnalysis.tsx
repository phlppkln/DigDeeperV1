import { Connector, StickyNote } from "@mirohq/websdk-types";
import { useEffect } from "react";

interface InterviewAnalysisProps {
  analysisComplete: () => void;
};

const InterviewAnalysis :React.FC<InterviewAnalysisProps> = ({analysisComplete}) => {
  useEffect(() => {}, []);

  const resetData = async () => {
    console.log("resetData");
    //setData(initialData);
    //console.log('data', data);
    //console.log('initialData: ', initialData);
  };

  const removeTags = (content: string) => {
    return content.replace(/(<([^>]+)>)/gi, "");
  };

  const analyzeSelection = async () => {
    resetData();
    const selection = await miro.board.getSelection();

    if (selection.length === 0) {
      showErrorMessageNoSelection();
      return;
    }

    let dataTmp: InterviewData[] = [];
    try{
    selection.forEach(async (frame) => {
      if (frame.type === "frame") {
        let frameTitle = frame.title;
        let interviewee: string;

        let question: Question = {
          title: "",
          answers: [],
          xLabelMax: "",
          xLabelMin: "",
          yLabelMax: "",
          yLabelMin: "",
          xMaxPosition: 0,
          xMinPosition: 0,
          yMaxPosition: 0,
          yMinPosition: 0,
        };

        if (frameTitle.includes(": ")) {
          var splitted = frameTitle.split(": ");
          interviewee = splitted[0];
          question.title = splitted[1];
        } else if (frameTitle.includes(":")) {
          var splitted = frameTitle.split(":");
          interviewee = splitted[0];
          question.title = splitted[1];
        } else {
          showErrorMessageWrongFormat();
          return;
        }

        const children = await frame.getChildren();
        children.forEach(async (child) => {
          if (child.type === "connector") {
            question = await setAxis(child, question);
          }
          if (child.type === "sticky_note") {
            question = await addAnswer(child, question);
          }
        });

        //check if an interview data already exists
        if (dataTmp.length === 0) {
          //dataTmp is empty
          let interviewData: InterviewData = {
            interviewee: interviewee,
            questions: [],
          };
          interviewData.questions.push(question);
          dataTmp.push(interviewData);
        } else {
          //dataTmp is not empty
          let intervieweeIndex = dataTmp.findIndex(
            (x) => x.interviewee === interviewee
          );
          if (intervieweeIndex === -1) {
            //interviewee does not exist in dataTmp
            let interviewData: InterviewData = {
              interviewee: interviewee,
              questions: [],
            };
            interviewData.questions.push(question);
            dataTmp.push(interviewData);
          } else {
            //interviewee already exists
            dataTmp[intervieweeIndex].questions.push(question);
          }
        }
      }
    });
      
  }
  catch(error){
    console.log(error);
    showErrorMessageWrongFormat();
    return;
  }
    //console.log("dataTmp", dataTmp);
    await sleep(1000);
    if(dataTmp.length === 0){
      showErrorMessageWrongFormat();
      return;
    }
    await saveAppData(dataTmp);
  };

  const setAxis = async (connector: Connector, question: Question) => {
    if (connector.start && connector.end) {
      const startId = connector.start.item;
      const endId = connector.end.item;

      const startItem = await miro.board.getById(startId);
      const endItem = await miro.board.getById(endId);
      if (startItem.type === "text" && endItem.type === "text") {
        const xDistance = Math.abs(startItem.x - endItem.x);
        const yDistance = Math.abs(startItem.y - endItem.y);
        if (xDistance > yDistance) {
          //horizontal
          const startText = removeTags(startItem.content);
          const endText = removeTags(endItem.content);
          const startPosition = startItem.x;
          const endPosition = endItem.x;
          question.xLabelMin = startText;
          question.xLabelMax = endText;
          question.xMinPosition = startPosition;
          question.xMaxPosition = endPosition;
        } else {
          //vertical
          const startText = removeTags(startItem.content);
          const endText = removeTags(endItem.content);
          const startPosition = startItem.y;
          const endPosition = endItem.y;
          question.yLabelMin = startText;
          question.yLabelMax = endText;
          question.yMinPosition = startPosition;
          question.yMaxPosition = endPosition;
        }
      }
    }
    return question;
  };

  const addAnswer = async (sticky: StickyNote, question: Question) => {
    const content = removeTags(sticky.content);
    const x = sticky.x;
    const y = sticky.y;

    let answer: Answer = {
      value: content,
      x: x,
      y: y,
    };

    question.answers.push(answer);

    return question;
  };

  const saveAppData = async (dataTmp: InterviewData[]) => {
    await miro.board.setAppData("data", []);
    console.log("saveAppData should be selection: ", dataTmp);
    console.log('appData should be empty: ', await miro.board.getAppData());
    let dataStr = JSON.stringify(dataTmp);
    await miro.board.setAppData("data", dataStr);
    await showAnalysisCompleteNotification();
    analysisComplete();
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const showAnalysisCompleteNotification = async () => {
    const infoNotification = "Analysis of frames successfully completed";
    await miro.board.notifications.showInfo(infoNotification);
  };

  const showErrorMessageWrongFormat = async () => {
    const errorMessage = {
      action: "Detected wrong format in selection.",
      followUp: "Select frames in the correct format.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
  };

  const showErrorMessageNoSelection = async () => {
    const errorMessage = {
      action: "No items selected.",
      followUp: "Select frames and try again.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
  };

  return (
    <div className="">
          <p>
            First, select the frames that contain the setup plane as well as
            participants notes.
          </p>{" "}
          <div className="center-content">
        <div className="cs1 ce12">
          <button className="button button-primary" onClick={analyzeSelection}>
            Analyze Frames
          </button>
          </div>
          </div>
    </div>
  );
};

export default InterviewAnalysis;

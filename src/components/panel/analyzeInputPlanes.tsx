import { Connector, StickyNote } from "@mirohq/websdk-types";
import { useEffect } from "react";

interface AnalyzeInputPlaneProps {
  analysisComplete: () => void;
};

const AnalyzeInputPlanes :React.FC<AnalyzeInputPlaneProps> = ({analysisComplete}) => {
  useEffect(() => {}, []);

  const removeTags = (content: string) => {
    return content.replace(/(<([^>]+)>)/gi, "");
  };

  const analyzeSelection = async () => {
    const selection = await miro.board.getSelection();

    if (selection.length === 0) {
      showErrorMessageNoSelection();
      return;
    }

    let dataTmp: InputPlaneData[] = [];
    try{
    selection.forEach(async (frame) => {
      if (frame.type === "frame") {
        let frameTitle = frame.title;
        let participant: string;

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
          participant = splitted[0];
          question.title = splitted[1];
        } else if (frameTitle.includes(":")) {
          var splitted = frameTitle.split(":");
          participant = splitted[0];
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

        //check if an input plane data already exists
        if (dataTmp.length === 0) {
          //dataTmp is empty
          let inputPlaneData: InputPlaneData = {
            participant: participant,
            questions: [],
          };
          inputPlaneData.questions.push(question);
          dataTmp.push(inputPlaneData);
        } else {
          //dataTmp is not empty
          let participantIndex = dataTmp.findIndex(
            (x) => x.participant === participant
          );
          if (participantIndex === -1) {
            //participant does not exist in dataTmp
            let inputPlaneData: InputPlaneData = {
              participant: participant,
              questions: [],
            };
            inputPlaneData.questions.push(question);
            dataTmp.push(inputPlaneData);
          } else {
            //participant already exists
            dataTmp[participantIndex].questions.push(question);
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

      let startItem = await miro.board.getById(startId);
      let endItem = await miro.board.getById(endId);
      if (startItem.type === "text" && endItem.type === "text") {
        const xDistance = Math.abs(startItem.x - endItem.x);
        const yDistance = Math.abs(startItem.y - endItem.y);
        //check what axis we are looking at 
        //(offset of position of start and end item on an axis is possible)
        if (xDistance > yDistance) {
          //horizontal
          //swap start and end item if start item is on the right side
          if (startItem.x > endItem.x) {
            const tmp = startItem;
            startItem = endItem;
            endItem = tmp;
          }
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
          //swap start and end item if start item is on the bottom side
          if (startItem.y < endItem.y) {
            const tmp = startItem;
            startItem = endItem;
            endItem = tmp;
          }
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

  const saveAppData = async (dataTmp: InputPlaneData[]) => {
    await miro.board.setAppData("data", []);
    //console.log("saveAppData should be selection: ", dataTmp);
    //console.log('appData should be empty: ', await miro.board.getAppData());
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
            First, select all frames that contain the two-axis plane and the notes with the participants responses.
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

export default AnalyzeInputPlanes;

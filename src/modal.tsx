import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ScatterPlot from "./components/modal/visualizations/scatterPlot";
import Heatmap from "./components/modal/visualizations/heatmap";
//import BarChart  from "./components/modal/visualizations/barchart";
import * as interviewAnalysisHelper from "./helpers/interviewAnalysisHelper";

const Modal = () => {
  const [data, setData] = useState<InterviewData[]>([]);
  const [heatmaps, setHeatmaps] = useState<Heatmaps[]>([]);

  useEffect(() => {
    getData();

    /*     const fetchData = async () => {
      await sleep(100);
      console.log("data", data)

    };
    fetchData().catch(console.error);

    buildHeatmapData(); */
  }, []);

  const createHeatmap = async () => {
    await getData();
    await sleep(100);
    //console.log("data", data)

    await buildHeatmapData();
    await sleep(100);
    //console.log("heatmapData", heatmapData)
  };

  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getData = async () => {
    const appData = JSON.parse(await miro.board.getAppData("data"));
    setData(appData);
  };

  const showErrorMessage = async () => {
    // Compose the message.
    const infoNotification = "No data found. Analyze the interview first.";

    // Display the notification on the board UI.
    await miro.board.notifications.showError(infoNotification);
  };

  const buildHeatmapData = async () => {
    if (data.length === 0) {
      showErrorMessage();
      return;
    }

    //find min and max values for x and y labels in data
    let startX: number = -1;
    let endX: number = -1;
    let startY: number = -1;
    let endY: number = -1;
    data.forEach((interviewData) => {
      interviewData.questions.forEach((questionData) => {
        if (startX === -1 || questionData.xMinPosition < startX) {
          startX = questionData.xMinPosition;
        }
        if (endX === -1 || questionData.xMaxPosition > endX) {
          endX = questionData.xMaxPosition;
        }
        if (startY === -1 || questionData.yMinPosition < startY) {
          startY = questionData.yMinPosition;
        }
        if (endY === -1 || questionData.yMaxPosition > endY) {
          endY = questionData.yMaxPosition;
        }
        //swap if min is bigger than max
        if (startX > endX) {
          const tmp = startX;
          startX = endX;
          endX = tmp;
        }
        if (startY > endY) {
          const tmp = startY;
          startY = endY;
          endY = tmp;
        }
      });
    });

    //calculate scales
    const scaleSteps = 10;
    const scaleX = interviewAnalysisHelper.calculateScale(
      startX,
      endX,
      scaleSteps
    );
    const scaleY = interviewAnalysisHelper.calculateScale(
      startY,
      endY,
      scaleSteps
    );

    //console.log("scaleX", scaleX);
    //console.log("scaleY", scaleY);

    //create HeatmapData answers to scales
    data.forEach((interviewData) => {
      interviewData.questions.forEach((question) => {
        //let answersAssignedToScale = interviewAnalysisHelper.assignAnswerToScale(question.answers, scaleX, scaleY);

        //check if heatmap for this question already exists
        let heatmap = heatmaps.find(
          (heatmap) => heatmap.title === question.title
        );
        if (heatmap === undefined) {
          //create new heatmap
          console.log(
            "create new heatmap because new question detected for ",
            question.title
          );
          let newHeatmapData: HeatmapVisItem[] =
            interviewAnalysisHelper.getItemsAssignedToScale(
              question.answers,
              scaleX,
              scaleY
            );
          let newHeatmap: HeatmapInterface[] =
            interviewAnalysisHelper.createHeatmap(newHeatmapData);
          let heatmapsTmp = heatmaps;
          heatmapsTmp.push({ data: newHeatmap, title: question.title });
          setHeatmaps(heatmapsTmp);
        } else {
          //add answers to existing heatmap if the datapoint exists for this heatmap
          console.log(
            "add answers to existing heatmap if possible to ",
            heatmap.title
          );
          //add answers to existing heatmap
          let newHeatmapData: HeatmapVisItem[] =
            interviewAnalysisHelper.getItemsAssignedToScale(
              question.answers,
              scaleX,
              scaleY
            );
          interviewAnalysisHelper.addToHeatmap(newHeatmapData, heatmap.data);
        }
      });
    });

    console.log(heatmaps);
    await sleep(1000);
  };

  const printData = () => {
    console.log(data);
    return JSON.stringify(data);
  };

  const getHeatmaps = () => {
    let heatmapsComponents: JSX.Element[] = [];
    let i = 0;
    heatmaps.forEach((heatmap) => {
      heatmapsComponents.push(
        <Heatmap data={heatmap.data} width={500} height={500} key={i} title={heatmap.title}></Heatmap>
      );
      i++;
    });
    return heatmapsComponents;
  };

  return (
    <div className="main">
      {/* ___________ HEADER ______________*/}
      <div className="header">
        <h1>Visualization</h1>
      </div>

      {/* ___________ VISUALIZATIONS ______________*/}
      <div className="visualizations-container">
        <div className="heatmap" style={{ marginLeft: "200px" }}>
          {getHeatmaps()}
        </div>
        <div className="scatterplot" style={{ marginLeft: "200px" }}>
          {/* {scatterPlot} */}
        </div>
      </div>
      {/*         <div className="barchart" style={{ marginLeft: "200px" }}>
          {barChart}
        </div> */}

      {/* ___________ BUTTONS ______________*/}
      <div className="buttons-container">
        <button onClick={createHeatmap}>Create Heatmap</button>
        <button onClick={printData}>Print Data</button>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Modal />);
}

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import ScatterPlot from "./components/modal/visualizations/scatterPlot";
import { Heatmap } from "./components/modal/visualizations/heatmap";
//import BarChart  from "./components/modal/visualizations/barchart";
import * as interviewAnalysisHelper from "./helpers/interviewAnalysisHelper";

const Modal = () => {
  const [heatmapSteps, setHeatmapSteps] = useState<number>(2);
  const [data, setData] = useState<InterviewData[]>([]);
  const [heatmaps, setHeatmaps] = useState<Heatmaps[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const handleGranularityChange = (event: any) => {
    if (event.target.value < 2) {
      showErrorMessageInvalidGranularity();
      return;
    } else if (event.target.value > 50) {
      showErrorMessageInvalidGranularity();
      return;
    }
    setHeatmapSteps(event.target.value);
  };

  const showErrorMessageInvalidGranularity = async () => {
    const errorMessage = {
      action: "Invalid granularity.",
      followUp: "Select a number between 2 and 50 and try again.",
    };
    const errorNotification = `${errorMessage.action} ${errorMessage.followUp}`;

    await miro.board.notifications.showError(errorNotification);
  };

  const createHeatmap = async () => {
    const emptyHeatmap: Heatmaps[] = [];
    setHeatmaps(emptyHeatmap);

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
    await sleep(1000);
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
    } else if (heatmapSteps < 2 || heatmapSteps > 100) {
      showErrorMessageInvalidGranularity();
      return;
    }

    //console.log('data in buildHeatmapData', data)
    data.forEach(async (interviewData) => {
      interviewData.questions.forEach(async (questionData) => {
        await sleep(100);
        //find min and max values for x and y labels for question
        //console.log("questionData", questionData);
        let startX = questionData.xMinPosition;
        let endX = questionData.xMaxPosition;
        let startY = questionData.yMinPosition;
        let endY = questionData.yMaxPosition;
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

        //calculate scales
        /*     console.log("startX", startX);
    console.log("endX", endX);
    console.log("startY", startY);
    console.log("endY", endY); */
        const scaleX = interviewAnalysisHelper.calculateScale(
          startX,
          endX,
          heatmapSteps
        );
        const scaleY = interviewAnalysisHelper.calculateScale(
          startY,
          endY,
          heatmapSteps
        );

        //console.log("scaleX", scaleX);
        //console.log("scaleY", scaleY);
        //let answersAssignedToScale = interviewAnalysisHelper.assignAnswerToScale(question.answers, scaleX, scaleY);

        //check if heatmap for this question already exists
        let heatmap = heatmaps.find(
          (heatmap) => heatmap.title === questionData.title
        );
        if (heatmap === undefined) {
          //create new heatmap
          /*           console.log(
            "create new heatmap because new question detected for ",
            questionData.title
          ); */
          let newHeatmapData: HeatmapVisItem[] =
            interviewAnalysisHelper.getItemsAssignedToScale(
              questionData.answers,
              scaleX,
              scaleY
            );
          //invert heatmaps y axis
          interviewAnalysisHelper.invertDataset(newHeatmapData);

          let newHeatmap: HeatmapInterface[] =
            interviewAnalysisHelper.createHeatmap(
              newHeatmapData,
              heatmapSteps,
              questionData.xLabelMin,
              questionData.xLabelMax,
              questionData.yLabelMin,
              questionData.yLabelMax
            );
          let heatmapsTmp = heatmaps;
          heatmapsTmp.push({ data: newHeatmap, title: questionData.title });
          setHeatmaps(heatmapsTmp);
        } else {
          //add answers to existing heatmap if the datapoint exists for this heatmap
          /*           console.log(
            "add answers to existing heatmap if possible to ",
            heatmap.title
          ); */
          //add answers to existing heatmap
          let newHeatmapData: HeatmapVisItem[] =
            interviewAnalysisHelper.getItemsAssignedToScale(
              questionData.answers,
              scaleX,
              scaleY
            );
          //invert heatmaps y axis
          interviewAnalysisHelper.invertDataset(newHeatmapData);
          interviewAnalysisHelper.addToHeatmap(
            newHeatmapData,
            heatmap.data,
            heatmapSteps,
            questionData.xLabelMin,
            questionData.xLabelMax,
            questionData.yLabelMin,
            questionData.yLabelMax
          );
        }
      });
    });

    console.log("heatmaps", heatmaps);
    await sleep(1000);
  };

  const printData = async () => {
    console.log("printData Modal: ", data);
  };

  const getHeatmaps = () => {
    let heatmapsComponents: JSX.Element[] = [];
    let i = 0;
    heatmaps.forEach((heatmap) => {
      heatmapsComponents.push(
        <Heatmap
          data={heatmap.data}
          width={500}
          height={500}
          key={i}
          title={heatmap.title}
        ></Heatmap>
      );
      i++;
    });
    return heatmapsComponents;
  };

  return (
    <div className="">
      {/* ___________ HEADER ______________*/}
      <h1>DigDeeper</h1>
      <p>
        With DigDeeper you can visualize and analyze spatial relationships of
        notes along the two axis. This allows you to get a deeper understanding
        of peoples perspective and to find the most important areas.
      </p>
      <p>
        All you need to do is to select the axis granularity and click the
        button. This will define the number of steps the x and y axis is divided
        into.
      </p>
      {/*         <div className="barchart" style={{ marginLeft: "200px" }}>
          {barChart}
        </div> */}
      <button className="button button-primary" onClick={printData}>
        Print Data
      </button>
      <div className="modal-settings-container">
        <div className="form-group">
          <label htmlFor="axis-granularity">Axis Granularity</label>
          <input
            className="input"
            type="number"
            placeholder="Granularity"
            id="axis-granularity"
            onChange={handleGranularityChange}
            value={heatmapSteps}
          />
        </div>

        {/* ___________ BUTTONS ______________*/}
        <div className="buttons-container">
          <button
            className="button button-primary button-right"
            onClick={createHeatmap}
          >
            Create Heatmap
          </button>
        </div>
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
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<Modal />);
}

import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Heatmap } from "./visualizations/heatmap/heatmap";
import * as inputPlaneAnalysisHelper from "../helper-scripts/inputPlaneAnalysisHelper";

const VisModalMain = () => {
  const [heatmapSteps, setHeatmapSteps] = useState<number>(2);
  const [data, setData] = useState<InputPlaneData[]>([]);
  const [heatmaps, setHeatmaps] = useState<Heatmaps[]>([]);

  useEffect(() => {
    getData();
    setHeatmaps([]);
  }, []);

  const handleGranularityChange = (event: any) => {
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
    await sleep(100);

    await getData();
    await sleep(100);

    setHeatmaps(buildHeatmapData());
    await sleep(1000);
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
    const infoNotification = "No data found. Analyze the input planes first.";

    // Display the notification on the board UI.
    await miro.board.notifications.showError(infoNotification);
  };

  const buildHeatmapData = ():Heatmaps[] => {
    if (data.length === 0) {
      showErrorMessage();
      return [];
    } else if (heatmapSteps < 2 || heatmapSteps > 100) {
      showErrorMessageInvalidGranularity();
      return [];
    }
    
    let createdHeatmaps: Heatmaps[] = [];
    data.forEach((inputPlaneData) => {
      inputPlaneData.questions.forEach((questionData) => {
        //find min and max values for x and y labels for question
        let startX = questionData.xMinPosition;
        let endX = questionData.xMaxPosition;
        let startY = questionData.yMinPosition;
        let endY = questionData.yMaxPosition;

        //swap if min is bigger than max (to invert y axis of miro frame)
/*         if (startX > endX) {
          console.log("swapping x")
          const tmp = startX;
          startX = endX;
          endX = tmp;
        }
        if (startY > endY) {
          console.log("swapping y")
          const tmp = startY;
          startY = endY;
          endY = tmp;
        } */

        const scaleX = inputPlaneAnalysisHelper.calculateScale(
          startX,
          endX,
          heatmapSteps
        );
        const scaleY = inputPlaneAnalysisHelper.calculateScale(
          startY,
          endY,
          heatmapSteps
        );

        console.log("questionData", questionData);
        console.log("startX", startX);
        console.log("endX", endX);
        console.log("startY", startY);
        console.log("endY", endY);
        console.log("scaleX", scaleX);
        console.log("scaleY", scaleY); 

        //check if heatmap for this question already exists
        let heatmap = createdHeatmaps.find(
          (heatmap) => heatmap.title === questionData.title
        );
        if (heatmap === undefined) {
          //create new heatmap
/*            console.log(
            "create new heatmap because new question detected for ",
            questionData.title
          );  */
          let newHeatmapData: HeatmapVisItem[] =
            inputPlaneAnalysisHelper.assignItemsToScale(
              questionData.answers,
              scaleX,
              scaleY
            );
          //console.log("newHeatmapData", newHeatmapData);

          let newHeatmap: HeatmapInterface[] =
            inputPlaneAnalysisHelper.createHeatmap(
              newHeatmapData,
              heatmapSteps,
              questionData.xLabelMin,
              questionData.xLabelMax,
              questionData.yLabelMin,
              questionData.yLabelMax
            );
          createdHeatmaps.push({ data: newHeatmap, title: questionData.title });
        } else {
          //add answers to existing heatmap if the datapoint exists for this heatmap
/*           console.log(
            "add answers to existing heatmap if possible to ",
            heatmap.title
          ); */
          //add answers to existing heatmap
          let newHeatmapData: HeatmapVisItem[] =
            inputPlaneAnalysisHelper.assignItemsToScale(
              questionData.answers,
              scaleX,
              scaleY
            );
            
          inputPlaneAnalysisHelper.addToHeatmap(
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
    return createdHeatmaps;
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
      {/*
      <button className="button button-primary" onClick={printData}>
        Print Data
      </button> */}
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
            Create Heatmaps
          </button>
        </div>
      </div>

      {/* ___________ VISUALIZATIONS ______________*/}
      <div className="visualizations-container">
        <div className="heatmap" style={{ marginLeft: "200px" }}>
          {getHeatmaps()}
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<VisModalMain />);
}

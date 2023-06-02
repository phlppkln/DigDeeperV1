import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import InterviewAnalysis from "./components/panel/interviewAnalysis";
import * as index from "./index";
import { saveAs } from "file-saver";

const App: React.FC = () => {
  useEffect(() => {}, []);

  const openModal = async () => {
    await index.openModal();
  };

  const exportData = async () => {
    const data = await miro.board.getAppData("data");

    console.log(data)
    
    //const jsonData = JSON.stringify(data);
    //const blob = new Blob([jsonData], { type: "application/json" });
    //saveAs(blob, 'dig-deeper_interview-data.json');
  };

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        <InterviewAnalysis />
      </div>
      <div className="cs1 ce12">
        <h2>2. Dig Deeper</h2>
        <div className="cs1 ce12">
          <p>
            After you analyzed the interviews, you can explore the interviews in Miro by clicking on
          the "Dig Deeper" button.
          </p>
        </div>
      <div className="cs1 ce12">
        <button className="button button-primary" onClick={openModal}>
          Dig Deeper
        </button>
      </div>
        <p>
          You can also export the data by clicking on the "Export"
            button to explore the interviews in your favorite tool..
        </p>
      </div>
        <div className="cs1 ce12">
          <button className="button button-primary" onClick={exportData}>
            Export Data
          </button>
        </div>
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

import { useEffect } from "react";
import { saveAs } from "file-saver"
import * as index from "../../index"

interface VisualizeInputPlanesViewProps {
}

const visualizeInputPlanesView: React.FC<VisualizeInputPlanesViewProps> = ({
}) => {

    useEffect(() => {}, []);

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

      const openModal = async () => {
        await index.openVisModal();
      };
      
    return (
        <div className="">
        <p>
              After you analyzed the frames, you can explore the perspectives directly in
              Miro or export the analyzed data.
            </p>
          <div className="">
            <button
              className="button button-primary"
              onClick={openModal}
            >
              Dig Deeper
            </button>
          </div>
          <div className="cs1 ce12">
            <button
              className="button button-primary"
              onClick={exportData}
            >
              Export Data
            </button>
            </div>
            </div>
            );
};

export default visualizeInputPlanesView;
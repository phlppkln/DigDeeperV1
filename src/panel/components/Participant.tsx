import React, { useState } from "react"
import { Tooltip } from "react-tooltip";

interface ParticipantProps {
    participantName: string,
    updateParticipant: (newName: string) => void,
    deleteParticipant: () => void
}

const ParticipantComponent: React.FC<ParticipantProps> = ({
    participantName,
    updateParticipant,
    deleteParticipant
}) => {

  const [participantInput, setParticipantInput] = useState<string>("") 


  const updateParticipantData = async () => {
    updateParticipant(participantInput);
  }

  const handleParticipantInputChange = (event: any) => {
    setParticipantInput(event.target.value);
    updateParticipantData();
  };

  const participantStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    padding: "10px",
    marginBottom: "10px",
    border: "0.2rem solid var(--blackAlpha80)",
    borderRadius: "5px",
  };

  return (
    <div className="participant-container" style={participantStyle}>
       <div className="form-group">
          <label htmlFor="question-id">
            <div style={{ display: "flex", flexDirection: "row" as "row" }}>
              Participant:
              <span
                className="icon icon-info"
                data-tooltip-id="my-tooltip"
                data-tooltip-html="The name of the participant."
                data-tooltip-place="top"
              ></span>
            </div>
          </label>
          <input
            className="input"
            type="text"
            placeholder="Name"
            id="participant"
            onChange={handleParticipantInputChange}
            value={participantName}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="button button-danger button-small"
            type="button"
            onClick={deleteParticipant}
          >
            Delete
          </button>
        </div>
      <Tooltip id="my-tooltip" />
    </div>
  )
}

export default ParticipantComponent
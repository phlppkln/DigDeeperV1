import React from 'react'
import ParticipantComponent from './Participant';

interface ParticipantsContainerProps {
  participants: string[];
  addParticipant: (participant: string) => void;
  deleteParticipant: (participant: string) => void;
}

const ParticipantsContainer: React.FC<ParticipantsContainerProps> = ({
  participants,
  addParticipant,
  deleteParticipant
}) => {

  
  return (
    <div>
      {participants.map((participant) => (
        <ParticipantComponent participantName={participant}></ParticipantComponent>
      ))}

      <button
        className="button button-primary"
        onClick={() => addParticipant("Participant")}
      >
        Add Participant
      </button>

      <button
        className="button button-primary"
        onClick={() => deleteParticipant("Participant")}
      >
        Delete Participant
      </button>
    </div>
  )
}

export default ParticipantsContainer
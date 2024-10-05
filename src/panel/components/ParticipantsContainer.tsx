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

  const updateParticipant = (newName: string) => {
    addParticipant(newName);
  };

  return (
    <div>
      {participants.map((participant) => (
        <ParticipantComponent participantName={participant} updateParticipant={updateParticipant} deleteParticipant={deleteParticipant(participant)}></ParticipantComponent>
      ))}

      <button
        className="button button-primary"
        onClick={() => addParticipant("")}
      >
        Add Participant
      </button>
    </div>
  )
}

export default ParticipantsContainer
import React from 'react'
import ParticipantComponent from './Participant';
import { useState } from 'react';

interface ParticipantsContainerProps {
}

const ParticipantsContainer: React.FC<ParticipantsContainerProps> = ({
}) => {

  //TODO delete

  const [participants, setParticipants] = useState<string[]>([]);

  const updateParticipant = (newName: string) => {
    alert("update participant with name " + newName);
  };

  return (
    <div>
      {participants.map((participant: string) => (
        <ParticipantComponent participantName={participant} updateParticipant={updateParticipant} deleteParticipant={deleteParticipant(participant)}></ParticipantComponent>
      ))}

      <button
        className="button button-primary"
        onClick={() => alert("add participant")}
      >
        Add Participant
      </button>
    </div>
  )
}

export default ParticipantsContainer
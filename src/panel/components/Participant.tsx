
interface ParticipantProps {
    participantName: string
}

const ParticipantComponent: React.FC<ParticipantProps> = ({
    participantName
}) => {

  return (
    <div>Participant: {participantName}</div>
  )
}

export default ParticipantComponent
import { useParams } from "react-router";

export default function Patient() {
  const { patientId } = useParams();
  return <div>Patient Id :{patientId}</div>;
}
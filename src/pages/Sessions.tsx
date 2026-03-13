import PatientSessions from "../components/SessionComponents/PatientSessionComponents/PatientSessions";
import SpecialistSessions from "../components/SessionComponents/SpecialistSessionComponents/SpecialistSessions";
export default function Sessions() {
  const role: "patient" | "specialist" = "specialist";
  if (role === "specialist") {
    return <SpecialistSessions />;
  } else {
    return <PatientSessions />;
  }
}

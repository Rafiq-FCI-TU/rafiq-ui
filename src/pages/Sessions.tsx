import PatientSessions from "../components/SessionComponents/PatientSessionComponents/PatientSessions";
import SpecialistSessions from "../components/SessionComponents/SpecialistSessionComponents/SpecialistSessions";
import { useAuth } from "../contexts/AuthContext";
export default function Sessions() {
  const { user } = useAuth();
  const isFamily: boolean = user?.roles?.includes("Family") ?? false;

  if (isFamily) {
    return <PatientSessions />;
  } else {
    return <SpecialistSessions />;
  }
}

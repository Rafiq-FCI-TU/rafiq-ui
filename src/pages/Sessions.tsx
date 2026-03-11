import { useState } from "react";
import PatientSessions from "../components/SessionComponents/PatientSessions";
import SpecialistSessions from "../components/SessionComponents/SpecialistSession";
export default function Sessions() {
  const [role, setRole] = useState<"patient" | "specialist">("patient");

  if (role === "specialist") {
    return <SpecialistSessions />;
    setRole("patient");
  } else {
    return <PatientSessions />;
  }
}

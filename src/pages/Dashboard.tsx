import { useAuth } from "../contexts/AuthContext";
import FamilyDashboard from "../components/DashboardComponents/FamilyDashboard";
import SpecialistDashboard from "../components/DashboardComponents/SpecialistDashboard";

export default function Dashboard() {
  const { user } = useAuth();
  const isFamily = user?.roles?.includes("Family");

  if (!isFamily) {
    return <SpecialistDashboard />;
  }

  return <FamilyDashboard />;
}


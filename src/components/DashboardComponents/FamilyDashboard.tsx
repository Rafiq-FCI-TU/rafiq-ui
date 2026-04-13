import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import type { SpecialistApiResponse } from "../../types/Specialist";
import WelcomeBanner from "./FamilyDashboard/WelcomeBanner";
import SpecialistDetailsCard from "./FamilyDashboard/SpecialistDetailsCard";
import SkillsProgress from "./FamilyDashboard/SkillsProgress";
import ProgressChart from "./FamilyDashboard/ProgressChart";
import RecentActivity from "./FamilyDashboard/RecentActivity";
import Milestones from "./FamilyDashboard/Milestones";

export default function FamilyDashboard() {
  const { user } = useAuth();
  const [specialistData, setSpecialistData] = useState<SpecialistApiResponse['data'] | null>(null);
  const [isLoadingSpecialist, setIsLoadingSpecialist] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialistDetails = async () => {
      if (!user?.specialistId) {
        return;
      }

      setIsLoadingSpecialist(true);
      setError(null);

      try {
        const response = await fetch(
          `https://rafiq-server-gzdsa6a2afe4chbd.germanywestcentral-01.azurewebsites.net/api/Specialist/${user.specialistId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch specialist details');
        }

        const result: SpecialistApiResponse = await response.json();

        if (result.success && result.data) {
          setSpecialistData(result.data);
        } else {
          throw new Error(result.message || 'Failed to fetch specialist details');
        }
      } catch (err) {
        console.error('Error fetching specialist details:', err);
        setError('Unable to load specialist information');
      } finally {
        setIsLoadingSpecialist(false);
      }
    };

    fetchSpecialistDetails();
  }, [user?.specialistId]);

  return (
    <div className="container mx-auto px-6 py-8 h-[calc(100vh-74px)] overflow-y-auto bg-linear-to-br from-gray-50 to-green-50/30">
      <WelcomeBanner username={user?.username} />
      
      <SpecialistDetailsCard 
        isLoading={isLoadingSpecialist} 
        error={error} 
        specialistData={specialistData} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <SkillsProgress />
          <ProgressChart />
        </div>

        <div className="space-y-6">
          <RecentActivity />
          <Milestones />
        </div>
      </div>
    </div>
  );
}

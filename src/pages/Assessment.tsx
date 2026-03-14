import { useNavigate } from 'react-router';
import AssessmentQuestionnaire from '../components/AuthComponents/AssessmentQuestionnaire';
import { useAuth } from '../contexts/AuthContext';

export default function Assessment() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleAssessmentComplete = (values: any) => {
        console.log('Assessment complete:', values);

        navigate('/dashboard');
    };

    const handleBack = () => {
        logout();
        navigate('/login');
    };

    if (!user || !user.id) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <p className="text-gray-600 mb-4">Please log in to complete your assessment.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-[#188147] text-white rounded-lg font-medium hover:bg-[#116937]"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#DDE4DE] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="flex items-center space-x-3 mb-8">
                <div className="w-10.5 h-10.5 bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
                    <img src="/logo.png" alt="Rafiq" className="w-[85%] h-[85%] object-contain" />
                </div>
                <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">Rafiq</h1>
            </div>

            <div className="w-full max-w-200 bg-white rounded-3xl shadow-sm overflow-hidden flex">
                <div className="hidden md:block w-1/2 relative bg-gray-100">
                    <img
                        src="/register_photo.jpeg"
                        alt="Child Assessment"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                <div className="p-8 md:p-10 w-full md:w-1/2">
                    <AssessmentQuestionnaire
                        onSubmit={handleAssessmentComplete}
                        onBack={handleBack}
                        patientId={user.patientid}
                        initialAssessmentId={user.assessmentId}
                    />
                </div>
            </div>
        </div>
    );
}

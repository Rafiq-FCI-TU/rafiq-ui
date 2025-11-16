import { Link } from 'react-router';

interface AuthToggleProps {
  activeTab: 'login' | 'register';
  loginLabel: string;
  registerLabel: string;
}

export default function AuthToggle({ activeTab, loginLabel, registerLabel }: AuthToggleProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
      {activeTab === 'login' ? (
        <div className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors bg-green-500 text-white text-center">
          {loginLabel}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-800 text-center"
        >
          {loginLabel}
        </Link>
      )}
      
      {activeTab === 'register' ? (
        <div className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors bg-green-500 text-white text-center">
          {registerLabel}
        </div>
      ) : (
        <Link
          to="/register"
          className="flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-gray-800 text-center"
        >
          {registerLabel}
        </Link>
      )}
    </div>
  );
}

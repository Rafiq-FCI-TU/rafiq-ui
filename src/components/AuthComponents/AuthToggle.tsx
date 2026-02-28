import { Link } from 'react-router';

interface AuthToggleProps {
  activeTab: 'login' | 'register';
  loginLabel: string;
  registerLabel: string;
}

export default function AuthToggle({ activeTab, loginLabel, registerLabel }: AuthToggleProps) {
  return (
    <div className="flex bg-gray-100/80 p-1 mb-8 rounded-xl backdrop-blur-sm shadow-inner border border-gray-200/50">
      {activeTab === 'login' ? (
        <div className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all bg-white text-gray-900 text-center shadow-sm">
          {loginLabel}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all text-gray-500 hover:text-gray-900 text-center hover:bg-gray-200/50"
        >
          {loginLabel}
        </Link>
      )}

      {activeTab === 'register' ? (
        <div className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all bg-white text-gray-900 text-center shadow-sm">
          {registerLabel}
        </div>
      ) : (
        <Link
          to="/register"
          className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all text-gray-500 hover:text-gray-900 text-center hover:bg-gray-200/50"
        >
          {registerLabel}
        </Link>
      )}
    </div>
  );
}

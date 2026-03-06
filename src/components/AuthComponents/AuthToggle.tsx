import { Link } from 'react-router';

interface AuthToggleProps {
  activeTab: 'login' | 'register';
  loginLabel: string;
  registerLabel: string;
}

export default function AuthToggle({ activeTab, loginLabel, registerLabel }: AuthToggleProps) {
  return (
    <div className="flex bg-[#F3F4F6] p-1.5 mb-8 rounded-[14px]">
      {activeTab === 'login' ? (
        <div className="flex-1 py-3 px-3 rounded-[10px] text-sm font-semibold transition-all bg-white text-gray-900 text-center shadow-sm">
          {loginLabel}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex-1 py-3 px-3 rounded-[10px] text-sm font-semibold transition-all text-gray-500 hover:text-gray-900 text-center"
        >
          {loginLabel}
        </Link>
      )}

      {activeTab === 'register' ? (
        <div className="flex-1 py-3 px-3 rounded-[10px] text-sm font-semibold transition-all bg-white text-gray-900 text-center shadow-sm">
          {registerLabel}
        </div>
      ) : (
        <Link
          to="/register"
          className="flex-1 py-3 px-3 rounded-[10px] text-sm font-semibold transition-all text-gray-500 hover:text-gray-900 text-center"
        >
          {registerLabel}
        </Link>
      )}
    </div>
  );
}

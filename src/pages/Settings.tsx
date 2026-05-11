import { useState, type ReactNode } from "react";
import { Bell, Lock, UserRound, Save, CircleAlert } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type SettingsTab = "profile" | "notifications" | "security";

export default function Settings() {
  const { user } = useAuth();
  const isSpecialist =
    user?.roles?.some((role) => role.toLowerCase() === "specialist") ?? false;
  const fullName = user?.username || "Admin User";
  const accountEmail = user?.email || "admin@rafiq-health.com";
  const accountRole = user?.roles?.[0] || "Administrator";

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    credentials: "",
    specialty: "",
    organization: "",
    professionalBio: "",
  });

  const tabs: { key: SettingsTab; label: string; icon: ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <UserRound className="w-4 h-4" /> },
    { key: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { key: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-[calc(100vh-74px)] bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account and platform preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5">
          <aside className="rounded-2xl border border-gray-200 bg-white p-3 h-fit shadow-sm">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? "bg-green-50 text-primary border border-primary/20"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          <section className="space-y-4">
            {activeTab === "profile" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600">
                    <UserRound className="w-10 h-10" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800 leading-tight">{fullName}</p>
                    <p className="text-lg text-gray-500 leading-tight mt-1">{accountEmail}</p>
                    <span className="inline-flex mt-3 px-3 py-1 rounded-xl bg-green-100 text-primary text-xs font-semibold">
                      {accountRole}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="First Name"
                    value={profileForm.firstName}
                    onChange={(value) => setProfileForm((prev) => ({ ...prev, firstName: value }))}
                  />
                  <InputField
                    label="Last Name"
                    value={profileForm.lastName}
                    onChange={(value) => setProfileForm((prev) => ({ ...prev, lastName: value }))}
                  />
                  <InputField
                    label="Email Address"
                    value={profileForm.email}
                    onChange={(value) => setProfileForm((prev) => ({ ...prev, email: value }))}
                    className="md:col-span-2"
                  />
                  {isSpecialist && (
                    <>
                      <InputField
                        label="Credentials"
                        value={profileForm.credentials}
                        onChange={(value) =>
                          setProfileForm((prev) => ({ ...prev, credentials: value }))
                        }
                      />
                      <InputField
                        label="Specialty"
                        value={profileForm.specialty}
                        onChange={(value) =>
                          setProfileForm((prev) => ({ ...prev, specialty: value }))
                        }
                      />
                      <InputField
                        label="Organization"
                        value={profileForm.organization}
                        onChange={(value) =>
                          setProfileForm((prev) => ({ ...prev, organization: value }))
                        }
                      />
                    </>
                  )}
                </div>
                {isSpecialist && (
                  <TextAreaField
                    label="Professional Bio"
                    value={profileForm.professionalBio}
                    onChange={(value) =>
                      setProfileForm((prev) => ({ ...prev, professionalBio: value }))
                    }
                  />
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm space-y-5">
                <h2 className="text-4xl font-bold text-gray-800">Change Password</h2>
                <div className="space-y-4 pt-2">
                  <InputField
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                    value={securityForm.currentPassword}
                    onChange={(value) =>
                      setSecurityForm((prev) => ({ ...prev, currentPassword: value }))
                    }
                  />
                  <InputField
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    value={securityForm.newPassword}
                    onChange={(value) => setSecurityForm((prev) => ({ ...prev, newPassword: value }))}
                  />
                  <InputField
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                    value={securityForm.confirmPassword}
                    onChange={(value) =>
                      setSecurityForm((prev) => ({ ...prev, confirmPassword: value }))
                    }
                  />
                </div>

                <div className="rounded-xl bg-blue-50 px-4 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CircleAlert className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-700 font-bold text-sm">Password Requirements:</p>
                  </div>
                  <ul className="list-disc pl-10 space-y-1 text-blue-600 text-sm">
                    <li>At least 8 characters long</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Include at least one number</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Notification Preferences</h2>
                <ToggleRow
                  title="Push Notifications"
                  description="Get app alerts for sessions, messages, and updates."
                  enabled={pushNotifications}
                  onToggle={() => setPushNotifications(!pushNotifications)}
                />
                <ToggleRow
                  title="Email Notifications"
                  description="Receive activity summaries in your inbox."
                  enabled={emailNotifications}
                  onToggle={() => setEmailNotifications(!emailNotifications)}
                />
                <ToggleRow
                  title="SMS Notifications"
                  description="Receive urgent reminders by SMS."
                  enabled={smsNotifications}
                  onToggle={() => setSmsNotifications(!smsNotifications)}
                />
                <ToggleRow
                  title="Marketing Emails"
                  description="Get product news and educational content."
                  enabled={marketingEmails}
                  onToggle={() => setMarketingEmails(!marketingEmails)}
                />
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm flex justify-end">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: string;
  placeholder?: string;
};

function InputField({
  label,
  value,
  onChange,
  className,
  type = "text",
  placeholder,
}: InputFieldProps) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>
  );
}

type TextAreaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function TextAreaField({ label, value, onChange }: TextAreaFieldProps) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
      />
    </div>
  );
}

type ToggleRowProps = {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

function ToggleRow({ title, description, enabled, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
      <div className="pr-3">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${enabled ? "bg-primary" : "bg-gray-300"}`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </div>
  );
}

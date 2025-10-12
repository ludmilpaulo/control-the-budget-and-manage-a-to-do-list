'use client';

export default function ProfilePage() {
  const handleLogout = () => {
    alert('Logout functionality would be implemented here');
  };

  const settings = [
    {
      title: 'Profile Settings',
      items: [
        { label: 'Edit Profile', value: '', icon: '👤' },
        { label: 'Change Password', value: '', icon: '🔒' },
      ],
    },
    {
      title: 'Financial Settings',
      items: [
        { label: 'Currency', value: 'USD ($)', icon: '💵' },
        { label: 'Budget Period', value: 'Monthly', icon: '📅' },
        { label: 'Notifications', value: 'Enabled', icon: '🔔' },
      ],
    },
    {
      title: 'App Settings',
      items: [
        { label: 'Theme', value: 'Light', icon: '🌙' },
        { label: 'Language', value: 'English', icon: '🌐' },
        { label: 'About', value: '', icon: 'ℹ️' },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      {/* Header with Profile Info */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span className="text-4xl font-bold text-purple-600">JD</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">John Doe</h1>
          <p className="text-lg opacity-90">john.doe@example.com</p>
        </div>
      </div>

      {/* Settings Sections */}
      {settings.map((section, idx) => (
        <section key={idx}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{section.title}</h2>
          <div className="space-y-2">
            {section.items.map((item, itemIdx) => (
              <button
                key={itemIdx}
                className="w-full bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {item.label}
                    </h3>
                    {item.value && (
                      <p className="text-sm text-gray-500 mt-1">{item.value}</p>
                    )}
                  </div>
                </div>
                <span className="text-gray-400 text-xl">›</span>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* Logout Button */}
      <section>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all font-semibold text-lg"
        >
          Logout
        </button>
      </section>

      {/* App Info */}
      <div className="text-center py-6 space-y-2">
        <p className="text-gray-500 text-sm">CashMind v1.0.0</p>
        <p className="text-gray-500 text-sm">Budget Control & Task Manager</p>
        <p className="text-gray-400 text-xs mt-4">
          Built with Next.js, TypeScript, Tailwind CSS & GraphQL
        </p>
      </div>
    </div>
  );
}


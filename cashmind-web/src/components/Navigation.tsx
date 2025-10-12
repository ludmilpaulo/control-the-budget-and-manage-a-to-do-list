'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Budget', path: '/budget', icon: '💰' },
    { name: 'Tasks', path: '/tasks', icon: '✓' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              CashMind
            </span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  pathname === item.path
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={item.name}
              >
                <span className="text-xl">{item.icon}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}


import React from 'react';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600">
          管理者向けダッシュボード - /dashboard
        </p>
        <div className="mt-8 text-center">
          <div className="bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">✅ Dashboard page is working!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
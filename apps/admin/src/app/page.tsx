import React from 'react';

export default function AdminHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-600">
          管理者向けダッシュボード
        </p>
      </div>
    </main>
  );
}
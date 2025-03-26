// src/app/dashboard/page.tsx
'use client';

import ProtectedRoute from '../ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {/* Nội dung trang dashboard */}
      </div>
    </ProtectedRoute>
  );
}
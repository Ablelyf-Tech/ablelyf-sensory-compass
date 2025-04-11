
import React from 'react';
import TeacherSidebar from '../teacher/TeacherSidebar';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <main className="flex-1 p-6 bg-slate-50">
        {children}
      </main>
    </div>
  );
};

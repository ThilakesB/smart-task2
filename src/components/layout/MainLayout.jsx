import React from 'react';
import { Header } from './Header';

export function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main className="animate-slide-up">
        {children}
      </main>
    </div>
  );
}

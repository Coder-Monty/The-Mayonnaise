import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PredictorPage from './pages/PredictorPage';
import ResearchPage from './pages/ResearchPage';
import ReportsPage from './pages/ReportsPage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/predictor" replace />} />
            <Route path="/predictor" element={<PredictorPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/predictor" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

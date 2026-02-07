import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { DreamProvider } from './context/DreamContext';
import { ToastProvider } from './components/common/Toast';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import RecordDreamPage from './pages/RecordDreamPage';
import DreamDetailPage from './pages/DreamDetailPage';
import DreamJournalPage from './pages/DreamJournalPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SocialPage from './pages/SocialPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import DreamArtPage from './pages/DreamArtPage';
import DreamOfTheDayPage from './pages/DreamOfTheDayPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <DreamProvider>
            <ToastProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/record" element={<ProtectedRoute><RecordDreamPage /></ProtectedRoute>} />
                  <Route path="/dream/:id" element={<ProtectedRoute><DreamDetailPage /></ProtectedRoute>} />
                  <Route path="/journal" element={<ProtectedRoute><DreamJournalPage /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
                  <Route path="/social" element={<ProtectedRoute><SocialPage /></ProtectedRoute>} />
                  <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/art" element={<ProtectedRoute><DreamArtPage /></ProtectedRoute>} />
                  <Route path="/dream-of-the-day" element={<DreamOfTheDayPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Layout>
            </ToastProvider>
          </DreamProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

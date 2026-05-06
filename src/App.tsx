import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Analytics } from './pages/Analytics';
import { Resources } from './pages/Resources';
import { LearningPathPage } from './pages/LearningPathPage';
import { Editor } from './pages/Editor';
import { RepoDetail } from './pages/RepoDetail';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

export default function App() {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <ThemeProvider>
      <AuthProvider>
        <SearchProvider>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/repo/:id" element={<RepoDetail />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/learning-path/:courseId" element={<LearningPathPage />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </SearchProvider>
      </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

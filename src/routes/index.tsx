import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import EditQuestionPage from '../pages/EditQuestionPage';
import QuestionPage from '../pages/QuestionPage';
import ResultPage from '../pages/ResultPage';
import RegisterPage from '../pages/RegisterPage';

export function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/questions/add" element={isAuthenticated ? <EditQuestionPage /> : <Navigate to="/login" />} />
      <Route path="/questions" element={isAuthenticated ? <QuestionPage /> : <Navigate to="/login" />} />
      <Route path="/results" element={isAuthenticated ? <ResultPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

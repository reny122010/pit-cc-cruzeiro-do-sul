import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedPage from './templates/ProtectedPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import OccupationArea from './pages/OccupationArea';
import Speciality from './pages/Speciality';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import TaskDetail from './pages/TaskDetail';
import SecurityNote from './pages/SecurityNote';
import SecurityNoteDetail from './pages/SecurityNoteDetail';
import FacilityNote from './pages/FacilityNote';
import FacilityNoteDetail from './pages/FacilityNoteDetail';
import Dashboard from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedPage />}>
          <Route path="/" element={<Home />} />
          <Route path="/manutencao" element={<OccupationArea />} />
          <Route path="/manutencao/:area/" element={<Speciality />} />
          <Route
            path="/manutencao/:area/:speciality/tasks"
            element={<Tasks />}
          />
          <Route
            path="/manutencao/:area/:speciality/tasks/:task"
            element={<TaskDetail />}
          />
          <Route path="/seguranca" element={<SecurityNote />} />
          <Route
            path="/seguranca/:date/:noteId"
            element={<SecurityNoteDetail />}
          />
          <Route path="/facilities" element={<FacilityNote />} />
          <Route
            path="/facilities/:date/:noteId"
            element={<FacilityNoteDetail />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

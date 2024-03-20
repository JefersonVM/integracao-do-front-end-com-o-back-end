import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import SignIn from './pages/SignIn';

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path='/main' element={<Main />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
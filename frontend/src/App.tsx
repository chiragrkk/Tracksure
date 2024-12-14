import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@routes/ProtectedRoute';
import routes from '@routes/RoutesConfig';
import HomePage from '@pages/Home/HomePage';
import SignUp from '@pages/Home/SignUp';
import SignIn from '@pages/Home/SignIn';
import { ThemeProvider } from '@components/common/ThemeProvider';
import { Toaster } from "react-hot-toast";



const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="top-right" />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute element={route.element} roles={route.roles} />}
          />
        ))}
      </Routes>
    </ThemeProvider>
  );
};

export default App;

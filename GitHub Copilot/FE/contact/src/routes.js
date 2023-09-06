import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
import ContactList from './pages/Contact/ContactList';
import Page404 from './pages/Page404';
import ContactCreate from './pages/Contact/ContactCreate';
import ContactDetails from './pages/Contact/ContactDetails';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/contact-list" />, index: true },
        { path: 'contact-list', element: <ContactList /> },
        { path: 'contact-create', element: <ContactCreate /> },
        { path: 'contact-detail', element: <ContactDetails /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/contact-list" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

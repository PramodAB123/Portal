import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import OnBoarding from './pages/OnBoarding'
import JobListing from './pages/joblisting'
import Job from './pages/Job'
import MyJob from './pages/MyJob'
import PostJob from './pages/PostJob'
import SavedJobs from './pages/SavedJobs'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/ProtectedRoute'
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/onboarding',
        element: <ProtectedRoute><OnBoarding /></ProtectedRoute>
      },
      {
        path: '/joblisting',
        element: <ProtectedRoute><JobListing /></ProtectedRoute>
      },
      {
        path: '/job/:id',
        element: <ProtectedRoute><Job /></ProtectedRoute>
      },
      {
        path: '/myjob',
        element: <ProtectedRoute><MyJob /></ProtectedRoute>
      },
      {
        path: '/postjob',
        element: <ProtectedRoute><PostJob /></ProtectedRoute>
      },
      {
        path: '/savedjobs',
        element: <ProtectedRoute><SavedJobs /></ProtectedRoute>
      }
    ]

  }
])
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
// import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/app/home" replace />,
  },
  {
    path: "/login",
    element: <Login />,
    index: true,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/verifyemail",
    element: <VerifyOtp />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: <p>Home Page Yet To Build</p>,
      },
      {
        path: "profile",
        element: <p>Profile Page Yet To Build</p>,
      },
      {
        path: "jobs",
        element: <p>Jobs Page Yet To Build</p>,
      },
      {
        path: "saved",
        element: <p>Saved Jobs Page Yet To Build</p>,
      },
      {
        path: "jobsapplied",
        element: <p>Applied Jobs Page Yet To Build</p>,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
};

export default App;

import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { PATH_NAME } from "../constants/pathName";
import MainLayoutTrainer from "../pages/Trainer/MainLayout/MainLayout";
import MainLayoutAdmin from "../pages/Admin/MainLayout/MainLayout"
import TrainerManagement from "../pages/Trainer/TrainerManagementPage/TrainerManagementPage";
import RolePage from "../pages/RolePage/RolePage";
import { useSelector } from "react-redux"; // Import useSelector to access the Redux store
import ScheduleTracker from "../pages/Admin/ScheduleTrackerPage/ScheduleTrackerPage";
import ModuleDetailsPage from "../pages/Trainer/ClassListPage/ModuleDetailsPage";
import TrainerManagementPage from "../pages/Admin/TrainerManagement/TrainerManagementPage";

const PrivateRouteTrainer = ({ children }) => {
  const selectedRole = useSelector((state) => state.role.selectedRole); // Access the selected role from the Redux store
  console.log("Selected Role:", selectedRole); // Log selected r
  // If no user found, redirect to RolePage instead of login
  if (!selectedRole) {
    return <Navigate to={PATH_NAME.ROLE} replace />;
  }
  else if (selectedRole === 'trainer') {
    return children;
  }
};

const PrivateRouteAdmin = ({ children }) => {
  const selectedRole = useSelector((state) => state.role.selectedRole);
  console.log("Selected Role:", selectedRole);
  if (!selectedRole) {
    return <Navigate to={PATH_NAME.ROLE} replace />;
  }
  else if (selectedRole === 'admin') {
    return children;
  }
};

export const router = createBrowserRouter([
  {
    path: PATH_NAME.TRAINER,
    element: (
      <PrivateRouteTrainer>
        <MainLayoutTrainer />
      </PrivateRouteTrainer>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH_NAME.Trainer_Management,
        element: <TrainerManagement />,
      },
      {
        path: PATH_NAME.MODULE_DETAILS, // Add this new route
        element: <ModuleDetailsPage />,
      },
    ],
  },
  {
    path: PATH_NAME.ADMIN,
    element: (
      <PrivateRouteAdmin>
        <MainLayoutAdmin />
      </PrivateRouteAdmin>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: PATH_NAME.SCHEDULE_TRACKER,
        element: <ScheduleTracker />,
      },{
        path: "/admin/trainer_management",
        element: <TrainerManagementPage />,
      }
    ],
  },
  {
    path: PATH_NAME.ROLE,
    element: <RolePage />,
  },
  {
    path: PATH_NAME.HOME,
    element: <RolePage />,
  },
  {
    path: PATH_NAME.ERROR_404,
    element: <ErrorPage />,
  },
]);

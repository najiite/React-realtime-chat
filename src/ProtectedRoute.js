import { Navigate,Outlet } from "react-router-dom";
import { useAuth } from "./userContext";

export const ProtectedRoute = ({children }) => {
    const { user } = useAuth()
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />
  }
  return <Outlet/>
};
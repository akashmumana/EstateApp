
import { useSelector } from "react-redux" 
import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Outlet></Outlet>: <Navigate to ="/signin"></Navigate>
}

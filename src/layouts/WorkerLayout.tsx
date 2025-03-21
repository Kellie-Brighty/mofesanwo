import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export default function WorkerLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

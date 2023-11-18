import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import FullPageLoader from "../components/FullPageLoader";

import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import Page404 from "../pages/page404";
import FilesForm from "../features/manager/FilesForm";

const Dashboard = lazy(() => import("../features/user/Dashboard"));

function AppRouter() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Navigate replace to="home" />} />
            <Route path="home" element={<Home />} />
            <Route path="noon" element={<Dashboard route={"noon"} />} />
            <Route path="evening" element={<Dashboard route={"evening"} />} />
            <Route
              path="noon/:floorNum"
              element={<Dashboard route={"noon"} />}
            />
            <Route
              path="evening/:floorNum"
              element={<Dashboard route={"evening"} />}
            />
            <Route path="tasks" element={<Dashboard route={"tasks"} />} />
            <Route path="upload" element={<FilesForm />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default AppRouter;

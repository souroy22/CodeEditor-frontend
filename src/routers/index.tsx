import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import FallBack from "../components/FallBack";
import AuthWrapper from "../layouts/auth";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
const LazyPublicRoute = lazy(() => import("../layouts/publicRoute"));
const LazyPrivateRoute = lazy(() => import("../layouts/privateRoute"));
const LazyHome = lazy(() => import("../pages/home"));
const LazyProfile = lazy(() => import("../pages/profile"));
const LazyEditor = lazy(() => import("../pages/editor"));
const LazyRooms = lazy(() => import("../pages/rooms"));

const RouterComponent = () => {
  return (
    <Suspense fallback={<FallBack />}>
      <Routes>
        <Route element={<LazyPublicRoute />}>
          <Route element={<AuthWrapper />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>
        <Route element={<LazyPrivateRoute />}>
          <Route path="/" element={<LazyHome />} />
          <Route path="/profile" element={<LazyProfile />} />
          <Route path="/room/:slug" element={<LazyEditor />} />
          <Route path="/rooms" element={<LazyRooms />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RouterComponent;

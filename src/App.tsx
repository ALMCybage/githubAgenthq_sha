import { lazy, Suspense, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./components/Loading";
import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import PrivateRouter from "./PrivateRoute";
import { logout, refreshToken } from "./redux/features/authSlice";
import { AppDispatch, RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));


const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const Profile = lazy(() => import("./pages/Profile"));
const MessagesDirect = lazy(() => import("./pages/MessagesDirect"));
const Messages = lazy(() => import("./pages/Messages"));

const Post = lazy(() => import("./pages/Post"));


function App() {
  const dispatch: AppDispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state);
  const { message } = auth;
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (message === "auth/refresh-token An error occurred.") {
      dispatch(logout());
    }
  }, [dispatch, message]);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route
                index
                element={
                  <PrivateRouter>
                    <Home />
                  </PrivateRouter>
                }
              />

              <Route path="/:username" element={<Profile />} />

              <Route path="/explore" element={<Explore />} />

              <Route path="/direct/inbox" element={<MessagesDirect />} />
              <Route path="/direct/:id" element={<Messages />} />

              <Route path="/:username/:id" element={<Post />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;

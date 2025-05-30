import Layout from "@layout/Layout";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "@pages/main/Main";
import Camera from "@pages/camera/Camera";
import CameraResult from "@pages/camera/CameraResult";
import Clothes from "@pages/clothes/Clothes";
import Onboarding from "@pages/Onboarding/Onboarding";
import Login from "@pages/login/Login";
import Register from "@pages/register/Register";
import Post from "@pages/post/Post";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboard" element={<Onboarding />} />
            <Route path="/clothes" element={<Clothes />} />
            <Route path="/post" element={<Post />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/camera/result" element={<CameraResult />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

import Layout from "@layout/Layout";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "@pages/main/Main";
import Camera from "@pages/camera/Camera";
import CameraResult from "@pages/camera/CameraResult";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/camera/result" element={<CameraResult />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

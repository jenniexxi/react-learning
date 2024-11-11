import Layout from "@layouts/Layout";
import Login from "@pages/Login/Login";
import Signup from "@pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<></>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;

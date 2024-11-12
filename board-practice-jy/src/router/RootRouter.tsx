import Layout from "@layouts/Layout";
import Login from "@pages/Login/Login";
import Signup from "@pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const RootRouter = () => {
  // const token = getCookie("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* {token ? (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<></>} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </>
        )} */}
      </Routes>

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

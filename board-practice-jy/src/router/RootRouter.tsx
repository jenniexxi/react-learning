import Layout from "@layouts/Layout";
import BoardDetail from "@pages/BoardDetail/BoardDetail";
import BoardList from "@pages/BoardList/BoardList";
import BoardWrite from "@pages/BoardWrite/BoardWrite";
import Login from "@pages/Login/Login";
import Signup from "@pages/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const RootRouter = () => {
  // const token = getCookie("token");

  return (
    <BrowserRouter>
      {/* <Routes>
        {token ? (
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
        )}
      </Routes> */}

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BoardList />} />
          <Route path="/detail/:id" element={<BoardDetail />} />
          <Route path="/write" element={<BoardWrite />} />
          <Route path="/modify" element={<BoardWrite />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRouter;

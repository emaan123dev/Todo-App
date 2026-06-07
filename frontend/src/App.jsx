import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./Pages/SignUp";
import Signin from "./Pages/SignIn";
import AddTask from "./Pages/AddTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SignUp" element={<Signup />} />
      <Route path="/SignIn" element={<Signin />} />
      <Route path="/AddTask" element={<AddTask />} />
    </Routes>
  );
}

export default App;
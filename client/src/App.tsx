import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import JoinUs from "./pages/JoinUs";
import Profile from "./pages/Profile";
import NewCourse from "./pages/NewCourse";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import MyProfile from "./pages/MyProfile";
import Enrollment from "./pages/Enrollment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
      </Routes>
      <Routes>
          <Route path="register" element={<Register />} />
      </Routes>
      <Routes>
        <Route path="login" element={<Login />}/>
      </Routes>
      <Routes>
        <Route path="become-a-tutor" element={<JoinUs />}/>
      </Routes>
      <Routes>
        <Route path="my-profile" element={<MyProfile />}/>
      </Routes>
      <Routes>
        <Route path="profile/:userId" element={<Profile />}/>
      </Routes>
      <Routes>
        <Route path="new-course" element={<NewCourse />}/>
      </Routes>
      <Routes>
        <Route path="course/:courseId" element={<Course />}/>
      </Routes>
      <Routes>
        <Route path="courses" element={<Courses />}/>
      </Routes>
      <Routes>
        <Route path="enrollment/:courseId" element={<Enrollment />}/>
      </Routes>
    </BrowserRouter>
  )

}

export default App

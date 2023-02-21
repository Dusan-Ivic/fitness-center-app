import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import OwnerDashboardPage from "./pages/DashboardPage/OwnerDashboardPage";
import FitnessCenterPage from "./pages/FitnessCenterPage/FitnessCenterPage";
import CreateFitnessCenterPage from "./pages/CreateFitnessCenterPage/CreateFitnessCenterPage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOwnedCenters, reset } from "./features/centers/centersSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user && user.role === "owner") {
      dispatch(getOwnedCenters(user._id)).then((res) => dispatch(reset()));
    }
  }, [user, dispatch]);

  return (
    <>
      <Router>
        <Header />
        <ToastContainer style={{ width: "400px" }} />
        <Container className="mt-3">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route
              path="/dashboard"
              element={
                user && user.role === "owner" ? <OwnerDashboardPage /> : null
              }
            />
            <Route
              path="/centers/create"
              element={<CreateFitnessCenterPage />}
            />
            <Route path="/centers/:id" element={<FitnessCenterPage />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage/HomePage";
import RegisterTrainerPage from "./pages/RegisterTrainerPage/RegisterTrainerPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import OwnerDashboardPage from "./pages/DashboardPage/OwnerDashboardPage";
import FitnessCenterPage from "./pages/FitnessCenterPage/FitnessCenterPage";
import CreateFitnessCenterPage from "./pages/CreateFitnessCenterPage/CreateFitnessCenterPage";
import EditFitnessCenterPage from "./pages/EditFitnessCenterPage/EditFitnessCenterPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import CreateTrainingPage from "./pages/CreateTrainingPage/CreateTrainingPage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOwnedCenters, centersSlice } from "./features/centers/centersSlice";
import {
  getEmployedTrainers,
  trainersSlice,
} from "./features/trainers/trainersSlice";
import {
  getCreatedTrainings,
  trainingsSlice,
} from "./features/trainings/trainingsSlice";
import TrainerDashboardPage from "./pages/DashboardPage/TrainerDashboardPage";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user) {
      if (user.role === "owner") {
        dispatch(getOwnedCenters(user._id)).then(() => {
          dispatch(centersSlice.actions.reset());
          dispatch(getEmployedTrainers()).then(() => {
            dispatch(trainersSlice.actions.reset());
          });
        });
      } else if (user.role === "trainer") {
        dispatch(getCreatedTrainings(user._id)).then(() => {
          dispatch(trainingsSlice.actions.reset());
        });
      }
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
            <Route path="/register/trainer" element={<RegisterTrainerPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route
              path="/dashboard"
              element={
                user ? (
                  user.role === "owner" ? (
                    <OwnerDashboardPage />
                  ) : user.role === "trainer" ? (
                    <TrainerDashboardPage />
                  ) : null
                ) : null
              }
            />
            <Route
              path="/centers/create"
              element={<CreateFitnessCenterPage />}
            />
            <Route
              path="/centers/:id/edit"
              element={<EditFitnessCenterPage />}
            />
            <Route path="/centers/:id" element={<FitnessCenterPage />} />
            <Route path="/trainings/create" element={<CreateTrainingPage />} />
            <Route path="/trainings/:id" element={<TrainingPage />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;

import { HomePage, LoginPage } from "./pages"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./services/AuthContex"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

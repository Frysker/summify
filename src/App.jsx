import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DocumentProvider } from "./context/DocumentContext";
import { ThemeProvider } from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import OriginalPage from "./pages/OriginalPage";
import SummarizedPage from "./pages/SummarizedPage";
import GraphPage from "./pages/GraphPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <DocumentProvider>
          <Routes>
            {/* Auth */}
            <Route path="/sign-in"        element={<SignIn />} />
            <Route path="/sign-up"        element={<SignUp />} />

            {/* App */}
            <Route path="/app/home"       element={<HomePage />} />
            <Route path="/app/original"   element={<OriginalPage />} />
            <Route path="/app/summarized" element={<SummarizedPage />} />
            <Route path="/app/graph"      element={<GraphPage />} />
            <Route path="/app/history"    element={<HistoryPage />} />
            <Route path="/app/profile"    element={<ProfilePage />} />
            <Route path="/app/settings"   element={<ProfilePage />} />

            {/* Default redirect */}
            <Route path="/app"            element={<Navigate to="/app/home" replace />} />
            <Route path="*"               element={<Navigate to="/sign-in" replace />} />
          </Routes>
        </DocumentProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

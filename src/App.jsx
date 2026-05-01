import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DocumentProvider } from "./context/DocumentContext";
import { ThemeProvider } from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import OriginalPage from "./pages/OriginalPage";
import SummarizedPage from "./pages/SummarizedPage";
import GraphPage from "./pages/GraphPage";
import SettingsPage from "./pages/SettingsPage";

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
            <Route path="/app/original"   element={<OriginalPage />} />
            <Route path="/app/summarized" element={<SummarizedPage />} />
            <Route path="/app/graph"      element={<GraphPage />} />
            <Route path="/app/settings"   element={<SettingsPage />} />

            {/* Default redirect */}
            <Route path="/app"            element={<Navigate to="/app/original" replace />} />
            <Route path="*"               element={<Navigate to="/sign-in" replace />} />
          </Routes>
        </DocumentProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
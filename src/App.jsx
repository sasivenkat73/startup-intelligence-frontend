import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StartupDetailPage from "./pages/StartupDetailPage"; // Adjust the file path if needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Landing Route: Displays your funding rounds table dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Dynamic Detail Route: Captures the clicked startup name in the URL */}
        <Route path="/startup/:name" element={<StartupDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstPage from "./pages/FirstPage";
import SecondPage from "./pages/SecondPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/second-page" element={<SecondPage />} />
    </Routes>
  );
};

export default App;

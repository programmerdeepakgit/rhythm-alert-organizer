import { Routes, Route } from "react-router-dom";
import { RhythmApp } from "@/components/RhythmApp";
import { Customize } from "./Customize";

const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<RhythmApp />} />
      <Route path="/customize" element={<Customize />} />
    </Routes>
  );
};

export default Index;

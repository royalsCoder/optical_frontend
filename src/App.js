import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import Invoice from "./components/Invoice";
import LocalInvice from "./components/LocalInvice";
import MonthlyIncome from "./components/MonthlyIncome";
import Login from "./components/Login";
import { AuthProvider } from "./components/auth";
import Stock from "./components/Stock";
import YearComplete from "./components/YearComplete";
import LastStock from "./components/LastStock";
import BirthdayCard from "./components/BirthdayCard";

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/stock" element={<Stock />}></Route>
        <Route path="/birthday" element={<BirthdayCard />}></Route>
        <Route path="/lastStock" element={<LastStock />}></Route>
        <Route path="/yearComplete" element={<YearComplete />}></Route>
        <Route path="/monthlyIncome" element={<MonthlyIncome />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/view/:id" element={<Details />}></Route>
        <Route path="/invice/:id" element={<Invoice />}></Route>
        <Route path="/invice1/:id" element={<LocalInvice />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

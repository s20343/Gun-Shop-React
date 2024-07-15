import Header from './components/fragments/Header';
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import {Routes, Route} from 'react-router-dom';
import CustomerList from "./components/customer/CustomerList";
import CustomerDetails from "./components/customer/CustomerDetails";
import CustomerForm from "./components/customer/CustomerForm";
import AppointmentList from "./components/appointment/AppointmentList"
import AppointmentDetails from "./components/appointment/AppointmentDetails";
import AppointmentForm from "./components/appointment/AppointmentForm";
import GunSellerList from "./components/gunSeller/GunSellerList";
import GunSellerDetails from "./components/gunSeller/GunSellerDetails";
import GunSellerForm from "./components/gunSeller/GunSellerForm";
import {useState} from "react";
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from "./components/other/ProtectedRoute";

function App() {
const [user, setUser] = useState()
    const handleLogin = (user) => {
    localStorage.setItem('user', user)
        setUser(user)
        console.log(localStorage.getItem('user'))
    }
    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(undefined)
        console.log(localStorage.getItem('user'))
    }
  return (
      <>
        <Header />
        <Navigation handleLogout={handleLogout}/>
        <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="customers">
                <Route index={true} element={<CustomerList/>} />
                <Route path="details/:cusId" element={<CustomerDetails />} />
                <Route path="add" element= {<ProtectedRoute><CustomerForm /></ProtectedRoute>}/>
                <Route path="edit/:cusId" element={<CustomerForm />} />
            </Route>
            <Route path="appointments">
                <Route index={true} element={<AppointmentList /> } />
                <Route path="details/:appointmentId" element={<AppointmentDetails />} />
                <Route path="add" element={<AppointmentForm />} />
                <Route path="edit/:appointmentId" element={<AppointmentForm />} />
            </Route>
            <Route path="gunSellers">
                <Route index={true} element={<GunSellerList />} />
                <Route path="details/:gunId" element={<GunSellerDetails />} />
                <Route path="add" element={<GunSellerForm />} />
                <Route path="edit/:gunId" element={<GunSellerForm />} />
            </Route>
            <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} ></Route>
        </Routes>
        <Footer />
      </>
  );
}

export default App;

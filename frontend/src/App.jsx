import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import BookingCTA from './components/BookingCTA';
import Footer from './components/Footer';

import ServicesPackages from './pages/ServicesPackages';
import AdminDashboard from './pages/AdminDashboard';
import AdminServices from './pages/AdminServices';
import AdminPackages from './pages/AdminPackages';
import Booking from './pages/Booking';
import Login from './pages/Login'

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Gallery />
        <WhyChooseUs />
        <Testimonials />
        <BookingCTA />
      </main>

      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Services & Packages */}
        <Route
          path="/services"
          element={
            <>
              <Navbar />
              <ServicesPackages />
              <Footer />
            </>
          }
        />

        {/*Booking*/}
        <Route
          path="/booking"
          element={<Booking/>}
        />



        {/*Admin Dashboard*/}
        <Route
          path="/admin"
          element={<AdminDashboard/>}/>

        {/*Admin Services*/}
        <Route 
          path="/admin/services"
          element={<AdminServices/>}/>

        <Route 
          path="/admin/packages" element = {<AdminPackages/>}/>

        <Route
          path="/login" element = {<Login/>}/>
        
        

      </Routes>

    </BrowserRouter>
  );
}

export default App;
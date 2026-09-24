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

      </Routes>

    </BrowserRouter>
  );
}

export default App;
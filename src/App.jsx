import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, useState } from 'react';
import Contact from './pages/Contact/Contact';
import AllProducts from './pages/AllProducts/AllProducts';
import About from './pages/About/About';
import Whishlist from './pages/Whishlist/Whishlist';
import Cart from './pages/Cart/Cart';
import Loading from './components/Loading';
import Dashboard from './pages/dashboeard/Dashboard';
const Navbar = lazy(() => import("./components/Navbar"))
const Home = lazy(() => import("./pages/Home/Home"))
const Auth = lazy(() => import("./pages/Auth/Auth"))
const ProductDetails = lazy(() => import("./pages/ProductDetails/ProductDetails"))
const NotFound = lazy(() => import("./pages/Notfound/NotFound"))
const Footer = lazy(() => import("./components/Footer"))
function App() {
  const [navappear, setnavappear] = useState(true);
  const [footerappear, setfooterappear] = useState(true);
  const [loading, setloading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  useEffect(() => {
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 3000);
  }, [])


  return (
    <>
      {loading
        ?
        <Loading />
        :
        <Suspense
          fallback={
            <Loading />
          }
        >
          {navappear && (
            <Navbar />
          )}
          <Routes>
            {["/", "home"].map((x, ind) => (
              <Route path={x} key={ind} element={<Home />} />
            ))}
            <Route path='auth' element={<Auth showNav={setnavappear} showFooter={setfooterappear} />} />
            <Route path='productDetails/:id' element={<ProductDetails />} />
            <Route path='allProducts' element={<AllProducts />} />
            <Route path='contact' element={<Contact />} />
            <Route path='about' element={<About />} />
            <Route path='favourite' element={<Whishlist />} />
            <Route path='dashboard/*' element={<Dashboard showNav={setnavappear} showFooter={setfooterappear} />} />
            <Route path='cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {footerappear && (
            <Footer />
          )}
          {showScrollTop ?
            <button className="scrollTop" onClick={scrollToTop}>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" /></svg>
            </button>
            : ''}
        </Suspense>
      }
    </>

  );
}

export default App;

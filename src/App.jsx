import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { lazy, useState } from 'react';
import Contact from './pages/Contact/Contact';
import AllProducts from './pages/AllProducts/AllProducts';
import About from './pages/About/About';
import Whishlist from './pages/Whishlist/Whishlist';
import Cart from './pages/Cart/Cart';
import Loading from './components/Loading';
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
            <Route path='cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {footerappear && (
            <Footer />
          )}
        </Suspense>
      }
    </>

  );
}

export default App;

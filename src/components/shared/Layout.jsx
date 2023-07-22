import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="App container position-relative mt-5 pt-4">
        <Outlet />
        <ToastContainer />
      </main>
      <footer className="bg-secondary bg-opacity-50 mt-5 pb-5">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;

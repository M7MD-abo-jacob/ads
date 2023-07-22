import { Routes, Route } from 'react-router-dom';
import Unauthorized from './pages/Unauthorized';
import PageNotFound from './pages/PageNotFound';
import Layout from './components/shared/Layout';
import LoginPage from './pages/Login';
import RequireAuth from './components/shared/RequireAuth';
import Home from './pages/Home';
import { setUser } from './store/slices/userSlice';
import { useDispatch } from 'react-redux';
import AdsPage from './pages/ads/Ads';
import CreateNewAd from './pages/ads/CreateNewAd';
import EditAd from './pages/ads/EditAd';
import roles from './data/roles.json';
// add roles as nessessary to the roles.json file

function App() {
  // TODO: user data is stored in sessionStorage
  // if you want to change it, change login.jsx
  const dispatch = useDispatch();
  const sessionUser = JSON.parse(sessionStorage.getItem('user'));
  if (sessionUser) {
    dispatch(setUser(sessionUser));
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* ==================== PUBLIC ROUTES ==================== */}
        <Route path="login" element={<LoginPage />} />

        <Route path="unauthorized" element={<Unauthorized />} />

        {/* ==================== PROTECTED ROUTES ==================== */}
        <Route element={<RequireAuth allowedRoles={[roles.admin]} />}>
          <Route path="ads" element={<AdsPage />} />
          <Route path="ads/new" element={<CreateNewAd />} />
          <Route path="ads/edit/:id" element={<EditAd />} />
        </Route>

        <Route path="/" element={<Home />} />

        {/* ==================== CATCH ALL ==================== */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

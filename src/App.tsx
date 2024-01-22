import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import Layout from './components/Layout/Layout';
import Dishes from './containers/Dishes/Dishes';
import NewDish from './containers/NewDish/NewDish';
import EditDish from './containers/EditDish/EditDish';
import { setAdmin } from './store/admin/adminSlice';
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === '/admin/dishes' || pathname === '/admin/orders' || pathname === '/admin/edit-dish/:id') {
      dispatch(setAdmin(true));
    }
  }, [pathname, dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin/dishes" element={<Dishes />} />
        <Route path="/admin/orders" element={<Orders/>} />
        <Route path="/admin/new-dish" element={<NewDish />} />
        <Route path="/admin/edit-dish/:id" element={<EditDish />} />
        <Route path="*" element={'Not found'} />
      </Routes>
    </Layout>
  );
};

export default App;
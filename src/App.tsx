import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={'Home'}/>
        <Route path="/admin/dishes" element={'Dishes'}/>
        <Route path="/admin/orders" element={'Orders'}/>
        <Route path="/admin/new-dish" element={'New Dish Form'}/>
        <Route path="/admin/edit-dish/:id" element={'Edit Dish Form'}/>
        <Route path="*" element={'Not found'}/>
      </Routes>
    </Layout>
  );
};

export default App;
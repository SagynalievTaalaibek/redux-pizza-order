import { Link } from 'react-router-dom';

const Dishes = () => {
  return (
    <>
      <div className="d-flex justify-content-between mb-2">
        <h3>Dishes</h3>
        <Link to={'/admin/new-dish'} className="btn btn-primary">Add new Dish</Link>
      </div>
    </>
  );
};

export default Dishes;
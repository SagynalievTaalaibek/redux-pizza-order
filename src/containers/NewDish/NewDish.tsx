import DishForm from '../../components/DIshForm/DishForm';

const NewDish = () => {
  return (
    <>
      <h4>New Dish</h4>
      <div className="row-cols-1 row-cols-lg-2">
        <div className="col">
          <DishForm />
        </div>
      </div>
    </>
  );
};

export default NewDish;
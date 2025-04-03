import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../../api/utils";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import useAuth from "./../../../hooks/useAuth";

const AddPlant = () => {
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseFloat(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);
    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    };
    // create plant data object
    const planData = {
      name,
      category,
      description,
      price,
      quantity,
      imageUrl,
      seller,
    };
    console.table(planData);
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddPlant;

import { Helmet } from "react-helmet-async";
import { imageUpload } from "../../../api/utils";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import useAuth from "./../../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure, { axiosSecure } from './../../../hooks/useAxiosSecure';
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const [uploadButtonText,setUploadButtonText] = useState('upload image')
  const axiosSecure = useAxiosSecure()
  const [loading,setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
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
    try{
    await axiosSecure.post('/plants', planData)
    toast.success('data Added Successfully')

    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm uploadButtonText={uploadButtonText} handleSubmit={handleSubmit} setUploadButtonText={setUploadButtonText} />
    </div>
  );
};

export default AddPlant;

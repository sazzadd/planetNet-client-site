import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'

const AddPlant = () => {
  const handleSubmit = async e =>{
    e.preventDefault()
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit}/>
    </div>
  )
}

export default AddPlant

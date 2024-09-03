import { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../Providers/AuthProviders';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTouristsSports = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleAddSpot = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const location = form.location.value;
        const details = form.details.value;
        const price = form.price.value;
        const image = form.photo.value;
        const country = form.country.value;
        const seasonality = form.seasonality.value;
        const travel = form.travel.value;
        const visitor = form.visitor.value;
        const email = user.email; // Ensure `user` is defined and has `email`

        const newPlace = { name, location, details, price, image, country, seasonality, travel, visitor, email };
        console.log(newPlace);

        try {
            const response = await axios.post('https://tourism-management-server-dun.vercel.app/addTour', newPlace);

            console.log(response.data);

            if (response.data.insertedId) {
                navigate('/mySpot')
                Swal.fire({
                    title: 'Success!',
                    text: 'Place added successfully',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className=' flex justify-center'>
            <form className='bg-gray-100 p-10 rounded-md mt-5' onSubmit={handleAddSpot}>
                {/* name and location */}
                <div className="md:flex mb-4 gap-3 " >
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <label className="input-group ">
                            <input required type="text" name="name" placeholder="Name" className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900' />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="location" placeholder="Location" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>
                </div>
                {/* country name and seasonality */}
                <div className="md:flex mb-4 gap-3" >
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Country Name</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="country" placeholder="Country" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Seasonality</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="seasonality" placeholder="Seasonality" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>
                </div>
                {/* imag and price */}
                <div className="md:flex mb-4 gap-3">


                    <div className="form-control w-full md:w-1/2">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>


                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="price" placeholder="Price" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>
                </div>
                {/*  travel_time  total visitor par year */}
                <div className="md:flex mb-4 gap-3">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Travel Time</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="travel" placeholder="Travel Time" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Visitor Per Year</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" name="visitor" placeholder="Visitro Per Year" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>
                </div>
                {/* photo and submit */}
                <div className="form-control mb-10">
                    <label className="label">
                        <span className="label-text">Short description</span>
                    </label>
                    <label className="input-group">
                        <textarea required type="text" name="details" placeholder="Description" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" ></textarea>
                    </label>
                </div>
                <input type="submit" value="Save & Continue" className="bg-orange-500 w-full rounded-md py-3 text-white" />
            </form>
        </div>
    );
};

export default AddTouristsSports;
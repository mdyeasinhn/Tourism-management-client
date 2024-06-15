import { useContext } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../Providers/AuthProviders';
const AddTouristsSports = () => {
    const {user} = useContext(AuthContext);

    const handleAddSpot = e =>{
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
        const email = user.email;

        const newPlace = {name, location, details, price, image, country, seasonality, travel, visitor, email}
        console.log(newPlace);
        // send data to the server
        fetch('https://tourism-management-server-dun.vercel.app/addTour',{
            method: "POST",
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newPlace)
        })
        .then(res => res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Placed added successfully',
                    icon: 'success',
                    confirmButtonText: 'Done'
                  })
            }
        })
    }
    return (
        <div>
            <h1 className="text-5xl fonst-bold text-center mb-2 mt-2">Add Tourists Spot</h1>
            <form onSubmit={handleAddSpot}>
                {/* name and location */}
                <div className="md:flex mb-4 gap-3" >
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="location" placeholder="Location" className="input input-bordered w-full" />
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
                            <input type="text" name="country" placeholder="Country" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Seasonality</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="seasonality" placeholder="Seasonality" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* imag and price */}
                <div className="md:flex mb-4 gap-3">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">short description</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="details" placeholder="Description" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="price" placeholder="Price" className="input input-bordered w-full" />
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
                            <input type="text" name="travel" placeholder="Travel Time" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Visitor Per Year</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="visitor" placeholder="Visitro Per Year" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* photo and submit */}
                <div className="mb-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <input type="submit" value="Add place" className="btn btn-block bg-orange-500" />
            </form>
        </div>
    );
};

export default AddTouristsSports;
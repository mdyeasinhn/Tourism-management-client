import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id);
    const [spot, setSpot] = useState({});


    useEffect(() => {
        fetch(`https://tourism-management-server-dun.vercel.app/singleSpot/${id}`)
            .then(res => res.json())
            .then(data => {
                setSpot(data);
                console.log(data);
            })
    }, [id]);
    const handleUpdate = e => {
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

        const info = { name, location, details, price, image, country, seasonality, travel, visitor }
        // console.log(info);
        fetch(`https://tourism-management-server-dun.vercel.app/update/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    navigate('/mySpot')
                    Swal.fire({
                        title: 'Success!',
                        text: 'Spot Updated Successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }
            )

    }
    return (
        <div className=' flex justify-center'>
            <form className='bg-gray-100 p-10 rounded-md mt-5' onSubmit={handleUpdate}>
                {/* name and location */}
                <div className="md:flex mb-4 gap-3 " >
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <label className="input-group ">
                            <input required defaultValue={spot.name} type="text" name="name" placeholder="Name" className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900' />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <label className="input-group">
                            <input required defaultValue={spot.location} type="text" name="location" placeholder="Location" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
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
                            <input required defaultValue={spot.country} type="text" name="country" placeholder="Country" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Seasonality</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" defaultValue={spot.seasonality} name="seasonality" placeholder="Seasonality" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
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
                            <input required type="text" defaultValue={spot.image} name="photo" placeholder="Photo URL" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>


                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <input required defaultValue={spot.price} type="text" name="price" placeholder="Price" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
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
                            <input required defaultValue={spot.travel} type="text" name="travel" placeholder="Travel Time" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Visitor Per Year</span>
                        </label>
                        <label className="input-group">
                            <input required type="text" defaultValue={spot.visitor} name="visitor" placeholder="Visitro Per Year" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                        </label>
                    </div>
                </div>
                {/* photo and submit */}
                <div className="form-control mb-10">
                    <label className="label">
                        <span className="label-text">short description</span>
                    </label>
                    <label className="input-group">
                        <input required type="text" defaultValue={spot.details} name="details" placeholder="Description" className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500  text-gray-900" />
                    </label>
                </div>
                <input type="submit" value="Update & Continue" className="bg-orange-500 w-full rounded-md py-3 text-white" />
            </form>
        </div>
    );
};

export default Update;
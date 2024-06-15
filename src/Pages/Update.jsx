import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
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

        const info = {name, location, details, price, image, country, seasonality, travel, visitor}
        // console.log(info);
        fetch(`https://tourism-management-server-dun.vercel.app/update/${id}`,{
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(info)

        })
        .then(res => res.json())
        .then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                Swal.fire({
                    title: 'Success!',
                    text: 'Spot Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Done'
                  })
            }
        })

    }
    return (
        <div>
            <h1 className="text-5xl fonst-bold text-center mb-2 mt-2">Update Tourists Spot</h1>
            <form onSubmit={handleUpdate}>
                {/* name and location */}
                <div className="md:flex mb-4 gap-3" >
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text"> Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" placeholder="Name" className="input input-bordered w-full" defaultValue={spot.name} />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="location" placeholder="Location" className="input input-bordered w-full"  defaultValue={spot.location}/>
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
                            <input type="text" name="country" placeholder="Country" className="input input-bordered w-full" defaultValue={spot.country}/>
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Seasonality</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="seasonality" placeholder="Seasonality" className="input input-bordered w-full" defaultValue={spot.seasonality} />
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
                            <input type="text" name="details" placeholder="Description" className="input input-bordered w-full" defaultValue={spot.image} />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="price" placeholder="Price" className="input input-bordered w-full" defaultValue={spot.price} />
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
                            <input type="text" name="travel" placeholder="Travel Time" className="input input-bordered w-full" defaultValue={spot.travel} />
                        </label>
                    </div>

                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Visitor Per Year</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="visitor" placeholder="Visitro Per Year" className="input input-bordered w-full" defaultValue={spot.visitor} />
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
                            <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" defaultValue={spot.image} />
                        </label>
                    </div>
                </div>
                <input type="submit" value="Update Spot" className="btn btn-block bg-orange-500" />
            </form>
        </div>
    );
};

export default Update;
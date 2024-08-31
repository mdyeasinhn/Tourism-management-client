import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MySpot = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState([]);
    const [control, setControl] = useState(false);
    console.log(control);

    useEffect(() => {
        axios.get(`https://tourism-management-server-dun.vercel.app/mySpot/${user?.email}`)
            .then(response => {
                setItem(response.data);
            })
          
    }, [user, control]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this spot!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`https://tourism-management-server-dun.vercel.app/delete/${id}`);

                if (response.data.deletedCount > 0) {
                    setControl(!control);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your spot has been deleted.",
                        icon: "success"
                    });
                }
            } catch (error) {
                console.error("Error deleting spot:", error);
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                });
            }
        }
    };
    return (
        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 '>
            {
                item?.map(spot => (
                    <div key={spot._id}  >


                        <div className="card bg-base-100 w-96 shadow-xl">
                            <figure>
                                <img
                                    className='h-[400px]'
                                    src={spot.image}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body  bg-gray-200 rounded-b-xl">
                                <h2 className="card-title">{spot.name}</h2>
                                <p>{spot.details}</p>
                                <div className="card-actions justify-between ">
                                    <p>Cost : $ {spot.price}</p>
                                    <p>country :  {spot.country}</p>
                                </div>
                                <div className="card-actions justify-between mt-4">
                                    <Link to={`/update/${spot._id}`}> <button className="btn bg-orange-500 btn-sm">Update</button></Link>
                                 
                                        <button onClick={() => handleDelete(spot._id)} className="btn btn-sm bg-red-600">Delete</button>
                                  

                                </div>
                            </div>
                        </div>












                    </div>
                ))
            }
        </div>
    );
};

export default MySpot;



// fetch(`https://tourism-management-server-dun.vercel.app/delete/${id}`, {
//     method: 'DELETE'
// })
//     .then(res => res.json())
//     .then(data => {
//         if (data.deletedCount > 0){
//             setControl(!control)
//             Swal.fire({
//                 title: "Deleted!",
//                 text: "Your spot has been deleted.",
//                 icon: "success"
//             });
//         }
// })
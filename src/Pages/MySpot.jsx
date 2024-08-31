import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const MySpot = () => {
    const { user } = useContext(AuthContext);
    const [item, setItem] = useState([]);
    const [control, setControl] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:5000/mySpot/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setItem(data)
            })
    }, [user, control])

    const handleDelete = id => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setControl(!control)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your spot has been deleted.",
                        icon: "success"
                    });
                }
            })

    }
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
                            <div className="card-body mt-2">
                                <h2 className="card-title">{spot.name}</h2>
                                <p>{spot.details}</p>
                              <div className="card-actions justify-between ">
                              <p>Cost : $ {spot.price}</p>
                                    <p>country :  {spot.country}</p>
                              </div>
                                <div className="card-actions justify-between mt-4">
                                <Link to={`/update/${spot._id}`}> <button className="btn bg-orange-500 btn-sm">Update</button></Link>
                                    <Link to={`/spot/${spot._id}`}>
                                    <button  onClick={() => handleDelete(spot._id)} className="btn btn-sm bg-red-600">Delete</button>
                                    </Link>

                                </div>
                            </div>
                        </div>











                        {/* <div className="card card-side bg-base-100">
                            <figure><img className="w-[500px] h-[400px]" src={spot.image} alt="Movie" /></figure>

                        </div>
                        <div className="card-body">
                            <h2 className="card-title">Name : {spot.name}!</h2>
                            <p>Details :{spot.details}</p>
                            <p> Travel Time : {spot.travel}</p>
                            <p>Visitor per Year : {spot.visitor}</p>
                            <p>Price : {spot.price}</p>

                        </div>
                        <div className="space-y-14 mr-4">
                            <div className="card-actions justify-end mt-14 ">
                                <Link to={`/update/${spot._id}`}> <button className="btn bg-orange-500">Update</button></Link>

                            </div>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleDelete(spot._id)} className="btn bg-red-600">Delete</button>
                            </div>

                        </div> */}
                    </div>
                ))
            }
        </div>
    );
};

export default MySpot;



// fetch(`http://localhost:5000/delete/${id}`, {
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
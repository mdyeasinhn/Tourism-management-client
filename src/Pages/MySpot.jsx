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
                if (data.deletedCount > 0){
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
        <div className=" space-y-4">
            {
                item?.map(spot => (
                    <div key={spot._id} className="flex   shadow-xl" >
                        <div className="card card-side bg-base-100">
                            <figure><img className="w-[500px] " src={spot.image} alt="Movie" /></figure>

                        </div>
                        <div className="card-body">
                            {/* <h2 className="card-title">Name : {spot.name}!</h2>
                            <p>Details :{spot.details}</p>
                            <p> Travel Time : {spot.travel}</p>
                            <p>Visitor per Year : {spot.visitor}</p>
                            <p>Price : {spot.price}</p> */}

                        </div>
                        <div className="space-y-14 mr-4">
                            <div className="card-actions justify-end mt-14 ">
                                <Link to={`/update/${spot._id}`}> <button className="btn bg-orange-500">Update</button></Link>

                            </div>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleDelete(spot._id)} className="btn bg-red-600">Delete</button>
                            </div>

                        </div>
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
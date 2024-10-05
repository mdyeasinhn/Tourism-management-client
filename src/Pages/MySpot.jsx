import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MySpot = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [control, setControl] = useState(false);
    console.log(control);

    useEffect(() => {
        axios.get(`https://tourism-management-server-dun.vercel.app/mySpot/${user?.email}`)
            .then(response => {
                setItems(response.data);
            })

    }, [user, control]);
    console.log(items);
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
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='bg-gray-200 px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Image
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                    Location
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-gray-200   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                       Name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Country
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-gray-200   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Cost
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                         Update
                                       
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-gray-200   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* my list data */}
                                {items.map(item => (
                                    <tr key={item._id}>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <div className='flex items-center'>
                                                <div className='flex-shrink-0'>
                                                    <div className='block relative'>
                                                        <img

                                                            alt='profile'
                                                            src={item?.image}
                                                            className='mx-auto object-cover rounded h-10 w-15'
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <p className='text-gray-900 whitespace-no-wrap'>{item?.location}</p>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <p className='text-gray-900 whitespace-no-wrap'>{item?.name}</p>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <p className='text-gray-900 whitespace-no-wrap'>{item.country}</p>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <p className='text-gray-900 whitespace-no-wrap'>$ {item?.price}</p>
                                        </td>

                                     
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                                <span
                                                    aria-hidden='true'
                                                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                                                ></span>
                                                <Link to={`/update/${item._id}`}  className='relative'>Update</Link>
                                            </span>
                                        </td>
                                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                            <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                                <span
                                                    aria-hidden='true'
                                                    className='absolute inset-0 bg-red-600 opacity-50 rounded-full'
                                                ></span>
                                                <span onClick={() => handleDelete(item._id)} className='relative'>Delete</span>
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MySpot;




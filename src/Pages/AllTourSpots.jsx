import { useEffect, useState } from "react";
import SpotCard from "../Components/SpotCard";
import axios from "axios";
const AllTourSpots = () => {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`https://tourism-management-server-dun.vercel.app/all-spots`);
            setSpots(data);
        }
        getData();
    }, [])
    console.log(spots);
    return (
        <div className="container mx-auto px-4">
            <div className="text-center mt-4">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">All Spots</h1>
            </div>
            <div className='grid grid-cols-1 gap-4 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3'>
                {spots.map(spot => (
                    <SpotCard key={spot._id} spot={spot} />
                ))}
            </div>
        </div>
    );
};

export default AllTourSpots;
import { Link, useLoaderData } from "react-router-dom";
import BookingModal from "../Components/Modal/BookingModal";
import { useState } from "react";


const SpotDetails = () => {
    const spot = useLoaderData();
    const [isOpen, setIsOpen] = useState(false);



    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <div className="flex items-center gap-8 mt-10 borderrounded-md">
            <div>
                <img
                    src={spot.image}
                    className="w-[800px] h-[400px]  rounded-lg " />
            </div>
            < div className="w-1/2 mr-5">
                <div>
                    <h1 className="text-5xl font-bold">{spot.name}</h1>
                    <p className='mt-4 text-2xl'>location :{spot.location} </p>
                    <p className="py-6">
                        {spot.details}
                    </p>
                </div>
                <div className='flex justify-between mt-4 pr-10 '>
                    <h2>Travel : {spot.travel}</h2>
                    <h2>Visitor : {spot.visitor}</h2>
                </div>
                <div className='flex justify-between mt-6 pr-10'>
                    <h2 className='mt-3 font-semibold'>Price : $ {spot.price}</h2>
                    <div>
                        <button  disabled={spot.booked} onClick={() => setIsOpen(true)} className="btn bg-orange-400 btn-sm"> Purchase</button>
                        <BookingModal spot={spot} isOpen={isOpen} closeModal={closeModal}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SpotDetails;
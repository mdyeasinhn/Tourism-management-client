import React from 'react';
import { Link } from 'react-router-dom';

const SpotCard = ({ spot }) => {
    return (
        <div>

            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        className='h-[400px]'
                        src={spot.image}
                        alt="Shoes" />
                </figure>
                <div className="card-body bg-gray-200 rounded-b-xl">
                    <h2 className="card-title">{spot.name}</h2>
                    <p>{spot.details}</p>
                    <p>Cost : $ {spot.price}</p>

                    <div className="card-actions justify-between">
                    <p>country :  {spot.country}</p>
                    <Link to={`/spot/${spot._id}`}>
                    <button className="btn btn-sm bg-orange-400">Details</button>
                    </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpotCard;
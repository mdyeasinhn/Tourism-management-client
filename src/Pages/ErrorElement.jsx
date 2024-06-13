import { Link } from 'react-router-dom';
import errorPic from '../assets/404.png';

const ErrorElement = () => {
    return (
        <div className='bg-gray-200 text-center'>
            <div className=' flex justify-center'>
                <img className='mt-20 mb-10' src={errorPic} alt="" />
            </div>
            <div className='  text-center'>
                <h1 className='text-5xl mb-5 '>That Page Are Not Found</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ullam natus sed laboriosam non ratione facilis atque,<br /> beatae fugiat officia asperiores provident maxime blanditiis pariatur maiores magnam impedit. <br /> Beatae doloribus reiciendis, ducimus enim velit libero.</p>
            </div>
            <div className='mt-4'>
                <Link to='/'><button className='btn   btn-error px-10'>GO TO HOME</button></Link>
            </div>
        </div>
    );
};

export default ErrorElement;
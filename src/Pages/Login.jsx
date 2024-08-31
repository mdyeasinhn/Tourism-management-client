import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc'
import googleLogo from '../assets/google.png'
import Swal from "sweetalert2";
const Login = () => {
    const navigate = useNavigate()
    const { login, googleLogin, githubLogin } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;


        const user = { name, email, password };
        try {
            await login(email, password)
            navigate('/')
            Swal.fire({
                title: "Login Successful",
                text: "You have successfully logged in!",
                icon: "success"
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Login Failed",  // Changed title for error
                text: error.message,
                icon: "error"
            });
        }
    }
    // handle google login

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            navigate('/')

            Swal.fire({
                title: "Login Successful",
                text: "You have successfully logged in!",
                icon: "success"
            });
        } catch (error) {
            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error"
            });
        }
    };
    // handle github login

    const handleGithubLogin = async () => {
        try {
            await githubLogin();
            navigate('/')
            Swal.fire({
                title: "Login Successful",
                text: "You have successfully logged in!",
                icon: "success"
            });
        } catch (error) {
            navigate('/')
            Swal.fire({
                title: "Login Failed",
                text: error.message,
                icon: "error"
            });
        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Login</h1>
                    <p className='text-sm text-gray-400'>
                        Login to access your account
                    </p>
                </div>
                <form
                    onSubmit={handleLogin}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <div className='flex justify-between'>
                                <label htmlFor='password' className='text-sm mb-2'>
                                    Password
                                </label>
                            </div>
                            <input
                                type='password'
                                name='password'
                                autoComplete='current-password'
                                id='password'
                                required
                                placeholder='*******'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-500 bg-gray-200 text-gray-900'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-orange-500 w-full rounded-md py-3 text-white'
                        >
                            Login
                        </button>
                    </div>
                </form>

                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Login with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div
                    onClick={handleGoogleLogin}
                    className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded rounded-md cursor-pointer'>
                    <FcGoogle size={32} />
                    <p>Continue with Google</p>
                </div>
                <div
                    onClick={handleGithubLogin}
                    className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer rounded-md'>
                    <FaGithub size={32} />
                    <p>Continue with Github</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Don&apos;t have an account yet?{' '}
                    <Link
                        to='/register'
                        className='hover:underline hover:text-orange-500 text-gray-600'
                    >
                        Registration
                    </Link>
                    .
                </p>
            </div>
        </div>

    );
};

export default Login;
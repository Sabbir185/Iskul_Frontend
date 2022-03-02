import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const App = ()=>{
    const[loginData, setLoginData] = useState({});
    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        console.log(field,value);
        const newRegistrationData = {...loginData};
        newRegistrationData[field] = value;
    }
    const handleLoginSubmit = e=>{ 
		e.preventDefault();
        console.log(loginData.email, loginData.password);
        
    }
    return(
        <div>
<div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center bg-img">
	<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
	<div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
		<div className="text-center">
			<h2 className="mt-6 text-3xl font-bold text-gray-900">
				Welcom Back!
			</h2>
			<p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
		</div>
		<div className="flex flex-row justify-center items-center space-x-3">
			<span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"><h2>fb</h2></span><span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white  bg-blue-300 hover:shadow-lg cursor-pointer transition ease-in duration-300"> <h2>tw</h2></span>
			<span className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-500 hover:shadow-lg cursor-pointer transition ease-in duration-300"><h2>in</h2></span>
		</div>
		<div className="flex items-center justify-center space-x-2">
			<span className="h-px w-16 bg-gray-300"></span>
			<span className="text-gray-500 font-normal">OR</span>
			<span className="h-px w-16 bg-gray-300"></span>
		</div>
		<form className="mt-8 space-y-6" onChange={handleLoginSubmit}>
			<input type="hidden" name="remember" value="true"/>
			<div className="relative">
				<div className="absolute right-0 mt-4"><svg xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
                </div>
				<label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
				<input className=" w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" name="email" placeholder="mail@gmail.com" onBlur={handleOnBlur}/>
            </div>
			<div className="mt-8 content-center">
				<label className="text-sm font-bold text-gray-700 tracking-wide">
					Password
				</label>
				<input className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="password" placeholder="Enter your password" onBlur={handleOnBlur}/>
            </div>
			<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"/>
						<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
					</div>
				<div className="text-sm">
					<a href="#" className="font-medium text-indigo-500 hover:text-indigo-500">
								Forgot your password?
					</a>
				</div>
			</div>
			<div>
				<button type="submit" className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">Sign in</button>
			</div>
            </form>
			<p classNameName="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
				<span>Donot have an account?</span>
				<Link href="/signup" ><span className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"> Sign up</span></Link>
			</p>
		
	</div>
</div>
        </div>
    )   
}
export default App;
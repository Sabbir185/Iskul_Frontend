import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const App = ()=>{
    const[singUpData, setSignUpData] = useState({});
    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        console.log(field,value);
        const newRegistrationData = {...singUpData};
        newRegistrationData[field] = value;
    }
    const handleSignUpSubmit = e=>{ 
        if (singUpData.password !== singUpData.password2) {
            alert('Your password did not match');
            return
        }
        console.log(singUpData.email, singUpData.password);
        e.preventDefault();
    }
    return(
        <div>
<div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center bg-img">
	<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
	<div className="max-w-md w-full space-y-4 py-6 px-10 bg-white rounded-xl z-10">
		<div className="text-center">
			<h2 className="mt-1 text-3xl font-bold text-gray-900">
				Welcom Back!
			</h2>
			<p className="mt-2 text-sm text-gray-600">Please sign un to your account</p>
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
		<form className="space-y-2" onChange={handleSignUpSubmit}>
			{/* <input type="hidden" name="remember" value="true"/> */}
			<div className="">
				<label className="text-sm font-bold text-gray-700 tracking-wide">User first name</label>
				<input className=" w-full text-base py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="name" name="firstname" placeholder="User First Name" onBlur={handleOnBlur}/>
            </div>
			<div className="">
				<label className="text-sm font-bold text-gray-700 tracking-wide">User last name</label>
				<input className=" w-full text-base py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="name" name="lastname" placeholder="User Last Name" onBlur={handleOnBlur}/>
            </div>
			<div className="">
				<label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
				<input className=" w-full text-base py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="email" name="email" placeholder="mail@gmail.com" onBlur={handleOnBlur}/>
            </div>
			<div className="mt-1 content-center">
				<label className="text-sm font-bold text-gray-700 tracking-wide">
					Password
				</label>
				<input className="w-full content-center text-base py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="password" placeholder="Enter your password" onBlur={handleOnBlur}/>
            </div>
			<div className="mt-1 content-center">
				<label className="text-sm font-bold text-gray-700 tracking-wide">
				Comfirm	Password
				</label>
				<input className="w-full content-center text-base py-1 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" name="password2" placeholder="Enter your password" onBlur={handleOnBlur}/>
            </div>
			<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"/>
						<label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
					</div>
			</div>
			<div>
				<button type="submit" className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">Sign up</button>
			</div>
            </form>
			<p classNameName="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
				<span>Already have an account?</span>
				<Link href="login" ><span className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300"> Sign in</span></Link>
			</p>
		
	</div>
</div>
        </div>
    )   
}
export default App;
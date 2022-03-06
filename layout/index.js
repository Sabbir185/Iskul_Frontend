import { Fragment } from "react";
import Link from 'next/link'

const Layout = (props) => {
    return (
        <>
            <div className="relative">
                <div className="w-0 md:w-64 h-screen fixed mt-0 left-0 top-0 bg-green-300">
                    <ul>
                        <li className="py-2">
                            <Link href="/">
                                <a className="p-4">Dashboard</a>
                            </Link>
                        </li>
                        <li className="py-2">
                            <Link href="/students">
                                <a className="p-4">Students</a>
                            </Link>
                        </li>
                    </ul>



                </div>
                <main className="ml-0 md:ml-64 mt-16 p-4">
                    {props.children}
                </main>

                <div className="h-16 fixed left-0 md:left-64 top-0 right-0 bg-red-300">

                </div>
            </div>


            {/*<div className="flex w-full min-h-screen">*/}
            {/*    <div className="w-0 md:w-64 h-screen bg-green-300">*/}

            {/*    </div>*/}
            {/*    <div className="flex-1 flex-col bg-gray-400">*/}
            {/*        <div className="h-16 w-full bg-red-500">*/}

            {/*        </div>*/}
            {/*        <div>*/}
            {/*            {props.children}*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*</div>*/}



        </>
    );
};

export default Layout;
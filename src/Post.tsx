import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store';
import { fetchdata, fullfetchdata } from './redux/Datasplice/Datasplice'


const Post: React.FC = () => {

    const { list, loading, error, fulldata } = useSelector((state: RootState) => state.posts);

    const [page, setpage] = useState<number>(1);
    // console.log(page);
    const itemsPerPage = 10;
    const length = fulldata.length;
    const totalPages = length / itemsPerPage
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<Boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchdata(page));
        dispatch(fullfetchdata())
    }, [dispatch, page]);
        
        
    return (
        <>

            <header className="w-full bg-white sticky top-0 z-50">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center py-5 md:py-6 relative z-40">
                        <div className="flex">
                            <div className="pr-24">
                                <a href="">
                                    <img src="/assets/Layer_1.svg" alt="Logo" className="max-w-36 h-10" />
                                </a>
                            </div>
                            <ul className="hidden lg:flex items-center gap-12 text-base">
                                <li className="hover:text-primary font-medium cursor-pointer"><a href="">Home</a></li>
                                <li className="hover:text-primary font-medium cursor-pointer"><a href="">Products</a></li>
                                <li className="hover:text-primary font-medium cursor-pointer"><a href="">Contacts</a></li>
                            </ul>
                        </div>
                        <div className="hidden lg:flex justify-center items-center gap-12">
                            <a href=""><img className='cursor-pointer' src="/assets/shop_icon.svg" alt="shop" /></a>
                            <a href=""><img className='cursor-pointer' src="/assets/proflie_icon.svg" alt="profile" /></a>
                            <div className='w-6 border border-primary rotate-90'></div>
                            <a href=""><img className='cursor-pointer' src="/assets/menu.svg" alt="menu" /></a>
                        </div>
                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                <img src="/assets/menu.svg" alt="Mobile Menu" className="w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`fixed top-[70px] left-0 w-full bg-white lg:hidden flex flex-col px-4 py-5 gap-4 text-lg transition-transform duration-300 ease-in-out z-30
                    ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
                <ul className="flex flex-col gap-6">
                    <li className="hover:text-primary font-medium cursor-pointer"><a href="">Home</a></li>
                    <li className="hover:text-primary font-medium cursor-pointer"><a href="">Products</a></li>
                    <li className="hover:text-primary font-medium cursor-pointer"><a href="">Contacts</a></li>
                </ul>
            </div>
            {loading ? (
                <>
                    <div className='text-27 h-screen w-full flex justify-center items-center'>

                        <div className="flex-col gap-4 w-full flex items-center justify-center">
                            <div
                                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                            >
                                <div
                                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                                ></div>
                            </div>
                        </div>

                    </div>
                </>
            ) : list?.length == 0 ? (
                <div className='text-27 h-screen w-full flex justify-center items-center'>
                    <div className="container">

                        <div className="col-sm-8 offset-sm-2  text-center -mt-52">
                            <div className="relative ">
                                <h1 className="relative text-9xl  text-shadow text-orange-500 font-sans font-bold">
                                    <span>4</span><span>0</span><span>4</span></h1>
                                <span className="absolute  top-0  text-gray-600 -ml-12   font-semibold">Oops!</span>
                            </div>
                            <h5 className=" font-semibold text-gray-600 ">Page not found</h5>
                            <p className=" mt-2 mb-6 text-gray-600">we are sorry, but the page you requested was not found</p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="max-w-6xl mx-auto py-8 px-4 cursor-pointer">
                        <h2 className="text-3xl font-bold text-center mb-8">Posts</h2>

                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {list.map(post => (
                                <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">

                                    <h3 className="font-semibold text-lg mb-2  overflow-hidden text-ellipsis text-nowrap">{post.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2 ">{`${post.body.slice(0,80)}...`}</p>
                                    <span className="text-xs text-gray-400">POST: {post.id}</span>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto py-4 sm:py-6 md:py-8 px-2 sm:px-4">
                        <button
                            className="flex items-center  text-xs sm:text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 py-2 px-3 rounded-md  shadow-sm"
                            onClick={() => setpage(item => item > 1 ? item - 1 : 1)}
                        >
                            Previous
                        </button>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            {[...Array(totalPages)].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setpage(index + 1)}
                                    className={`text-xs sm:text-sm md:text-base py-2 px-3 rounded-md transition-all duration-300 shadow-sm
                                    ${page === index + 1 ? 'bg-black text-white' : 'bg-white text-black'}
                                    hover:bg-black hover:text-white`}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            className="flex items-center  text-xs sm:text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 py-2 px-3 rounded-md shadow-sm"
                            onClick={() => setpage(item => item < 10 ? item + 1 : 10)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </>
    )
}

export default Post
// import React from 'react';

// const Header = () => {
//     return (
//         <header className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl shadow-lg mb-6">
//             {/* Welcome Text */}
//             <div className="text-white mb-4 md:mb-0">
//                 <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
//                     Welcome Back!
//                 </h1>
//                 <p className="text-indigo-100 mt-2 md:mt-4 text-sm md:text-base">
//                     Manage your products, invoices & billing efficiently
//                 </p>
//             </div>

//             {/* Profile / Avatar */}
//             <div className="flex items-center gap-4">
//                 <div className="relative group">
//                     <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-lg md:text-xl shadow-lg transform transition-transform duration-300 group-hover:scale-110">
//                         Y
//                     </div>
//                     <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white animate-pulse"></div>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;
import React from 'react';

const Header = () => {
    return (
        <header
            className="flex flex-col md:flex-row items-center justify-between 
                           bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400
                           p-6 rounded-2xl shadow-xl mb-6 backdrop-blur-sm">
            {/* Welcome Text */}
            <div className="text-white mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold tracking-wide animate-fadeIn">
                    Welcome Back!
                </h1>
                <p className="text-indigo-100 mt-2 md:mt-4 text-sm md:text-base animate-fadeIn delay-200">
                    Manage your products, invoices & billing efficiently
                </p>
            </div>

            {/* Profile / Avatar */}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <div
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white 
                                    flex items-center justify-center text-indigo-600 
                                    font-bold text-lg md:text-xl shadow-lg transform 
                                    transition-transform duration-300 group-hover:scale-110">
                        Y
                    </div>
                    {/* Online status / notification */}
                    <div
                        className="absolute bottom-0 right-0 w-4 h-4 md:w-5 md:h-5 
                                    rounded-full bg-green-400 border-2 border-white animate-pulse"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;

// // import React from 'react';
// // import Sidebar from './Sidebar';
// // import Header from './Header';

// // const Layout = ({ children }) => {
// //     return (
// //         <div className="min-h-screen flex bg-slate-50">
// //             <Sidebar />
// //             <div className="flex-1 p-6">
// //                 <Header />
// //                 <main className="mt-6">{children}</main>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Layout;

// import React from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';

// const Layout = ({ children }) => {
//     return (
//         <div className="min-h-screen flex bg-gray-100">
//             {/* Sidebar */}
//             <Sidebar />

//             {/* Main Content */}
//             <div className="flex-1 flex flex-col transition-all duration-300">
//                 {/* Header */}
//                 <Header />

//                 {/* Content Area */}
//                 <main className="flex-1 p-6 md:p-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg bg-white shadow-inner">
//                     {children}
//                 </main>
//             </div>
//         </div>
//     );
// };

// export default Layout;

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col transition-all duration-300">
                {/* Header */}
                <Header />

                {/* Content Area */}
                <main className="flex-1 p-6 md:p-8 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

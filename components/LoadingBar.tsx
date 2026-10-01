// 'use client';

// import { usePathname } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css';

// const LoadingBar = () => {
//     const pathname = usePathname(); // Listen for route changes
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (!pathname) return;

//         NProgress.start();
//         setIsLoading(true);

//         const timeout = setTimeout(() => {
//             NProgress.done();
//             setIsLoading(false);
//         }, 500); // Adjust the timeout as needed for smoother transitions

//         return () => {
//             clearTimeout(timeout);
//         };
//     }, [pathname]);

//     return null; // No UI element, just logic
// };

// export default LoadingBar;

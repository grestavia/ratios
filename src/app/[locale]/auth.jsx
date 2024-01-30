'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Auth({ children }) {
    const router = useRouter();
    const pathname = usePathname()
    useEffect(() => {
      const token = localStorage.getItem('token')

      if(token){
        if(pathname === '/register'){
           return router.push('/[locale]/');
        }

        if(pathname === '/login'){
           return router.push('/[locale]/');
        }
      }

      if(!token && pathname !== '/register'){
           return router.push('/[locale]/login');
    }

    }, [])
    return <>{children}</>;
}
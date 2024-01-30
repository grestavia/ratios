'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default async function TokenCheck() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token) {
            router.push('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = token;
        }
    })
}
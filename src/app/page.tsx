 'use client';
import Input from '@/components/atomic/input';
import Link from 'next/link';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // State untuk loader
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        console.log(email, password)
        event.preventDefault();
        setIsLoading(true); // Aktifkan loader
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password }),
            });

            if (response.ok) {
                router.push('/dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            setError('An unexpected error occurred.');
        } finally {
            setIsLoading(false); // Matikan loader
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-[50%] flex justify-center items-center max-md:hidden">
              {/* ITEM APA KEK */}
            </div>

            <div className="w-[50%] max-md:w-full bg-white flex justify-center h-[100vh]">
                <div className='w-10/12 h-screen flex flex-col justify-center text-[#071952] py-11'>
                    <div className='flex flex-col gap-[48px]'>

                        <div className='font-poppins flex flex-col gap-[24px]'>
                            <h1 className='text-[20px]'>Hello, Witch!</h1>
                            <div>
                                <form className='flex flex-col gap-[32px]' onSubmit={handleSubmit}>
                                    <div className='flex flex-col gap-[16px]'>
                                        {/* Email */}
                                        <Input 
                                            label='Email'
                                            type='email'
                                            id='email'
                                            placeholder='johndoe@example.com'
                                            logo='/icon/envelope.svg'
                                            value={email}
                                            required ={true}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {/* Password */}
                                        <Input 
                                            label='Password'
                                            type='password'
                                            id='password'
                                            placeholder='Enter your password'
                                            logo=''
                                            value={password}
                                            required ={true}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        {error && <p className="text-red-500 text-xs">{error}</p>}
                                    </div>

                                    <button
                                        type='submit'
                                        className={`cursor-pointer duration-300 transition-all ${!isLoading ? 'opacity-100' : 'opacity-50'}`}
                                        disabled={isLoading}
                                    >
                                        <div className='py-[10px] px-[24px] w-full bg-primary flex justify-center items-center text-white rounded-[6px]'>
                                            {isLoading ? (<div className="loader"></div>) : 'Login'}
                                        </div>
                                    </button>

                                    <div className='w-full h-[1px] bg-[#E5E5E5]' />

                                    <p className='text-[12px] font-[400] font-poppins text-[#1A1A1A] text-center'>
                                        Dont have an account? <Link href="/signup" className='text-[#3059EE] font-[600]'>Sign up</Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

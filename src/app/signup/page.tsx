
'use client';
import Image from 'next/image';
import Input from '@/components/atomic/input';
import Link from 'next/link';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isLengthValid, setLengthPassword] = useState(false);
    const [isContainNumber, setContainNumber] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); 
    const router = useRouter();

    const handleValidPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        setPassword(password);

        const isLengthValid = password.length >= 12;
        setLengthPassword(isLengthValid);
    
        const isContainNumber = /\d/.test(password);
        setContainNumber(isContainNumber);
    
        setIsValidPassword(isLengthValid && isContainNumber);
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true); 
        
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
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
            setIsLoading(false); 
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-[50%] flex justify-center items-center max-md:hidden">
              {/* ITEM APA KEK */}
            </div>

            <div className="w-[50%] max-md:w-full bg-white flex justify-center h-[100vh]">
                <div className='w-10/12 h-screen flex flex-col justify-between text-[#071952] py-11'>
                    <div className='flex flex-col gap-[48px]'>

                        <div className='font-poppins flex flex-col gap-[24px]'>
                            <h1 className='text-[20px]'>Register Your Account</h1>
                            <div>
                                <form className='flex flex-col gap-[32px]' onSubmit={handleSubmit}>
                                    <div className='flex flex-col gap-[16px]'>
                                        {/* Name */}
                                        <Input 
                                            label='Full Name'
                                            type='text'
                                            id='name'
                                            placeholder='Fauzan'
                                            logo='/icon/user.svg'
                                            value={name}
                                            required ={true}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {/* Email */}
                                        <Input 
                                            label='Email'
                                            type='email'
                                            id='email'
                                            placeholder='fauzan@example.com'
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
                                            onChange={handleValidPassword}
                                        />

                                        {error && <p className="text-red-500 text-xs">{error}</p>}

                                        {/* Password Requirements */}
                                        <div className='flex flex-col gap-1'>
                                            <div className='flex gap-2 items-center ml-2'>
                                                {isLengthValid ? (
                                                    <Image src="./icon/checklist.svg" alt='check' width={14} height={14}/>
                                                ) : (
                                                    <div className='w-[14px] h-[14px] rounded-full border-[2px] border-[#071952]'></div>
                                                )}
                                                <p className='text-[12px] font-nunito'>Your Password must be at least 12 characters</p>
                                            </div>

                                            <div className='flex gap-2 items-center ml-2'>
                                                {isContainNumber ? (
                                                    <Image src="./icon/checklist.svg" alt='check' width={14} height={14}/>
                                                ) : (
                                                    <div className='w-[14px] h-[14px] rounded-full border-[2px] border-[#071952]'></div>
                                                )}
                                                <p className='text-[12px] font-nunito'>Your password should contain at least one number</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type='submit'
                                        className={`cursor-pointer duration-300 transition-all ${isValidPassword ? 'opacity-100' : 'opacity-50'}`}
                                        disabled={!isValidPassword || isLoading}
                                    >
                                        <div className='py-[10px] px-[24px] w-full bg-primary flex justify-center items-center text-white rounded-[6px]'>
                                            {isLoading ? (<div className="loader"></div>) : 'Sign Up'}
                                        </div>
                                    </button>

                                    <div className='w-full h-[1px] bg-[#E5E5E5]' />

                                    <p className='text-[12px] font-[400] font-poppins text-[#1A1A1A] text-center'>
                                        Already have an account? <Link href="/" className='text-[#3059EE] font-[600]'>Sign in</Link>
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

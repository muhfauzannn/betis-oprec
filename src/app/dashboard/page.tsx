'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import logout from '@/lib/logout';

// Definisi tipe data
interface Buku {
    id: string;
    judul: string;
    deskripsi: string;
    jumlah: number;
    tipeSihir: string;
    status: string;
    pemilik: string;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    status: boolean;
    message: string;
    bukuSihir: Buku[];
}

export default function Dashboard() {
    const [books, setBooks] = useState<Buku[]>([]); 
    const [filteredBooks, setFilteredBooks] = useState<Buku[]>([]); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [isAllBook, setIsAllBook] = useState<boolean>(true); 
    const [name, setName] = useState<string>(""); 

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const sessionResponse = await fetch('/api/session');
                if (!sessionResponse.ok) {
                    throw new Error('User not authenticated');
                }
                const sessionData = await sessionResponse.json();
                const userName = sessionData.name;
                setName(userName);

                const response = await fetch("https://betis25-oprec.vercel.app/api/bukusihir", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer 1faba443077a257a",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }

                const data: ApiResponse = await response.json();

                if (data && data.status && Array.isArray(data.bukuSihir)) {
                    setBooks(data.bukuSihir);
                    setFilteredBooks(data.bukuSihir);
                } else {
                    console.error("Unexpected API response:", data);
                    setBooks([]);
                    setFilteredBooks([]);
                }
            } catch (error:unknown) {
                console.error("Error fetching books", error);
                setBooks([]);
                setFilteredBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        if (isAllBook) {
            setFilteredBooks(books); 
        } else {
            setFilteredBooks(books.filter(book => book.pemilik === name)); 
        }
    }, [isAllBook, books, name]);

    return (
        <>
            <div className="flex justify-center items-center h-screen font-poppins">
                <div className="w-[70%] max-md:w-[80%] max-sm:w-[90%] h-[70vh] bg-[#088395]/80 rounded-[25px] border-4 border-[#071952] flex flex-col gap-4 items-center p-6 max-sm:p-2 relative">
                    <button
                        className={`p-2 mt-2 bg-white text-white rounded-full absolute top-2 right-4 duration-150 hover:opacity-70 ${isAllBook ? 'opacity-100' : 'opacity-70'}`}
                        onClick={() => setIsAllBook(!isAllBook)}
                    >
                        <Image src={`/icon/user.svg`} alt="" width={15} height={15} />
                    </button>

                    <Link href={`/dashboard/add`}>
                        <div
                            className={`p-2 mt-2 bg-white text-white rounded-full absolute top-12 right-4 duration-150 hover:opacity-70 ${isAllBook ? 'opacity-100' : 'opacity-70'}`}
                        >
                            <Image src={`/icon/pen.svg`} alt="" width={15} height={15} />
                        </div>
                    </Link>
                    
                    <h1 className="font-sans font-bold text-3xl text-white">{isAllBook ? 'All Books' : `${name}'s Books`}</h1>
                    <div className="h-full w-[90%] max-sm:w-full overflow-y-scroll rounded-md text-white scrollbar-hide px-4 flex flex-col gap-4 max-md:gap-2">
                        {loading ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <div className="loader"></div>
                            </div>
                        ) : (
                            filteredBooks.map((book: Buku) => (
                                <Link href={`/dashboard/${book.id}`} key={book.id}>
                                    <div className="w-full h-[100px] rounded-[10px] border-[3px] border-white flex justify-between px-4 py-2 items-center group duration-100 hover:bg-primary hover:border-0">
                                        <div className="flex gap-2 w-[90%] overflow-hidden">
                                            <div className="w-[60px] h-[60px] min-w-[60px] max-w-[60px] bg-white rounded-[10px] flex justify-center items-center">
                                                <Image
                                                    src={`/icon/${
                                                        book.tipeSihir === 'ELEMENTAL'
                                                            ? 'fire'
                                                            : book.tipeSihir === 'PENYEMBUHAN'
                                                            ? 'healing'
                                                            : 'evil'
                                                    }.svg`}
                                                    alt={book.judul}
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>

                                            <div className="flex flex-col justify-between leading-none font-sans">
                                                <p className="text-base font-bold w-max">{book.judul}</p>
                                                <p className="text-xs font-semibold opacity-90 w-max">{book.deskripsi}</p>
                                                <p className="text-xs font-semibold opacity-90 w-max">Author: {book.pemilik}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <Image
                                                src="/icon/magic-wand.svg"
                                                alt="Details"
                                                width={25}
                                                height={25}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
            
            <div className="flex gap-2 justify-center items-center absolute bottom-4 right-4">
                <p className="text-white font-sans font-bold">Sign Out</p>
                <button
                    className={`p-2 bg-white text-white rounded-full duration-150 hover:opacity-70 ${isAllBook ? 'opacity-100' : 'opacity-70'}`}
                    onClick={logout}
                    >
                    <Image src={`/icon/sign-out-alt.svg`} alt="" width={15} height={15} />
                </button>
            </div>
            
        </>
    );
}

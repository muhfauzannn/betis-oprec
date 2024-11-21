'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const tipePenyihirOption = ["ELEMENTAL", "PENYEMBUHAN", "KUTUKAN"];
const statusOption = ["TERSEDIA", "DIPINJAM", "HILANG"];

export default function CreateNewBook() {
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>("");
    const [alertType, setAlertType] = useState<"success" | "error">("success");

    const [name, setName] = useState<string>("");

    const [judul, setJudul] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState<string>("");
    const [jumlah, setJumlah] = useState<number>(1);
    const [tipeSihir, setTipeSihir] = useState<string>(tipePenyihirOption[0]);
    const [status, setStatus] = useState<string>(statusOption[0]);

    const router = useRouter();

    useState(() => {
        const fetchUserSession = async () => {
            try {
                const sessionResponse = await fetch('/api/session');
                if (!sessionResponse.ok) {
                    throw new Error('User not authenticated');
                }
                const sessionData = await sessionResponse.json();
                setName(sessionData.name);
            } catch (error) {
                console.error("Failed to fetch user session:", error);
            }
        };
        fetchUserSession();
    });

    const showAlert = (message: string, type: "success" | "error") => {
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);

        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    };

    const handleCreate = async () => {
        const newBookData = {
            judul,
            deskripsi,
            jumlah,
            tipeSihir,
            status,
            pemilik: name,
        };

        try {
            setLoadingSubmit(true);
            const response = await fetch("https://betis25-oprec.vercel.app/api/bukusihir", {
                method: "POST",
                headers: {
                    Authorization: "Bearer 1faba443077a257a",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBookData),
            });

            if (!response.ok) {
                throw new Error("Failed to create a new book");
            }

            showAlert("Book created successfully!", "success");
            setLoadingSubmit(false);

            setTimeout(() => {
                router.push('/dashboard'); 
            }, 3000); 
        } catch (error) {
            console.error("Error creating book:", error);
            showAlert("Failed to create a new book.", "error");
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen font-poppins relative">
            {alertVisible && (
                <div className="absolute top-5 w-[70%] mx-auto transition-all duration-300 ease-in-out">
                    <Alert>
                        <Terminal className={`h-4 w-4 ${alertType === "success" ? "text-green-500" : "text-red-500"}`} />
                        <AlertTitle>{alertType === "success" ? "Success" : "Error"}</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
            <div className="w-[70%] max-md:w-[80%] max-sm:w-[90%] h-[70vh] bg-[#088395]/80 rounded-[25px] border-4 border-[#071952] flex flex-col gap-4 items-center p-6 max-sm:p-2 relative">
                <h1 className="font-sans font-bold text-2xl text-white">Create New Book</h1>
                <div className="w-[70%] max-md:w-[90%] h-full text-white font-bold font-sans flex-col gap-3">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full">
                            <p className="text-sm ml-2 mb-1">Judul: </p>
                            <input
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                className="w-full bg-[#071952] bg-opacity-80 py-2 placeholder-white placeholder-opacity-80 rounded-[10px] px-2"
                            />
                        </div>
                        <div className="w-full">
                            <p className="text-sm ml-2 mb-1">Deskripsi: </p>
                            <input
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                className="w-full bg-[#071952] bg-opacity-80 py-2 placeholder-white placeholder-opacity-80 rounded-[10px] px-2"
                            />
                        </div>
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <p className="text-sm ml-2 mb-1">Jumlah: </p>
                                <input
                                    type="number"
                                    value={jumlah}
                                    onChange={(e) => setJumlah(Number(e.target.value))}
                                    className="w-full bg-[#071952] bg-opacity-80 py-[6px] placeholder-white placeholder-opacity-80 rounded-[10px] px-2"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-sm ml-2 mb-1">Tipe Sihir: </p>
                                <select
                                    value={tipeSihir}
                                    onChange={(e) => setTipeSihir(e.target.value)}
                                    className="w-full bg-[#071952] bg-opacity-80 py-2 placeholder-white placeholder-opacity-80 rounded-[10px] px-2"
                                >
                                    {tipePenyihirOption.map((tipe) => (
                                        <option key={tipe} value={tipe}>
                                            {tipe}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="w-full">
                            <p className="text-sm ml-2 mb-1">Status: </p>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full bg-[#071952] bg-opacity-80 py-2 placeholder-white placeholder-opacity-80 rounded-[10px] px-2"
                            >
                                {statusOption.map((stat) => (
                                    <option key={stat} value={stat}>
                                        {stat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-3">
                            <button
                                onClick={handleCreate}
                                className="w-full cursor-pointer bg-[#3059EE] py-[6px] text-white rounded-[10px] px-2"
                            >
                                {loadingSubmit ? (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <div className="loader"></div>
                                    </div>
                                ) : (
                                    "Create"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

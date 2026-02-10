import { useRef, useState, useEffect } from 'react';

interface OtpInputProps {
    length?: number;
    onComplete: (otp: string) => void;
    error?: string;
}

export default function OtpInput({ length = 4, onComplete, error }: OtpInputProps) {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
     
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);


        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === length) {
            onComplete(combinedOtp);
        }

     
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleClick = (index: number) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);

        
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
         
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex gap-4 justify-center" dir="ltr">
                {otp.map((value, index) => (
                    <input
                        key={index}
                        ref={(input) => {
                            inputRefs.current[index] = input;
                        }}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onClick={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-lg outline-none transition-all
              ${error
                                ? 'border-red-500 focus:border-red-500 text-red-600'
                                : 'border-gray-300 focus:border-green-500 text-gray-800'
                            }`}
                    />
                ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

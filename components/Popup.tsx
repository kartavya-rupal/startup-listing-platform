// // components/ContactForm.tsx
// "use client";

// import React, { useState } from "react";
// import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@radix-ui/react-dialog";

// interface ContactFormProps {
//     onSubmit: (message: string) => void;
// }

// const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
//     const [message, setMessage] = useState("");

//     const handleSubmit = () => {
//         onSubmit(message);
//         setMessage("");
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>
//                 <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Contact Author</button>
//             </DialogTrigger>
//             <DialogContent className="p-6 bg-white shadow-md rounded-md max-w-md mx-auto">
//                 <h2 className="text-lg font-bold mb-4">Contact Author</h2>
//                 <textarea
//                     className="w-full border p-2 rounded-md mb-4"
//                     placeholder="Type your message here..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-green-500 text-white px-4 py-2 rounded-md"
//                 >
//                     Send
//                 </button>
//                 <DialogClose asChild>
//                     <button className="absolute top-2 right-2 text-gray-500">X</button>
//                 </DialogClose>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ContactForm;

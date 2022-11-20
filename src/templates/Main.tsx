/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-key */
/* eslint-disable object-shorthand */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/inline-script-id */
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Pusher from "pusher-js";
import type { ReactNode } from 'react';
import React, { useEffect,useState } from "react";

import axios from '@/lib/axios';

import Footer from './Footer';
import Navbar from './Navbar';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};
const Main = (props: IMainProps) => {
  const [alert, setAlert] = useState();

  const router = useRouter();
  const token = Cookies.get('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const [user, setUser] = useState();
  const [chatOpen, setChatOpen] = useState(false);
  const [username, setUsername] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('test');

  const getUser = async () => {
    await axios
      .get('/api/user')
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
      getUser();
   
  }, []);

  useEffect(() => {
 
    const pusher = new Pusher("d1cd58ebe9c30c38dc6c", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  });



  const sendMessage = async () => {
    await axios
      .post("/api/chat", {
        username:  user?.nama_depan,
        message: message,
      })
      .then((res) => {
        setMessage("");
      });
  };

  return (
    <>
      {alert && (
        <div className="max-w-[50%] bottom-2 left-2 alert shadow-lg z-[1003] fixed">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-white">{alert}</span>
          </div>
          <div className="flex-none">
            <button
              onClick={() => setAlert('')}
              className="btn btn-sm btn-ghost glass"
            >
              Close
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push('/login');
              }}
              className="btn btn-sm btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      )}
      {chatOpen && (
           <div
           className="fixed bottom-0 right-0 w-full h-full bg-slate-700 z-[5000] overflow-y-scroll flex flex-col min-h-[100vh] max-w-[30vw] pb-4"
         >
           <h1
            className="text-white text-2xl font-bold mb-5 bg-slate-800 w-full p-4"
           >
              Chat Admin <span className="text-xs">Beta</span> 
              <span className="float-right cursor-pointer" onClick={() => setChatOpen(false)}>X</span>
           </h1>
           <div>
             {messages.map((message) => (
               <div
               className="px-5"
                 style={{
                   display: "flex",
                   justifyContent:
                     message.username === username ? "flex-end" : "flex-start",
                   paddingBottom: "1em",
                 }}
               >
                 <div
                   style={{
                     background:
                       message.username === username ? "#58bf56" : "#e5e6ea",
                     color: message.username === username ? "white" : "black",
                     padding: "1em",
                     borderRadius: "1em",
                   }}
                 >
                   <p style={{ fontWeight: "bold", margin: 0 }}>
                     {message.username}
                   </p>
                   <p style={{ fontSize: "0.8em" }}>{message.message}</p>
                 </div>
               </div>
             ))}
           </div>
           <form
             style={{
               display: "flex",
               flexDirection: "row",
               alignItems: "center",
               justifyContent: "space-evenly",
               marginTop: "auto",
             }}
             onSubmit={(e) => {
               e.preventDefault();
               sendMessage();
             }}
           >
             <div style={{ display: "flex", flexDirection: "column", bottom: "0" }}>
               <input
                 type="text"
                 className="input input-bordered w-full"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
               />
             </div>
             <button
               style={{
                 padding: "10px",
                 backgroundColor: "#58bf56",
                 color: "white",
                 border: "none",
                 borderRadius: "5px",
                 cursor: "pointer",
               }}
               type="submit"
             >
               Send
             </button>
           </form>
         </div>
      )}
      <div className="w-full px-1 text-slate-800 antialiased">
        {props.meta}
        {router.pathname !== '/autentikasi' && <Navbar />}
        <div className="mx-auto min-h-screen">
          <div className="content py-5 text-lg mx-5 overflow-hidden">
            {props.children}
            <button
              onClick={() => {
                if (token) {
                  setChatOpen(true);
                } else {
                  setAlert('Silahkan login terlebih dahulu');
                }
              }}
              className="btn btn-circle btn-lg bg-[#525252] fixed z-[1001] left-10 bottom-10 hover:bg-slate-800"
            >
              <span className="text-xs text-slate-50">CHAT ME</span>
            </button>
          </div>
        </div>
        {router.pathname !== '/autentikasi' && <Footer />}
      </div>
    </>
  );
};

export { Main };

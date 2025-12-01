import React, { useEffect, useRef, useState } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import { MessageSquareText } from "lucide-react";
// import { TbHeadphonesFilled } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa6";
import axios from "axios";
import { url } from "../App";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// const navigate = useNavigate()
import { RiRobot3Line } from "react-icons/ri";


export default function Bot() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [chat, setChat] = useState(false);
  const [faqs, setFaqs] = useState(false);
  const [bar, setBar] = useState(false)
  const [Msg, setMsg] = useState([])
  const [faqMsg, setfaqMsg] = useState([])
  const [BotMsg, setBotMsg] = useState([])
  const [ChatBotMsg, setChatBotMsg] = useState([])

  const handleClick = () => {
    setBar(true)
    setChat(false);
    setFaqs(true);
  };

  useEffect(() => {

    const handleExternalClick = () => handleClick();

    window.addEventListener("openBot", handleExternalClick);
    return () => window.removeEventListener("openBot", handleExternalClick);
  }, []);

  const chatContainerRef = useRef(null);
  const chatContainerRef2 = useRef(null)

  const AccessToken = localStorage.getItem("AccessToken")
  const customerid = localStorage.getItem('id')
  const accesstoken = localStorage.getItem("AccessToken");

  useEffect(() => {
    FaqsBotRes()
    ChatBotRes()
  }, [AccessToken, customerid])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [Msg]);

  useEffect(() => {
    if (chatContainerRef2.current) {
      chatContainerRef2.current.scrollTop = chatContainerRef2.current.scrollHeight;
    }
  }, [faqMsg]);


  const submit = async () => {

    if (!accesstoken) {
      toast.error('Please login to continue');

      setTimeout(() => {
        navigate('/login');
      }, 3000);

      return;
    }

    if (input.trim() === "") return;

    const data = {
      "user": input, customer_id: customerid,
      bot: "CHAT"
    }

    const msg = { type: "user", msg: input }
    setMsg((prev) => [...prev, msg])
    setInput("")

    try {
      const res = await axios.post(`${url}faq/`, data)
      const AiRes = res.data.output
      const Aimsg = { type: "ai", msg: AiRes }
      setMsg((prev) => [...prev, Aimsg])

    } catch (error) {
      console.log(error)
    }
  }



  const submitFaq = async () => {

    if (!accesstoken) {
      toast.error('Please login to continue');
      setTimeout(() => {
        navigate('/login');
      }, 3000);

      return;
    }

    if (input2.trim() === "") return;

    const data = {
      "user": input2, customer_id: customerid,
      bot: "FAQ"
    }

    const msg = { type: "user", faq: input2 }
    setfaqMsg((prev) => [...prev, msg])
    setInput2("")

    try {
      const res = await axios.post(`${url}faq/`, data)

      const AiRes = res.data.output
      const Aimsg = { type: "ai", faq: AiRes }
      setfaqMsg((prev) => [...prev, Aimsg])


    } catch (error) {
      console.log(error)
    }

  }


  const handleKeyDown1 = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleKeyDown2 = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitFaq();
    }
  };




  const FaqsBotRes = async () => {
    if (!AccessToken) return;
    try {
      const save = await axios.get(`${url}bot/`,
        {
          headers: {

            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          }
        }
      )
      const filterbot = save.data.filter((item) => item.customer_id == customerid && item.query_type === "FAQ")
      setBotMsg(filterbot)
      // console.log(filterbot)
    } catch (error) {
      console.log(error)
    }
  }





  const ChatBotRes = async () => {
    if (!AccessToken) return;
    try {
      const save = await axios.get(`${url}bot/`,
        {
          headers: {

            "ngrok-skip-browser-warning": "69420",
            "Content-Type": "application/json",
          }
        }
      )
      const filterbot = save.data.filter((item) => item.customer_id == customerid && item.query_type === "CHAT")
      setChatBotMsg(filterbot)
      // console.log(filterbot)
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className="fixed bottom-4 right-4 md:w-[90%] w-[60%] max-w-[350px] z-50">

      <div className="bg-gray-200 shadow-xl border border-gray-200 overflow-hidden flex flex-col">
        <div className={` ${bar ? "text-center p-1 flex justify-end"
          : "text-center p-1"
          }`}>
          {!bar && (
            <div>
              <button className="text-[#666F80]" onClick={() => setBar(true)}><FaHeadset className="inline mr-2 text-xl text-[#666F80]" />How may we help you</button>

            </div>
          )}

        </div>


        <div>
          {bar && (
            <div>

              {(chat || faqs) && (
                <div className="flex flex-col transition-all max-h-[80vh] duration-300">

                  <div className="p-2 text-end bg-gray-200">
                    <button onClick={() => { setChat(false); setFaqs(false); setBar(false); }}>
                      <IoClose className="text-xl text-[#666F80] hover:text-[#FB6D6C]" />
                    </button>
                  </div>
                </div>
              )}


              {/*Buttons*/}
              <div className="flex justify-between items-center p-3 bg-gray-100">
                <button
                  onClick={() => { setChat(false); setFaqs(true); }}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold m-1 transition-all duration-200 ${faqs
                    ? "bg-[#FB6D6C] text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <RiRobot3Line className="inline mr-1 " size={20} />
                  Support Hub
                </button>
                {/* <button
                  onClick={() => { setChat(true); setFaqs(false); }}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold m-1 transition-all duration-200 ${chat
                    ? "bg-[#FB6D6C] text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <MessageSquareText className="inline mr-1" size={16} />
                  Chat
                </button> */}
              </div>


              {/* Chat Content */}
              <div>

                {chat && (
                  <div className="flex flex-col h-[60vh] md:h-96 bg-gray-50">

                    <div
                      ref={chatContainerRef2}
                      className="flex-1 overflow-y-auto p-3 space-y-2"
                      style={{
                        // scrollbarWidth: "thin",            
                        scrollbarColor: "#FB6D6C #f1f1f1",
                      }}
                    >

                      {/* {ChatBotMsg.length > 0 ? ( */}
                      <>
                        {/* Old Chats from backend */}
                        {ChatBotMsg.map((Bot, idx) => (
                          <div key={idx}>
                            <div className="flex justify-end">
                              <div className="bg-[#FB6D6C] text-white rounded-2xl px-3 py-2 max-w-[80%] break-words">
                                {Bot.user_query}
                              </div>
                            </div>
                            <div className="flex justify-start">
                              <div className="bg-white text-[#666F80] rounded-2xl px-3 py-2 max-w-[80%] break-words">
                                {Bot.bot_response}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* New messages */}
                        {Msg.map((M, index) => (
                          <div
                            key={index}
                            className={`flex ${M.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-3 py-2 break-words ${M.type === "user"
                                ? "bg-[#FB6D6C] text-white"
                                : "bg-white text-[#666F80]"
                                }`}
                            >
                              {M.msg}
                            </div>
                          </div>
                        ))}
                      </>


                    </div>









                    <div className="border-t border-gray-200 flex gap-2 p-3 bg-white sticky bottom-0 overflow-y-auto scrollbar-hide">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FB6D6C] 
                        resize-none overflow-y-auto scrollbar-hide"
                        placeholder="Type a message..."
                        onKeyDown={handleKeyDown1}

                      />
                      <button
                        className="bg-[#FB6D6C] text-white p-3 rounded-xl shadow-md transition-all duration-200"
                        onClick={submit}

                      >
                        <IoSend size={18} />
                      </button>
                    </div>

                  </div>
                )}

              </div>

              {/* Faq Content */}
              <div>
                {faqs && (
                  <div className="flex flex-col h-[60vh] md:h-96 bg-gray-50">

                    <div
                      ref={chatContainerRef2}
                      className="flex-1 overflow-y-auto p-3 space-y-2"
                      style={{
                        // scrollbarWidth: "thin",            
                        scrollbarColor: "#FB6D6C #f1f1f1",
                      }}
                    >

                      {/* {BotMsg.length > 0 ? ( */}
                      <>
                        {/* Old Chats from backend */}
                        {BotMsg.map((Bot, idx) => (
                          <div key={idx}>
                            <div className="flex justify-end">
                              <div className="bg-[#FB6D6C] text-white rounded-2xl px-3 py-2 max-w-[80%] break-words">
                                {Bot.user_query}
                              </div>
                            </div>
                            <div className="flex justify-start">
                              <div className="bg-white text-[#666F80] rounded-2xl px-3 py-2 max-w-[80%] break-words">
                                {Bot.bot_response}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* New session messages */}
                        {faqMsg.map((M, index) => (
                          <div
                            key={index}
                            className={`flex ${M.type === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-3 py-2 break-words ${M.type === "user"
                                ? "bg-[#FB6D6C] text-white"
                                : "bg-white text-[#666F80]"
                                }`}
                            >
                              {M.faq}
                            </div>
                          </div>
                        ))}
                      </>
                      {/* )  */}
                      {/* : (
                        <p className="text-gray-500 text-sm text-center mt-10">
                          Ask anything you want!
                        </p>
                      )} */}

                    </div>


                    <div className="border-t border-gray-200 flex gap-2 p-3 bg-white sticky bottom-0 overflow-y-auto scrollbar-hide">
                      <textarea
                        value={input2}
                        onChange={(e) => setInput2(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FB6D6C] 
                        resize-none overflow-y-auto scrollbar-hide"
                        placeholder="Type a message..."
                        onKeyDown={handleKeyDown2}

                      />
                      <button
                        className="bg-[#FB6D6C] text-white p-3 rounded-xl shadow-md transition-all duration-200"
                        onClick={submitFaq}

                      >
                        <IoSend size={18} />
                      </button>
                    </div>

                  </div>
                )}
              </div>


            </div>
          )}
        </div>


      </div>
    </div>
  );
}
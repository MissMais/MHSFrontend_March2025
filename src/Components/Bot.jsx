import React, { useEffect, useRef, useState } from "react";
import { IoSend, IoClose } from "react-icons/io5";
import { MessageSquareText } from "lucide-react";
// import { TbHeadphonesFilled } from "react-icons/tb";
import { FaHeadset } from "react-icons/fa6";
import axios from "axios";
import { url } from "../App";



export default function Bot() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [chat, setChat] = useState(false);
  const [faqs, setFaqs] = useState(false);
  const [bar, setBar] = useState(false)
  const [Msg, setMsg] = useState([])

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [Msg]);


  const submit = async () => {

    if(input.trim() === "") return;
    
    const data = { "user": input }

    const msg = { type: "user", msg: input }
    setMsg((prev) => [...prev, msg])
    setInput("")

    try {
      const res = await axios.post(`${url}chat/`, data)
      console.log(input)
      console.log(res.data.data)
      const AiRes = res.data.data
      const Aimsg = { type: "ai", msg: AiRes }
      setMsg((prev) => [...prev, Aimsg])

    } catch (error) {
      console.log(error)
    }
  }


  // console.log(Msg[0]?.type)

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


              <div className="flex justify-between items-center p-3 bg-gray-100">
                <button
                  onClick={() => { setChat(false); setFaqs(true); }}
                  className={`flex-1 py-2 rounded-2xl text-sm font-semibold m-1 transition-all duration-200 ${faqs
                    ? "bg-[#FB6D6C] text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  FAQs
                </button>
                <button
                  onClick={() => { setChat(true); setFaqs(false); }}
                  className={`flex-1 py-2 rounded-2xl text-sm font-semibold m-1 transition-all duration-200 ${chat
                    ? "bg-[#FB6D6C] text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <MessageSquareText className="inline mr-1" size={16} />
                  Chat
                </button>
              </div>




              {/* Chat Content */}
              <div>

                {chat && (
                  <div className="flex flex-col h-[400px] bg-gray-50">

                    {/* Chat messages scroll area */}
                    <div
                      ref={chatContainerRef}
                      className="flex-1 overflow-y-auto p-3 space-y-2"
                      style={{
                        // scrollbarWidth: "thin",               // for Firefox
                        scrollbarColor: "#FB6D6C #f1f1f1",    // thumb + track color (Firefox)
                      }}
                    >

                      {Msg.length > 0 ? (
                        Msg.map((M, index) => (
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
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm text-center mt-10">
                          Start a conversation with us!
                        </p>
                      )}
                    </div>


                    <div className="border-t border-gray-200 flex gap-2 p-3 bg-white sticky bottom-0">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
                        placeholder="Type a message..."
                        onKeyDown={(e) => {
                          // Press Enter to send
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submit();
                          }
                        }}
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


              {faqs && (
                <div className="flex flex-col p-4 gap-2 h-[400px]">
                  <div className="overflow-y-auto flex-1 mb-3">
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FB6D6C]"
                      placeholder="Ask a question..."
                    />
                    <button className="bg-[#FB6D6C] text-white px-4 py-2 rounded-xl shadow-md text-sm font-semibold transition-all duration-200">
                      Ask
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>


      </div>
    </div>
  );
}
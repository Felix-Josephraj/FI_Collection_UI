"use client"
import React, { useEffect, useState } from "react"
import ChatMessage from "./ChatMessage"
import axios from "axios"

const ChatWindow = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<{ message: string; sender: "user" | "bot"; isTable?: boolean }[]>([
    { sender: "bot", message: "Hi! I am NiColl.\nHow may I help you today?" },
    // { sender: "user", message: "What is the cumulative value of overdue invoices for Customer Amazon?" },
    // { sender: "bot", message: "What is the cumulative value of overdue invoices for Customer Amazon?" },
    // { sender: "user", message: "What is the cumulative valices for Customer Amazon?" },
    // { sender: "bot", message: "What is the cumulaoverdue invoices for Customer Amazon?" },
    // { sender: "user", message: "What is the cumuustomer Amazon?" },
    // { s ender: "bot", message: "What is the  invoices for Customer Amazon?" },
  ])

  const getAnswer = async () => {
    if (userInput.trim().length > 0) {
      setMessages((prev) => {
        return [...prev, { sender: "user", message: userInput }]
      })
      setUserInput("")
      setIsLoading(true)
      axios
        .post("/intelligent_collection?ans=true", {
          user_query: userInput,
        })
        .then((res) => {
          const isTable = typeof res.data.final_answer == "string" ? false : true

          setMessages((prev) => {
            return [...prev, { sender: "bot", message: res.data.final_answer, isTable: isTable }]
          })
        })
        // .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  //When enter is pressed
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // setMessages((prev) => {
      //   return [...prev, { sender: "bot", message: "message" }]
      // })
      getAnswer()
    }
  }

  const [userInput, setUserInput] = useState("")
  return (
    <div className="text-black mt-[29px] chat-container  rounded-[16px] h-[94%] max-h-[612px]">
      <div className="flex flex-row pl-5 pt-[9px] pb-2 gap-3">
        <div className="rounded-full bg-white h-[41px] w-[41px]"></div>
        <h1 className="text-white self-center paragraph6">NiColl</h1>
      </div>
      <section className="chat-screen bg-white mx-1 my-1 rounded-[12px] h-[89%]  relative  flex  flex-col">
        <div className="h-[89%] overflow-y-auto pb-4">
          {/* <h1>helo</h1> */}

          <ChatMessage messages={messages} />
          {isLoading && (
            <div className="loader-dots ml-[46px] mt-[43px]">
              <div className="dot-pulse"></div>
            </div>
          )}
        </div>
        <section className="flex flex-row send-container  flex-1 rounded-b-xl bg-[#F4F7F9] pt-2.5 pb-2 px-4 justify-between gap-1.5 items-center">
          <input
            className="user-input bg-[#F4F7F9] border-none outline-none w-full paragraph1"
            placeholder="Type your question and hit enter"
            type="search"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <div
            onClick={() => {
              getAnswer()
            }}
            className="cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="30" viewBox="0 0 21 30" fill="none">
              <g clipPath="url(#clip0_1029_8152)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.95761 6.23153C2.27916 5.97432 2.72145 5.9273 3.09015 6.11113L19.979 14.5315C20.3366 14.7098 20.5625 15.0743 20.5625 15.4729C20.5625 15.8716 20.3366 16.2361 19.979 16.4144L3.09015 24.8347C2.72145 25.0186 2.27916 24.9715 1.95761 24.7143C1.63605 24.4571 1.49408 24.0368 1.59406 23.638L3.64116 15.4729L1.59406 7.30784C1.49408 6.90906 1.63605 6.48873 1.95761 6.23153ZM5.55335 16.5255L4.19875 21.9285L15.0356 16.5255H5.55335ZM15.0356 14.4204H5.55335L4.19875 9.01742L15.0356 14.4204Z"
                  fill={userInput.trim().length > 0 ? "#8100D7" : "#D0D7E6"}
                />
              </g>
              <defs>
                <clipPath id="clip0_1029_8152">
                  <path
                    d="M0.5625 0H20.5102V22C20.5102 26.4183 16.9285 30 12.5102 30H8.56251C4.14423 30 0.5625 26.4183 0.5625 22V0Z"
                    fill="white"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </section>
      </section>
    </div>
  )
}

export default ChatWindow

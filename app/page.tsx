"use client"
import Image from "next/image"
import uploadIcon from "../public/assets/images/icons/upload.svg"
import { IconButton } from "@mui/material"
import loaderGif from "../public/assets/images/loader.gif"
import WorklistTable from "@/components/WorklistTable"
import ChatWindow from "@/components/ChatWindow"
import CollectionTable from "@/components/CollectionTable"
import axios from "axios"
import { useEffect, useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [fileUploaded, setFileUploaded] = useState(false)
  axios.interceptors.request.use(async (config) => {
    config.baseURL = process.env.NEXT_PUBLIC_BASE_URL
    return config
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(null)
    const selectedFile = e.target.files && e.target.files[0]
    if (selectedFile) {
      // Check if the selected file is a PDF or XLS file
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/vnd.ms-excel" ||
        selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFile(selectedFile)
      } else {
        alert("Please select a PDF or XLS file.")
      }
    }
  }

  useEffect(() => {
    if (file) {
      handleUpload()
    }
  }, [file])

  const handleUpload = async () => {
    //  setLoading(true) // Show loader during upload
    try {
      const formData = new FormData()
      if (file) {
        formData.append("file", file)
        formData.append("fileUploaded", "true") // Additional flag
        setIsLoading(true)
        await axios
          .post("/update-worklist/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setFileUploaded(true)
            setDialogOpen(true)
            setTimeout(() => {
              setFileUploaded(false)
              setDialogOpen(false)
            }, 3000)
          })
          .catch((err) => console.log("ax err", err))
          .finally(() => {
            setIsLoading(false)
          })
        console.log("File uploaded successfully")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      //  setLoading(false) // Hide loader after upload completes
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <section className="header w-full h-[70px] flex items-center pl-[38px]">
        <h1 className="paragraph2">Smart Collections Advisor</h1>
      </section>
      {dialogOpen && (
        <section className="upload-dialog bg-[#57A942] rounded-lg pl-[30px] pr-[22px] py-[27px] w-fit flex flex-row items-center gap-10 absolute right-1.5 top-20 z-40">
          <h1>File uploaded successfully!</h1>
          <IconButton
            onClick={() => {
              setDialogOpen(false)
            }}
            aria-label="delete"
            className="p-0"
          >
            <CloseIcon className="text-white" />
          </IconButton>
        </section>
      )}

      <section className="flex flex-row gap-4 px-6">
        <div className=" w-[68.18%]">
          <section className="flex justify-between pt-[29px] text-purple-text">
            <p className="self-center paragraph3">Collection Worklist</p>
            <div className="flex flex-row gap-2.5">
              <p className="self-center paragraph4">BP Financial Data</p>

              <div className="btn-container relative">
                <div className="bg-primary px-[18px] py-[11px] rounded-[30px] hover:bg-purple-dark-100 cursor-pointer upload-btn w-[112px] h-[46px]">
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept=".pdf,.xls,.xlsx"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="fileInput" className="flex flex-row gap-2 cursor-pointer justify-center items-center">
                    {isLoading ? (
                      <Image src={loaderGif} alt="Loader Gif" className="w-6 h-6 " />
                    ) : (
                      <>
                        <Image src={uploadIcon} alt="Upload Icon" />
                        <p className="text-white">Upload</p>
                      </>
                    )}
                  </label>
                </div>
                <div className="tooltip  absolute top-full left-1/2 transform -translate-x-1/2 opacity-0  text-white py-2 px-4 rounded transition-opacity duration-300 bg-purple-dark-200  w-[120%] flex text-center mt-2 z-50">
                  Choose only .pdf, .xls files
                </div>
              </div>
            </div>
          </section>
          <section className="text-black mt-[22px]  ">
            {/* <WorklistTable /> */}
            <CollectionTable fileUploaded={fileUploaded} />
          </section>
        </div>
        <div className="w-[31.82%]">
          <ChatWindow />
        </div>
      </section>
    </main>
  )
}

"use client"
import React from "react"
import botIcon from "../public/assets/images/icons/chatBot.svg"
import Image from "next/image"
import { Box } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { FitScreen } from "@mui/icons-material"
interface ChatMessageProps {
  messages: { message: string | object; sender: "user" | "bot"; isTable?: boolean }[]
}
const ChatMessage = ({ messages }: ChatMessageProps) => {
  // const columns: GridColDef<(typeof rows)[number]>[] = [
  //   {
  //     field: "id",
  //     headerName: "ID",
  //     width: 20,
  //     headerClassName: "table-column paragraph5",
  //   },
  //   {
  //     field: "firstName",
  //     headerName: "First name",
  //     maxWidth: 150,
  //     editable: false,
  //     headerClassName: "table-column paragraph5",
  //   },
  //   {
  //     field: "lastName",
  //     headerName: "Last name",
  //     width: 80,
  //     editable: false,
  //     headerClassName: "table-column paragraph5",
  //   },
  //   {
  //     field: "age",
  //     headerName: "Age",
  //     type: "number",
  //     width: 50,
  //     editable: false,
  //     headerClassName: "table-column paragraph5",
  //   },
  // ]

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  // ]
  interface DataStructure {
    [key: string]: {
      [key: string]: any // You might want to specify the inner structure type here
    }
  }
  interface Row {
    id: number
    [key: string]: any
  }

  const TableData: React.FC<{ data: DataStructure }> = ({ data }) => {
    const columns: GridColDef<(typeof rows)[number]>[] = Object.keys(data).map((column) => {
      return {
        field: column,
        headerName: column,
        width: 150,
        // minWidth: 150,
        headerClassName: "table-column paragraph5",
      }
    })

    const rows: Row[] = []

    // Assuming all inner objects have the same keys
    if (Object.keys(data).length > 0) {
      const keys = Object.keys(data[Object.keys(data)[0]])

      keys.forEach((key, i) => {
        const row = { id: i }
        Object.keys(data).forEach((innerKey) => {
          ;(row as any)[innerKey] = data[innerKey][key]
        })
        rows.push(row)
      })
    }
    return (
      <Box
        sx={{
          width: "100%",
          // marginBottom: "32px",
        }}
      >
        <DataGrid
          sx={{
            "& ::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "& ::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              borderRadius: "3px",
            },
            "& .MuiButtonBase-root.MuiIconButton-root": {
              color: "#8100D6",
            },
          }}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          disableColumnMenu
          // disableColumnResize
          disableColumnSorting
          hideFooterPagination
          hideFooter
          getRowClassName={(params) => `paragraph7 bg-white`}
          slots={
            {
              // columnSortedDescendingIcon: SortedDescendingIcon,
              // columnSortedAscendingIcon: SortedAscendingIcon,
              // columnUnsortedIcon: UnsortedIcon,
            }
          }
        />
      </Box>
    )
  }

  return (
    <div className="flex flex-col gap-4 pt-6">
      {messages.map((message, i) => {
        if (message.sender === "bot")
          return (
            <section className="flex flex-row gap-2 pl-4  mr-8" key={i}>
              <Image src={botIcon} alt="Bot Icon" className="self-start" />
              <div className="bg-[#FBF1FF] rounded-lg p-3 text-black w-[100%] whitespace-pre-wrap paragraph1">
                {typeof message.message === "object" ? <TableData data={message.message} /> : message.message}
                {/* <Box
                  sx={{
                    width: "100%",
                    // marginBottom: "32px",
                  }}
                >
                  <DataGrid
                    sx={{
                      "& ::-webkit-scrollbar": {
                        width: "6px",
                        height: "6px",
                      },
                      "& ::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0,0,0,.1)",
                        borderRadius: "3px",
                      },
                      "& .MuiButtonBase-root.MuiIconButton-root": {
                        color: "#8100D6",
                      },
                    }}
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableColumnResize
                    disableColumnSorting
                    hideFooterPagination
                    hideFooter
                    getRowClassName={(params) => `paragraph7 bg-white`}
                    slots={
                      {
                        // columnSortedDescendingIcon: SortedDescendingIcon,
                        // columnSortedAscendingIcon: SortedAscendingIcon,
                        // columnUnsortedIcon: UnsortedIcon,
                      }
                    }
                  />
                </Box> */}
              </div>
            </section>
          )
        else
          return (
            <section key={i} className="bg-[#8100D7] p-3 rounded-lg ml-8 mr-4 self-end text-white w-[63%] paragraph1">
              {message.message}
            </section>
          )
      })}
    </div>
  )
}

export default ChatMessage

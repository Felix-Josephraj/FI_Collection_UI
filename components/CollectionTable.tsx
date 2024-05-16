"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import axios from "axios"

// const columns: GridColDef<(typeof rows)[number]>[] = [
//   { field: "id", headerName: "ID", width: 90, headerClassName: "table-column paragraph5" },
//   {
//     field: "firstName",
//     headerName: "First name",
//     width: 150,
//     editable: false,
//     headerClassName: "table-column paragraph5",
//   },
//   {
//     field: "lastName",
//     headerName: "Last name",
//     width: 150,
//     editable: false,
//     headerClassName: "table-column paragraph5",
//   },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 110,
//     editable: false,
//     headerClassName: "table-column paragraph5",
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
//     headerClassName: "table-column paragraph5",
//   },
// ]

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 10, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 11, lastName: "Roxie", firstName: "Harvey", age: 65 },
//   { id: 12, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ]

export function SortedDescendingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
      <path
        d="M1.80771 15.5C1.30257 15.5 0.875003 15.3205 0.525002 14.9615C0.175001 14.6024 0 14.1639 0 13.6457V11.6336C0 11.4153 0.0718002 11.2325 0.215401 11.0852C0.358984 10.9379 0.537185 10.8643 0.750002 10.8643C0.96282 10.8643 1.14102 10.9379 1.2846 11.0852C1.42819 11.2325 1.49998 11.4153 1.49998 11.6336V13.6457C1.49998 13.7246 1.53203 13.797 1.59613 13.8627C1.66025 13.9285 1.73077 13.9614 1.80771 13.9614H13.1923C13.2692 13.9614 13.3398 13.9285 13.4039 13.8627C13.468 13.797 13.5 13.7246 13.5 13.6457V11.6336C13.5 11.4153 13.5718 11.2325 13.7154 11.0852C13.859 10.9379 14.0372 10.8643 14.25 10.8643C14.4628 10.8643 14.641 10.9379 14.7846 11.0852C14.9282 11.2325 15 11.4153 15 11.6336V13.6457C15 14.1639 14.825 14.6024 14.475 14.9615C14.125 15.3205 13.6974 15.5 13.1923 15.5H1.80771ZM6.75002 3.07622L4.82694 5.04887C4.67822 5.20142 4.50162 5.27671 4.29714 5.27475C4.09265 5.27276 3.91285 5.19221 3.75771 5.0331C3.61284 4.87397 3.53785 4.69381 3.53274 4.49262C3.5276 4.29141 3.60259 4.11124 3.75771 3.95211L6.86732 0.762369C6.96091 0.666373 7.05962 0.598645 7.16347 0.559187C7.26731 0.519729 7.37948 0.5 7.5 0.5C7.62052 0.5 7.73269 0.519729 7.83652 0.559187C7.94038 0.598645 8.03909 0.666373 8.13268 0.762369L11.2423 3.95211C11.391 4.10466 11.4644 4.28318 11.4625 4.48767C11.4605 4.69216 11.3872 4.87397 11.2423 5.0331C11.0872 5.19221 10.909 5.27441 10.7077 5.27967C10.5064 5.28494 10.3282 5.208 10.1731 5.04887L8.24998 3.07622V10.9235C8.24998 11.1418 8.17819 11.3246 8.0346 11.4719C7.89102 11.6192 7.71282 11.6928 7.5 11.6928C7.28718 11.6928 7.10898 11.6192 6.9654 11.4719C6.82181 11.3246 6.75002 11.1418 6.75002 10.9235V3.07622Z"
        fill="white"
      />
    </svg>
  )
}
interface CollectionTableProps {
  fileUploaded: boolean
}

export default function CollectionTable({ fileUploaded }: CollectionTableProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [tableData, setTableData] = React.useState({ columns: [], rows: [] })

  React.useEffect(() => {
    if (fileUploaded) {
      getProcessFile()
    }
  }, [fileUploaded])
  const getProcessFile = async () => {
    setIsLoading(true)
    axios
      .post("/process_file")
      .then((res) => {
        console.log(res)
        const data = JSON.parse(res.data)
        const columns: GridColDef<(typeof rows)[number]>[] = Object.keys(data[0]).map((column) => {
          return {
            field: column,
            headerName: column,
            width: 150,
            // minWidth: 150,
            headerClassName: "table-column paragraph5",
          }
        })
        console.log(columns)
        setTableData((prev: any) => {
          return { ...prev, columns: columns }
        })

        const rows: object[] = data.map((row: any, i: any) => {
          return { ...row, id: i }
        })
        interface rowObject {
          [key: string]: any
        }
        const roundedData = rows.map((obj: rowObject) => {
          for (let key in obj) {
            if (typeof obj[key] === "number") {
              obj[key] = Number(obj[key]).toFixed(2)
            }
          }
          return obj
        })
        setTableData((prev: any) => {
          return { ...prev, rows: roundedData }
        })
      })
      //  .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    getProcessFile()
  }, [])

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "32px",
        height: "550px",
      }}
    >
      <DataGrid
        loading={isLoading}
        sx={{
          paddingBottom: "21px",
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
        rows={tableData.rows}
        columns={tableData.columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        getRowClassName={(params) => `paragraph7`}
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

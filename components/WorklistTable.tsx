// import React from 'react'

// const WorklistTable = () => {
//   return (
//     <div>WorklistTable</div>
//   )
// }
"use client"
import React, { useState } from "react"
import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"
import { visuallyHidden } from "@mui/utils"
import { Height } from "@mui/icons-material"

interface Data {
  id: number
  calories: number
  carbs: number
  fat: number
  name: string
  protein: number
}

function createData(id: number, name: string, calories: number, fat: number, carbs: number, protein: number): Data {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  }
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 556, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
  createData(14, "Nougat", 437, 18.0, 63, 4.0),
  createData(15, "Marshmallow", 437, 18.0, 63, 4.0),
  createData(16, "Lollipop", 437, 18.0, 63, 4.0),
  createData(17, "KitKat", 437, 18.0, 63, 4.0),
  createData(18, "Oreo", 437, 18.0, 63, 4.0),
]

const fiData = [
  {
    businessPartner: 18,
    nameOfBusinessPartner: "Amazon.com",
    descriptionOfPriority: "Critical",
    currency: "USD",
    outstanding: 32353000000,
    AmtToBeCollected: 32353000000,
  },
  {
    businessPartner: 32,
    nameOfBusinessPartner: "Walmart Inc.",
    descriptionOfPriority: "Medium",
    currency: "USD",
    outstanding: 7468820,
    AmtToBeCollected: 7468820,
  },
  {
    businessPartner: 21,
    nameOfBusinessPartner: "Target Corp",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
  {
    businessPartner: 22,
    nameOfBusinessPartner: "Amazon",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 300200,
    AmtToBeCollected: 3020000,
  },
  {
    businessPartner: 23,
    nameOfBusinessPartner: "Walmart",
    descriptionOfPriority: "Low",
    currency: "USD",
    outstanding: 20000,
    AmtToBeCollected: 70020000,
  },
  {
    businessPartner: 24,
    nameOfBusinessPartner: "Target Corp",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
  {
    businessPartner: 25,
    nameOfBusinessPartner: "Amazon.com",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
  {
    businessPartner: 26,
    nameOfBusinessPartner: "Target Corp",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
  {
    businessPartner: 27,
    nameOfBusinessPartner: "Target Corp",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
  {
    businessPartner: 28,
    nameOfBusinessPartner: "Target Corp",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
  {
    businessPartner: 29,
    nameOfBusinessPartner: "Target Corp",
    descriptionOfPriority: "High",
    currency: "USD",
    outstanding: 30020000,
    AmtToBeCollected: 30020000,
  },
]

const headCells: readonly HeadCell[] = [
  {
    id: "businessPartner",
    numeric: true,
    disablePadding: false,
    label: "Business Partner",
  },
  {
    id: "nameOfBusinessPartner",
    numeric: false,
    disablePadding: false,
    label: "Name of Business Partner",
  },
  {
    id: "descriptionOfPriority",
    numeric: false,
    disablePadding: false,
    label: "Description of Priority",
  },
  {
    id: "currency",
    numeric: false,
    disablePadding: false,
    label: "Currency",
  },
  {
    id: "outstanding",
    numeric: true,
    disablePadding: false,
    label: "Outstanding",
  },
  {
    id: "AmtToBeCollected",
    numeric: true,
    disablePadding: false,
    label: "Amt to be Collected",
  },
]

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = "asc" | "desc"

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  console.log("s")
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

interface HeadCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

interface EnhancedTableProps {
  // numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead
      sx={{
        // for default hover color
        "& .MuiTableSortLabel-root:hover, .MuiTableSortLabel-root:hover .MuiTableSortLabel-icon": {
          color: "#8100D6",
        },
        // for active case hover color
        "& .MuiTableSortLabel-root.Mui-active:hover, .MuiTableSortLabel-root.Mui-active:hover .MuiTableSortLabel-icon":
          {
            color: "#8100D6",
          },
        "& .MuiTableSortLabel-root.Mui-active": {
          color: "#8100D6",
        },
      }}
    >
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {/* <TableCell>Dessert (100g serving)</TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            className="text-secondary"
          >
            <TableSortLabel
              // IconComponent={'}
              className="text-nowrap"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function WorklistTable() {
  const [order, setOrder] = React.useState<Order>("asc")
  const [orderBy, setOrderBy] = React.useState<string>("calories")
  const [sortSelected, setSortSelected] = useState(false)
  const [selected, setSelected] = React.useState<readonly number[]>([])
  const [page, setPage] = React.useState(0)
  // const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    console.log(property)
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
    setSortSelected(true)
  }

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.id)
  //     setSelected(newSelected)
  //     return
  //   }
  //   setSelected([])
  // }

  // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
  //   const selectedIndex = selected.indexOf(id)
  //   let newSelected: readonly number[] = []

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id)
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1))
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1))
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
  //   }
  //   setSelected(newSelected)
  // }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  // const visibleRows = React.useMemo(
  //   () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [order, orderBy, page, rowsPerPage]
  // )

  function sortFunction(orderBy: string, order: Order, isNumeric: boolean) {
    return function (a: any, b: any) {
      const valueA = isNumeric ? parseFloat(a[orderBy]) : a[orderBy]
      const valueB = isNumeric ? parseFloat(b[orderBy]) : b[orderBy]
      let comparison = 0
      if (valueA > valueB) {
        comparison = 1
      } else if (valueA < valueB) {
        comparison = -1
      }
      return order === "asc" ? comparison : -comparison
    }
  }

  const sortedRows = React.useMemo(() => {
    // return stableSort(fiData, getComparator(order, orderBy))
    if (sortSelected) {
      const [{ numeric: isNumeric }] = headCells.filter((item) => item.id == orderBy)
      return fiData.sort(sortFunction(orderBy, order, isNumeric))
    } else {
      return fiData
    }
  }, [order, orderBy, page, rowsPerPage])

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, paddingBottom: "21px" }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        {/* <TableContainer sx={{maxHeight:"300px"}}> */}
        <TableContainer
          sx={{
            maxHeight: "550px",
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            // "&::-webkit-scrollbar-track": {
            //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            // },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              // outline: "1px solid slategrey",
              borderRadius: "3px",
            },
          }}
        >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              // numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {sortedRows.map((row, index) => {
                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    // role="checkbox"
                    // aria-checked={isItemSelected}
                    // tabIndex={-1}
                    key={row.businessPartner}
                    // selected={isItemSelected}
                    // sx={{ cursor: "pointer" }}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell> */}
                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell> */}
                    <TableCell align="left">{row.businessPartner}</TableCell>
                    <TableCell align="left">{row.nameOfBusinessPartner}</TableCell>
                    <TableCell align="left">{row.descriptionOfPriority}</TableCell>
                    <TableCell align="left">{row.currency}</TableCell>
                    <TableCell align="left">{row.outstanding}</TableCell>
                    <TableCell align="left">{row.AmtToBeCollected}</TableCell>
                    {/* <TableCell align="left">{row.protein}</TableCell> */}
                  </TableRow>
                )
              })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      {/* <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />
     } label="Dense padding" /> */}
    </Box>
  )
}

// export default WorklistTable

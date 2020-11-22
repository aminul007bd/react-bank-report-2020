import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { useTable, usePagination } from 'react-table'
import { Table, Pagination } from 'react-bootstrap'

export default function AppDataTable() {
  const [report, setReport] = useState([])

  const fetchURL = 'http://localhost:5000'
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${fetchURL}/report`)
      setReport(response.data)
    }

    fetchData()
  }, [])

  const columns = useMemo(
    () => [
      {
        Header: 'Bank ',
        accessor: 'body.bankName',
      },
      {
        Header: 'Bank BIC',
        accessor: 'body.bankBIC',
      },
      {
        Header: 'Report score value',
        accessor: 'body.reportScore',
      },
      {
        Header: 'Type of the report',
        accessor: 'body.type',
      },
      {
        Header: 'Created',
        accessor: 'createdAt',
      },
      {
        Header: 'Published',
        accessor: 'publishedAt',
      },
    ],
    []
  )

  const data = useMemo(() => report, [report])
  // Table start

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  )

  return (
    <div>
      <Table {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First />
        <Pagination.Prev onClick={() => previousPage()}/>
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next onClick={() => nextPage()}/>
        <Pagination.Last />
        </Pagination>
    </div>
  )
}


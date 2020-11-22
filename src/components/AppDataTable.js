import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table'
import { GlobalFilter } from './GlobalFilter'
import { ColumnFilter } from './ColumnFilter'
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
        Cell: ({value}) => { return format(new Date(value), 'dd/mm/yyyy')}
      },
      {
        Header: 'Published',
        accessor: 'publishedAt',
        Cell: ({value}) => { return format(new Date(value), 'dd/mm/yyyy')}
      },
    ],
    []
  )

  const data = useMemo(() => report, [report])

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )
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
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn
    },
    useGlobalFilter,
    useFilters,
    usePagination
  )


  return (
    <>
     <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Table {...getTableProps()} striped bordered hover>
        <thead> 
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
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
            <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
            <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
            <Pagination.Next onClick={() => nextPage()}  disabled={!canNextPage}/>
            <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
 
            <span className='ml-3 mr-3 mt-1'>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
            </span>
            <span className='mr-3'>
            | Go to page:{' '}
            <input
                type="number"
                className='custom-input'
                defaultValue={pageIndex + 1}
                onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
                }}
                style={{ width: '100px' }}
            />
            </span>{' '}
            <select
            className="custom-select-sm w-25"
            value={pageSize}
            onChange={e => {
                setPageSize(Number(e.target.value))
            }}
            >
            {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                Show {pageSize}
                </option>
            ))}
            </select> 
        </Pagination>
    </>
  )
}   


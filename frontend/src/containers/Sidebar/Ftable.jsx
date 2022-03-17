import React from 'react';
import { useTable} from 'react-table';
import styled from 'styled-components';

const Table = ({ columns, data}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data})

    return (
      <TableSheet {...getTableProps()}>
        <TableHead>
          {headerGroups.map(header => (
            <Header {...header.getHeaderGroupProps()}>
              {header.headers.map(col => (
                <Th {...col.getHeaderProps()}></Th>
              ))}  
            </Header>
          ))}
        </TableHead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </TableSheet>
    );
};


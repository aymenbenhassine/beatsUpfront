import { sentenceCase } from 'change-case';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from '../../Image';
import Label from '../../Label';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Music1', 159, 6.0, 24, 4.0),
  createData('Music2', 237, 9.0, 37, 4.3),
  createData('Music3', 262, 16.0, 24, 6.0),
  createData('Music4', 305, 3.7, 67, 4.3),
  createData('Music5', 356, 16.0, 49, 3.9),
];

export default function MusicTable({ single }) {
  const theme = useTheme();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cover</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>State</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {single.content.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                <Image
                  disabledEffect
                  alt={single.title}
                  src={single.cover}
                  sx={{ borderRadius: 1.5, width: 40, height: 40, mr: 2 }}
                />
              </StyledTableCell>
              <StyledTableCell>{row}</StyledTableCell>
              <StyledTableCell>{row}</StyledTableCell>
              <StyledTableCell>
                <Label
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={('out_of_stock' && 'error') || ('low_stock' && 'warning') || 'success'}
                >
                  {'12131231' ? sentenceCase('Locked') : ''}
                </Label>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

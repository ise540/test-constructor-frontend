import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router";
import LaunchIcon from '@mui/icons-material/Launch';
import { ITest } from "../../models/ITest";


interface TestItemProps {
  tests: ITest[];
}

export const TestTable: FC<TestItemProps> = ({ tests }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Go To Test</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test) => (
            <TableRow
              key={test.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {test.title}
              </TableCell>
              <TableCell align="left">{test.id}</TableCell>
              
              <TableCell align="left">
                <IconButton onClick={()=>navigate(`/passing-test/${test.id}`)}
                >
                  <LaunchIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

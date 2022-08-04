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
import LaunchIcon from "@mui/icons-material/Launch";
import { IComplitedTest } from "../../models/IComplitedtest";
import dateToString from "../../utils/DateToString";

interface CompletedTableProps {
  tests: IComplitedTest[];
}

export const CompletedTable: FC<CompletedTableProps> = ({ tests }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Completed At</TableCell>
            <TableCell align="left">Result</TableCell>
            <TableCell align="left">Action</TableCell>
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
              <TableCell component="th" scope="row">
                {test.id}
              </TableCell>
              <TableCell align="left">{dateToString(test.createdAt)}</TableCell>

              <TableCell align="left">{`${test.right}/${
                test.right + test.wrong
              }`}</TableCell>
              <TableCell align="left">
                <IconButton
                  onClick={() => navigate(`/passing-test/${test.testId}`)}
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

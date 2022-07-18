import {
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
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { ITest } from "../models/ITest";
import { setCurrentTest } from "../store/currentTest/currentTestSlice";
import dateToString from "../utils/DateToString";

interface TestItemProps {
  tests: ITest[];
}

export const TestTable: FC<TestItemProps> = ({ tests }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const testsState = useAppSelector((state) => state.tests.tests);

  const setUpdatedTest = (id: string) => {
    const updatedTest = testsState.find((item) => item.id === id);
    if (updatedTest) dispatch(setCurrentTest(updatedTest));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Created At</TableCell>
            <TableCell align="left">Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test) => (
            <TableRow
              key={test.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                navigate(`edit/${test.id}`);
                setUpdatedTest(test.id);
              }}
            >
              <TableCell component="th" scope="row">
                {test.title}
              </TableCell>
              <TableCell align="left">{test.id}</TableCell>
              {test.createdAt ? (
                <TableCell align="left">
                  {dateToString(test.createdAt)}
                </TableCell>
              ) : (
                <></>
              )}
              {test.updatedAt ? (
                <TableCell align="left">
                  {dateToString(test.updatedAt)}
                </TableCell>
              ) : (
                <></>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

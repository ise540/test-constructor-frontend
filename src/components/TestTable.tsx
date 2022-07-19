import { Delete } from "@mui/icons-material";
import {
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import { ITest } from "../models/ITest";
import TestService from "../services/TestService";
import { setCurrentTest } from "../store/currentTest/currentTestSlice";
import { removeTest } from "../store/tests/testsSlice";
import dateToString from "../utils/DateToString";
import { ConfirmModal } from "./ConfirmModal";

interface TestItemProps {
  tests: ITest[];
}

export const TestTable: FC<TestItemProps> = ({ tests }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const testsState = useAppSelector((state) => state.tests.tests);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("")

  const [deleteTestFunc, isLoading, error] = useFetching(async (id:string) => {
    await TestService.deleteTest(id)
  });

  const deleteTest = async () => {
    deleteTestFunc(selectedId);
    dispatch(removeTest(selectedId))
  };

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
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => {
                  navigate(`edit/${test.id}`);
                  setUpdatedTest(test.id);
                }}
              >
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
              <IconButton
                onClick={() => {
                  setOpen(true);
                  setSelectedId(test.id)
                }}
              >
                <Delete />
              </IconButton>

            </TableRow>
          ))}
        </TableBody>
        <ConfirmModal
                open={open}
                setOpen={setOpen}
                onConfirm={() => deleteTest()}
              >{`Are you sure to delete test "${selectedId}"`}</ConfirmModal>
      </Table>
    </TableContainer>
  );
};

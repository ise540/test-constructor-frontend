import { Delete, ModeEdit } from "@mui/icons-material";
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
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useFetching } from "../../hooks/useFetch";
import { ITest } from "../../models/ITest";
import TestService from "../../services/TestService";
import { setCurrentTest } from "../../store/currentTest/currentTestSlice";
import { removeTest } from "../../store/tests/testsSlice";
import dateToString from "../../utils/DateToString";
import { ConfirmModal } from "../ConfirmModal";

interface TestItemProps {
  tests: ITest[];
}

export const UserTestTable: FC<TestItemProps> = ({ tests }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const testsState = useAppSelector((state) => state.tests.tests);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const [deleteTestFunc, isLoading, error] = useFetching(async (id: string) => {
    await TestService.deleteTest(id);
  });

  const deleteTest = async () => {
    deleteTestFunc(selectedId);
    dispatch(removeTest(selectedId));
  };

  const setUpdatedTest = (id: string) => {
    const updatedTest = testsState.find((item) => item.id === id);
    if (updatedTest) dispatch(setCurrentTest(updatedTest));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">Created At</TableCell>
            <TableCell align="left">Updated At</TableCell>
            <TableCell align="left">Edit</TableCell>
            <TableCell align="left">Delete</TableCell>
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
              <TableCell align="left">
                <IconButton
                  onClick={() => {
                    navigate(`edit/${test.id}`);
                    setUpdatedTest(test.id);
                  }}
                >
                  <ModeEdit />
                </IconButton>
              </TableCell>
              <TableCell align="left">
                <IconButton
                  onClick={() => {
                    setOpen(true);
                    setSelectedId(test.id);
                  }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          onConfirm={() => deleteTest()}
        >{`Уверены, что хотите удалить тест "${selectedId}"?`}</ConfirmModal>
      </Table>
    </TableContainer>
  );
};

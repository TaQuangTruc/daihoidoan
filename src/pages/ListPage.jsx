import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { getListOfAttendances, resetDatabase } from "../service/service";

const ListPage = () => {
  const [list, setList] = useState([]); // State to hold the list of attendances
  const [statusMessage, setStatusMessage] = useState(""); // State to hold the status message

  const getList = async () => {
    try {
      const list = await getListOfAttendances();
      console.log(list);
      setList(list);
      setStatusMessage(""); // Clear any previous messages on success
    } catch (error) {
      setStatusMessage("Failed to retrieve the list. Please try again.");
    }
  };

  useEffect(() => {
    getList();
  }, [])


  return (
    <div>
      {statusMessage && (
        <Typography variant="body1" color="textSecondary" style={{ marginTop: "16px" }}>
          {statusMessage}
        </Typography>
      )}
      
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ và Tên</TableCell>
              <TableCell>Mã số</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.hoVaTen}</TableCell>
                <TableCell>{item.ms}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListPage;

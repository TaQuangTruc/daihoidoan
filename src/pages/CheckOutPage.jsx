import { useState } from "react";
import {
  Container,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { QrReader } from "react-qr-reader";
import {
  checkInUserByID,
  // handleCheckIn,
  // storeQRData,
} from "../service/service";

function CheckOutPage({ showScanner, showSearch }) {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleScanResult = async (result) => {
    if (result) {
      const id = result?.text;
      setScannedData(id);
      setDialogOpen(true);

      // try {
      //   // Store the scanned QR code in the database
      //   await storeQRData(id);
      // } catch (err) {
      //   console.error(err);
      //   setStatusMessage("Failed to store QR data.");
      // }
    }
  };

  const handleError = (error) => {
    console.error(error);
    setError("Scanning failed. Please try again.");
  };

  const handleCheckInClick = async () => {
    const idToCheckIn = studentId || scannedData;
    if (!idToCheckIn) {
      setStatusMessage("Please provide a valid ID.");
      return;
    }

    // Call the check-in function
    const responseMessage = await checkInUserByID(
      idToCheckIn,
      scannedData || ""
    );
    setStatusMessage(responseMessage);
  };

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  return (
    <Container
      sx={{
        padding: "0px !important",
        margin: "0px !important",
        width: "100vw",
        height: "100vh",
        maxWidth: "unset !important",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {showScanner && (
        <QrReader
          onResult={(result, error) => {
            if (result) {
              handleScanResult(result);
              setError(null); // Open the dialog when a scan is successful
            }
            if (error) {
              handleError(error);
            }
          }}
          constraints={{ facingMode: "environment" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1,
          }}
          videoContainerStyle={{
            width: "100vw",
            height: "100vh",
            paddingTop: "0px",
          }}
          videoStyle={{
            objectFit: "cover",
            width: "100vw",
            height: "100vh",
          }}
        />
      )}

      {showSearch && (
        <div>
          <Typography variant="h6">Search by ID</Typography>
          <TextField
            label="Student ID"
            variant="outlined"
            value={studentId}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckInClick}
            sx={{ marginTop: 2 }}
          >
            Check-In with ID
          </Button>
        </div>
      )}

      {error && (
        <Typography
          variant="h6"
          color="error"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {error}
        </Typography>
      )}

      {/* Dialog to show scanned data and confirm */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Scanned Data</DialogTitle>
        <DialogContent>
          <Typography variant="body1">ID: {scannedData}</Typography>
          {statusMessage && (
            <Typography variant="body2" color="green">
              {statusMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCheckInClick}
            color="primary"
            variant="contained"
          >
            Confirm Attendance
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CheckOutPage;

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
import { checkInUserByID } from "../service/service";
import { useTheme } from "@mui/material/styles";

function CheckInPage({ showScanner, showSearch }) {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [textDialogOpen, setTextDialogOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [studentId, setStudentId] = useState("");

  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";

  const handleScanResult = async (result) => {
    if (result) {
      const id = result?.text;
      setScannedData(id);
      setDialogOpen(true);
    }
  };

  const handleError = (error) => {
    console.log(error);
    setError("Scanning failed. Please try again.");
  };

  const handleSubmit = async () => {
    const idToCheckIn = studentId || scannedData;
    if (!idToCheckIn) {
      setStatusMessage("Please provide a valid ID.");
      return;
    }
    const responseMessage = await checkInUserByID(idToCheckIn);
    setStatusMessage(responseMessage);

    if (studentId) {
      setTextDialogOpen(true);
    }
  };

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleCloseTextDialog = () => {
    setTextDialogOpen(false);
    setStudentId(""); // Clear the input field
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
              setError(null);
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            background: "white"
          }}
        >
          <Typography variant="h6">Search by ID</Typography>
          <TextField
            label="Attendance ID"
            variant="outlined"
            value={studentId}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // Listen for Enter key
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                color: isDarkTheme ? "#fff" : "#000",
              },
            }}
            sx={{
              width: "80%",
              margin: "16px auto 8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: isDarkTheme ? "#fff" : "#000",
                },
                "&:hover fieldset": {
                  borderColor: isDarkTheme ? "#fff" : "#000",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "2px",
                  borderImage:
                    "linear-gradient(-225deg, #41c1ed 0%, #6fc7e9 100%) 1",
                },
              },
              "& .MuiInputLabel-root": {
                color: isDarkTheme ? "#fff" : "#000",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: isDarkTheme ? "#fff" : "#000",
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              width: "80%",
              margin: "0 auto",
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(-225deg, #ea6426 0%, #f1881b 100%)",
            }}
          >
            Check-In with ID
          </Button>
        </div>
      )}

      {error && !showSearch && (
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
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Confirm Attendance
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={textDialogOpen}
        PaperProps={{
          sx: { minWidth: "400px" },
        }}
        onClose={handleCloseTextDialog} // Close handler to clear input
      >
        <DialogTitle>Search for ID</DialogTitle>
        <DialogContent>
          <Typography variant="body1">ID: {scannedData}</Typography>
          {statusMessage && (
            <Typography variant="body2" color="green">
              {statusMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTextDialog}>Close</Button> {/* Clear input when closed */}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CheckInPage;

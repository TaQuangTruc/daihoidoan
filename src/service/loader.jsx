import * as XLSX from "xlsx";
import { ref, set } from "firebase/database";
import database from "../../firebaseConfig";

// Function to read and parse the Excel file, then add new fields
export const processExcelFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Add new fields to each record
      jsonData = jsonData.map((record) => ({
        ...record,
        checkedIn: false, // New boolean field for check-in status
        checkedOut: false, // New boolean field for check-out status
        qrCode: "", // Field for storing QR code
      }));

      resolve(jsonData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// Function to upload modified data to Firebase
export const uploadJsonToFirebase = async (jsonData) => {
  try {
    await set(ref(database, "attendance"), jsonData);
    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
};

export const convertExcelToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      resolve(json);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

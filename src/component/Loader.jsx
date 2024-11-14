import { useState } from "react";
import { convertExcelToJson, uploadJsonToFirebase } from "../service/loader";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const jsonData = await convertExcelToJson(file);
        await uploadJsonToFirebase(jsonData);
        alert("File uploaded successfully!");
      } catch (error) {
        alert("Error uploading file.");
        console.error(error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;

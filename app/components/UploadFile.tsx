// components/UploadFile.tsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface UploadFileProps {
  onDataUpload: (data: any[]) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onDataUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        onDataUpload(worksheet);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept=".xlsx, .xls"
        defaultValue={"xlsx"}
        onChange={handleFileChange}
        className="mb-4 p-2 border text-black"
      />
      <p className="text-gray-600 mb-4">Please upload an Excel file (.xlsx or .xls)</p>
      <button
        onClick={handleFileUpload}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadFile;

import { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface UseDataExportOptions {
  data: Record<string, string>[];
  headers?: string[];
  filename?: string;
}

export const useDataExport = ({
  data,
  headers,
  filename,
}: UseDataExportOptions) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadData = async () => {
    setIsExporting(true);

    try {
      await dataExport({ data, headers, filename });
      toast.success("Data exported successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export data");
    } finally {
      setIsExporting(false);
    }
  };

  return {
    handleDownloadData,
    isExporting,
  };
};

export const dataExport = ({
  data,
  headers,
  filename = `export-${new Date().toISOString().split("T")[0]}`,
}: {
  data: Record<string, string>[];
  headers?: string[];
  filename?: string;
}) => {
  if (!data || data.length === 0) {
    toast.error("No data to export");
    return;
  }

  const parsedData = data.map((d) => Object.values(d));
  const parsedHeaders = headers ?? Object.keys(data[0]);

  const worksheetData = [parsedHeaders, ...parsedData];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Prospects");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  downloadFile(buffer, filename);
};

const downloadFile = (buffer: ArrayBuffer, filename: string) => {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

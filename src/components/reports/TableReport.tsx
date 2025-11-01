import React from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

interface TableReportProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  /** Optional stable key extractor */
  getRowKey?: (row: T) => string | number;
}

export const TableReport = <T extends Record<string, any>>({
  data,
  columns,
  className = "",
  getRowKey,
}: TableReportProps<T>) => {
  if (!data || data.length === 0)
    return (
      <p className="text-center text-gray-400 py-6">
        Không có dữ liệu hiển thị
      </p>
    );

  return (
    <div
      className={`overflow-x-auto rounded-lg border border-gray-700 shadow-md ${className}`}
    >
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-800 sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-2 font-medium text-gray-200 border-b border-gray-700 whitespace-nowrap ${
                  col.align === "center"
                    ? "text-center"
                    : col.align === "right"
                    ? "text-right"
                    : "text-left"
                } ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => {
            const rowKey = getRowKey
              ? getRowKey(row)
              : (row as any)._id ?? (row as any).id ?? idx;

            return (
              <tr
                key={String(rowKey)}
                className="hover:bg-gray-700 transition-colors duration-200 odd:bg-gray-800 even:bg-gray-700"
              >
                {columns.map((col) => {
                  const cellValue = row[col.key];

                  return (
                    <td
                      key={String(col.key)}
                      className={`px-4 py-2 border-b border-gray-700 truncate ${
                        col.align === "center"
                          ? "text-center"
                          : col.align === "right"
                          ? "text-right"
                          : "text-left"
                      } ${col.className || "text-gray-200"}`}
                      title={
                        cellValue !== undefined && cellValue !== null
                          ? String(cellValue)
                          : ""
                      }
                    >
                      {col.render
                        ? col.render(cellValue, row)
                        : String(cellValue ?? "")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

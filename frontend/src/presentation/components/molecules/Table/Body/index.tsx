import { ReactNode } from "react";

import { Tbody, Td, Tr } from "@chakra-ui/react";

import { TableColumn, TableData } from "..";

interface TableBodyProps {
  columns: Array<TableColumn>;
  data: Array<TableData>;
}

const TableBody = (props: TableBodyProps) => {
  const data = props?.data || [];
  const columns = props?.columns || [];

  return (
    <Tbody>
      {data.map((data, index) => (
        <Tr key={`tr-data-key-${index}`}>
          {columns.map(({ key }, idxCol) => (
            <Td
              style={{ textAlign: "center" }}
              key={`data-${key}-key-${idxCol}`}
            >
              {data[key] as ReactNode}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableBody;

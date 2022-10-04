import { TableContainer, Table as TableUiLib } from "@chakra-ui/react";

import TableBody from "./Body";
import TableHeader from "./Header";
import Paginator from "./Paginator";

export type TableColumn = {
  header: string;
  key: string;
};

export type TableData = Record<string, unknown>;

interface TableProps {
  columns: Array<TableColumn>;
  data: Array<TableData>;
  total: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
}

const Table = (props: TableProps): JSX.Element => {
  if (props?.data?.length > props.pageSize) {
    props.data.length = props.pageSize;
  }

  return (
    <>
      <TableContainer>
        <TableUiLib variant="simple">
          <TableHeader columns={props.columns} />
          <TableBody columns={props.columns} data={props.data} />
        </TableUiLib>
      </TableContainer>
      <Paginator
        total={props.total}
        pageSize={props.pageSize}
        onPageChange={props.onPageChange}
      />
    </>
  );
};

export default Table;

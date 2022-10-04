import { Th, Thead, Tr } from "@chakra-ui/react";

import { TableColumn } from "..";

import * as S from "./styles";

interface TableHeaderProps {
  columns: Array<TableColumn>;
}

const TableHeader = (props: TableHeaderProps) => {
  const columns = props?.columns || [];
  return (
    <S.THead>
      <Tr>
        {columns.map(({ header }, index) => (
          <S.Th style={{ fontSize: "15px" }} key={`${header}-key-${index}`}>
            {header}
          </S.Th>
        ))}
      </Tr>
    </S.THead>
  );
};

export default TableHeader;

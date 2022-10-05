import { useState } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { TableData } from "..";

import * as S from "./styles";

export interface PaginatorProps {
  total: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  data: Array<TableData>;
}

const Paginator = (props: PaginatorProps): JSX.Element => {
  const [page, setPage] = useState(1);

  const getInitialValue = (): number => (page - 1) * props.pageSize + 1;
  const getEndValue = (): number => {
    const value = page * props.pageSize;
    return value >= props.total ? props.total : value;
  };

  const handleControlPage = (type: "add" | "sub"): void => {
    if (disabledButton) {
      return;
    }

    let newPageValue = type === "add" ? page + 1 : page - 1;
    if (newPageValue <= 0) {
      newPageValue = 0;
      return;
    }

    props?.onPageChange && props.onPageChange(newPageValue);

    setPage(newPageValue);
  };

  const disabledButton = getEndValue() >= props.total;
  return (
    <S.Container>
      <S.Wrapper>
        <S.Label>
          {props.data.length === 0
            ? "Sem dados"
            : `Mostrando ${getInitialValue()} a ${getEndValue()} de ${
                props.total
              }`}
        </S.Label>
        <S.WrapperButttons>
          <S.Button
            aria-label="Next"
            disabled={page === 1}
            icon={<ChevronLeftIcon />}
            onClick={() => handleControlPage("sub")}
          />
          <S.Button
            aria-label="Previous"
            disabled={disabledButton}
            icon={<ChevronRightIcon onClick={() => handleControlPage("add")} />}
          />
        </S.WrapperButttons>
      </S.Wrapper>
    </S.Container>
  );
};

export default Paginator;

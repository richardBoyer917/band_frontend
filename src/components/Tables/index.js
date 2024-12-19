import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, styled, PaginationItem, Pagination } from "@mui/material";

const StyledPaginationButton = styled(Button)(({ theme, disabled }) => ({
  height: "29px",
  background: "var(--primaryBgColor)",
  borderRadius: "29px",
  margin: "0 4px",
  padding: "0 11px",
  textTransform: "none",
  color: disabled ? "gray" : "#F7F7F7",
  fontSize: "15px",
  fontWeight: "300",
  borderColor: "gray",
  fontFamily: "Mulish",
  "&:hover": {
    backgroundColor: "transparent",
    borderColor: "black",
    color: "black",
  },
}));

const CustomPagination = ({ page, pageCount, onPageChange }) => {
  return (
    <div className="itemCenter">
      <StyledPaginationButton
        variant="contained"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        Назад
      </StyledPaginationButton>

      <Pagination
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => onPageChange(value - 1)}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              margin: "0 4px",
              minWidth: "28px",
              width: "28px",
              height: "28px",
              backgroundColor: "#D6D6D6",
              "&.Mui-selected": {
                backgroundColor: "black",
                color: "white",
              },
              "&.MuiPaginationItem-previousNext": {
                border: "none",
                color: "black",
                backgroundColor: "transparent",
              },
            }}
          />
        )}
      />

      <StyledPaginationButton
        variant="contained"
        onClick={() => onPageChange(page + 1)}
        disabled={page + 1 >= pageCount}
      >
        Вперед
      </StyledPaginationButton>
    </div>
  );
};

const DataTable = ({ id, columns, data }) => {
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const pageCount = Math.ceil(data?.length / pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <DataGrid
        rows={data?.slice(page * pageSize, (page + 1) * pageSize)}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        headerHeight={30}
        rowHeight={50}
        hideFooterPagination // Hide the default footer pagination
        // checkboxSelection
        sx={{
          overflow: "clip",
        }}
      />
      <br />
      {id !== "bestCase" && (
        <div className="spaceBetween">
          <CustomPagination
            page={page}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
          <span style={{ paddingRight: "10px" }}>
            <b>Всего:</b> {data?.length} кейсов
          </span>
        </div>
      )}
      <br />
    </>
  );
};

export { DataTable };

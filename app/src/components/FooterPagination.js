import React from "react";
import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import { Pagination } from "@mui/material";
import "./footerPagination.css";

const pageSize = 3;
const FooterPagination = ({ tableData, handlePageChange, handleDeleteSeleted }) => {
    return (
        <div className="pagination-container">
            {tableData ? (
                <Pagination
                    className="pagination"
                    tableData={tableData}
                    count={Math.ceil(tableData.length / pageSize)}
                    onChange={handlePageChange}
                    showFirstButton={true}
                    showLastButton={true}
                />
            ) : (
                <div className="loading">
                    Loading...
                </div>
            )}
        </div>
    )
}

export default FooterPagination;
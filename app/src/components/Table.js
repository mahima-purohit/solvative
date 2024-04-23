import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import FooterPagination from './FooterPagination';
import SearchBar from './Search';
import ReactFlagsSelect from 'react-flags-select';
import Flag from "react-country-flag"


const pageSize = 3;

const Table = ({
    tableData,
    handleSearch,
}) => {
    const [searchString, setSearchString] = useState("");
    const [pageData, setPageData] = useState([]);
    const [toRow, setToRow] = useState(pageSize);
    const [fromRow, setFromRow] = useState(0);
    useEffect(() => {
        updateFromTwoAndToRow();
    }, [searchString])

    useEffect(() => {
        const handlePageData = async () => {
            const data = await calculatePageData();
        }
        handlePageData();
    }, [tableData, searchString, fromRow, toRow]);

    /**
     * helper fn to initailize the toRow and fromRow states 
     */
    const updateFromTwoAndToRow = () => {
        setFromRow(0);
        setToRow(3);
    }

    //===================Table page handlers start here===========
    /**
     * 
     * @returns the data to be shown on single page.
     */
    const calculatePageData = async () => {
        const data = tableData.slice(fromRow, toRow);
        setPageData(data);
        return data;
    }
    /**
     * 
     * @param {*} event : page change event
     * @param {*} pageNo : the page clicked.
     */
    // const handlePageChange = (event, pageNo) => {
    //     setFromRow(pageSize * pageNo - 10);
    //     setToRow(pageSize * pageNo);
    //     calculatePageData();
    // }
    const handlePageChange = (event, pageNo) => {
        const newFromRow = (pageNo - 1) * pageSize;
        setFromRow(newFromRow);
        setToRow(newFromRow + pageSize);
        calculatePageData();
    }
    //===================Table Page handlers end here=============
    //===================Search Handlers Start here==============
    const searchOnChangeHandler = (value) => {
        console.log(value);
        setSearchString(value);
    }

    return (
        <div>
            <SearchBar
                searchOnChangeHandler={searchOnChangeHandler}
                handleSearch={() => handleSearch(searchString)}
            />
            <Box className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Place Name</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pageData.map((row, index) => {
                                return (
                                    <tr key={row.id}
                                        id="row"
                                    >
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div>
                                                {row.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <Flag
                                                    countryCode={row.countryCode}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </Box>
            <FooterPagination
                tableData={tableData}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default Table;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./wrapper.css";
import Table from "./Table";


const Wrapper = (props) => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        const onLoadHandler = async () => {
            await getCities();
        }
        onLoadHandler();
    }, []);

    const getCities = async () => {
        const options = {
            method: 'GET',
            url: process.env.REACT_APP_API_URL,
            params: { countryIds: 'IN', namePrefix: 'del', limit: '5' },
            headers: {
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_API_KEY,
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data.data);
            setData(response.data.data);
            setTableData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * @function {handleSearch}: a function to handle the search operation when provided with email, name, and role.
     * @param {} searchString : the value of the search word.
     */
    const handleSearch = (searchString) => {
        console.log("handle Search have been called");
        if (searchString) {
            if (data.length === 0) {
                alert("No Data found");
            }
            else {
                const tableDataAfterSearch = data.filter((row) => {
                    return (
                        row.name.toLowerCase().includes(searchString.toLowerCase())
                    )
                });
                if (tableDataAfterSearch.length === 0) {
                    alert(`No record present for ${searchString}`);
                }
                else setTableData(tableDataAfterSearch);
            }
        }
        else {
            setTableData(data);
        }
    }
    return (
        <div>
            <Table
                tableData={tableData}
                handleSearch={handleSearch}
            />
        </div>
    )
}
export default Wrapper;
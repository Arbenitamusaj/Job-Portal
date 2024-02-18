import { data } from 'autoprefixer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

export default function AppliedJobDataTable() {
    const router = useRouter();
    const appliedJobData = useSelector(state => state.AppliedJob.appliedJob)

    const [Data, setData] = useState([]);


    useEffect(() => {
        setData(appliedJobData)
    }, [])

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(Data);
    }, [Data])

    


    const columns = [
        {
            name: 'Apply Date',
            selector: row => new Date(`${row?.job?.createdAt}`).toLocaleDateString('en-GB'),
        },
        {
            name: 'Company',
            selector: row => row?.job?.company,
        },
        {
            name: 'Job title',
            selector: row => row?.job?.title,
        },
        {
            name: 'Job Salary ',
            selector: row => '$' + row?.job?.salary,
        },
        {
            name: 'Status',
            selector: row => <p className={`uppercase font-semibold ${row?.status === "approved" ? "text-green-500" : ""}  ${row?.status === "rejected" ? "text-red-600" : ""}`}>{row?.status}</p> ,
        },
    ];





    return (
        <>
            
                        <DataTable
                            subHeaderAlign={"right"}
                            columns={columns}
                            data={filteredData}
                            keyField="id"
                            pagination
                            title={`Total Applied Jobs: ${Data?.length}`}
                            fixedHeader
                            fixedHeaderScrollHeight='79%'
                            selectableRows
                            selectableRowsHighlight
                            subHeader
                            persistTableHead
                            
                            className="h-screen bg-white"
                        />
                   

        </>
    )
}

import './PlayerTable.css';
import React from 'react';
import { Table } from 'antd';


const PlayerTable = (props) => {

    return (
        <Table>
            columns = { columns }
            rowKey = { record => record._id }
            dataSource = { players }
            pagination = { pagination }
            loading = { loading }
            onChange = { handleTableChange }
        </Table>
    )
}


export default PlayerTable;
import './PlayerTable.css';
import Config from '../config';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';


const PlayerTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        players: [],
        pagination: {
            current: 1, //começa na pagina 1
            pageSize: 2, //tem por página 2 elementos
            total: 0 //total de players
        }
    });

    //criar hobbies
    const renderHobbies = (hobbies) => {
        return hobbies.map((hobbie) => {
            return (
                <label key = { hobbie._id }> { hobbie.name } </label>
            )
        })
    }

    //criar 3 colunas
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '20%',
        }, 
        {
            title: 'LastName',
            dataIndex: 'lastName',
            width: '20%',
        }, 
        {
            title: 'Hobbies',
            dataIndex: 'hobbies',
            render: renderHobbies,
        }, 
    ];

    const { players, pagination } = data;

    const fetchApi = (pageSize, current) => {
        const url = '/team/players?' + new URLSearchParams({
            limit: pageSize,
            skip: current - 1
        })


        fetch(url, {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

        .then((response) => response.json())

        .then((response) => {
            const { auth, players = [], pagination } = response;

            if(auth){
                setLoading(false);
                setData({
                    players,
                    pagination: {
                        current: pagination.page + 1 || 1,
                        pageSize: pagination.pageSize || 10,
                        total: pagination.total || 5
                    }
                })
            }
        });
    }


    useEffect(() => {
        fetchApi(data.pagination.pageSize, data.pagination.current);

        return () => setData({
            players: [],
            pagination: {
                current: 1,
                pageSize: 10
            }
        });
    }, []);


    const handleTableChange = (pagination) => {
        fetchApi(pagination.pageSize, pagination.current)
    };


    

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
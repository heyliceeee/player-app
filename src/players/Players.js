import Player from './Player';
import './Players.css';
import Config from '../config';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';


const Players = () => {

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('/team/players', {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

        .then((response) => response.json())

        .then((response) => {
            const { auth, players = [] } = response;

            if(auth){
                setLoading(false);
                setPlayers(response);
            }
        });

        return () => setPlayers([]);
    }, [])


    if(!Config.token){
        return <Navigate to={'/'}></Navigate>
    }

    if(loading){
        return <h1>LOADING</h1>
    }


    return (
        <div className="players">
            <label>PLAYERS: </label>
            <ul>
                { players.map((player) => <Player key={ player._id } { ...player }></Player>) }
            </ul>
        </div>
    )
}


export default Players;
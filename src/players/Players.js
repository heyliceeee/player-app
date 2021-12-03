import Player from './Player';
import './Players.css';
import Config from '../config';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import PlayersForm from './add/PlayersForm';
import { Link } from 'react-router-dom';


const Players = () => {

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const onClickShowForm = () => {
        setShowForm(!showForm);
    }

    //esta msg irá aparecer dentro do btn
    const showFormMessage = showForm ? 'Hide Form' : 'Show Form';

    useEffect(() => {
        fetch('/team/players', {
            headers: { 'Accept': 'application/json', 'x-access-token': Config.token }
        })

        .then((response) => response.json())

        .then((response) => {
            const { auth, players = [] } = response;

            if(auth){
                setLoading(false);
                setPlayers(players);
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
            <div className='links'>
                <Link to='/'>HomePage</Link>
                <button className='buttons' onClick={ onClickShowForm }>{ showFormMessage }</button>
            </div>

            <label>PLAYERS: </label>
            <div className='player-container'>{ players.map((player) => <Player key={ player._id } { ...player }></Player>) }</div>


            { showForm && <PlayersForm></PlayersForm> }
        </div>
    )
}


export default Players;
import './Players.css';
import Config from '../config';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import PlayersForm from './add/PlayersForm';
import { Link } from 'react-router-dom';
import PlayerTable from './PlayerTable';


const Players = () => {

    const [showForm, setShowForm] = useState(false);

    const onClickShowForm = () => {
        setShowForm(!showForm);
    }

    //esta msg irá aparecer dentro do btn
    const showFormMessage = showForm ? 'Hide Form' : 'Show Form';


    if(!Config.token){
        return <Navigate to={'/'}></Navigate>
    }


    return (
        <div className="players">
            <div className='links'>
                <Link to='/'>HomePage</Link>
                <button className='buttons' onClick={ onClickShowForm }>{ showFormMessage }</button>
            </div>

            <label>PLAYERS: </label>
            <div className='player-container'>
                <PlayerTable></PlayerTable>
            </div>


            { showForm && <PlayersForm></PlayersForm> }
        </div>
    )
}


export default Players;
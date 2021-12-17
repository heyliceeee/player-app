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


    const [userLogged, setUserLogged] = useState(true);

    const onClickLogout = () => {
        fetch('/auth/logout', {
            headers: { 'Accept': 'application/json' }
        })

        .then((response) => response.json())

        .then((response) => {
            if(response.logout){
                setUserLogged(false);
            }
        })

        .catch(() => {
            setUserLogged(false);
        })
    }
    

    useEffect(() => {
        fetch('/auth/me', {
            headers: { 'Accept': 'application/json' }
        })

        .then((response) => response.json())

        .then((response) => {
            setUserLogged(response.auth);
        })

        .catch(() => {
            console.log("redirecting");
            setUserLogged(false);
        })
    }, [])


   


    //esta msg irá aparecer dentro do btn
    const showFormMessage = showForm ? 'Hide Form' : 'Show Form';

    if(!userLogged){
            console.log("!userlogged");
            return <Navigate to={'/'}/>
        }

    return (
        <div className="players">
            <div className='links'>
                <Link to='/'>HomePage</Link>
                <button className='buttons' onClick={ onClickShowForm }>{ showFormMessage }</button>
                <button className='button' onClick={ onClickLogout }>Logout</button>
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
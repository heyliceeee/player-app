import { useForm } from "react-hook-form";
import './PlayersForm.css';
import Config from '../../config';


const PlayersForm = () => {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => postPlayer(buildPlayers(data));

    const postPlayer = (data) => {
        fetch('/team/players', {
            headers: { 'Content-Type': 'application/json', 'x-access-token': Config.token },
            method: 'POST',
            body: JSON.stringify(data)
        })

        .then((response) => {
            if(response.ok){
                return response.json();
            
            } else {
                alert("Player duplicate");
            }
        })

        .catch((err) => {
            console.error('error:', err);
        });
    }

    const buildPlayers = (data) => {
        return { ...data, hobbies: [{ name: data.hobbies }] }
    };


    return (
        <>
            <h2 className="titlePlayersForm">Players Form</h2>
            <form className="form-Players" onSubmit={ handleSubmit(onSubmit) }>
                <div className="field">
                    <label>Name: </label>
                    <input {...register('name')}></input>
                </div>

                <div className="field">
                    <label>LastName: </label>
                    <input {...register('Lastname')}></input>
                </div>

                <div className="field">
                    <label>Hobbies: </label>
                    <select {...register('hobbies')}>
                        <option value="Football">Football</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Golf">Golf</option>
                    </select>
                </div>

                <input className="submit" type="submit"></input>
            </form>
        </>
    );
}

export default PlayersForm;
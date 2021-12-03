import './Header.css';
import logo from '../../src/logo.svg';


const Header = (props) => {

    return (
        <header className="header">
            <div className="top-bar">
                <img className="logo" src={ logo } alt='logo'></img>
            </div>
        </header>
    )
}





export default Header;
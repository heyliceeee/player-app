import './App.css';
import Header from './header/Header';
import Players from './players/Players';
import PlayersForm from './players/add/PlayersForm';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Players></Players>
        <PlayersForm></PlayersForm>
      </main>
    </div>
  );
}

export default App;

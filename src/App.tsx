import "./App.scss";
import logo from "./assets/logo.svg"
import ToDoForm from "./components/ToDoForm/ToDoForm";
import ToDoList from "./components/ToDoList/ToDoList";

const App: React.FC = () => {

  return (
    <div className="app">
      <header className="header">
        <h1 className="header__title">ToDoList</h1>
        <img src={logo}
                    className="header__image"
                    alt="logo"
                    title="Удалить"/>
      </header>
      <main className="app__main">
        <ToDoForm />
        <ToDoList />
      </main>
      <footer className="app__footer"> 
      <p className="footer__copyright">© 2023. Мария Зеленова</p>
      </footer>
    </div>
  );
}

export default App;

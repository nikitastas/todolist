import './App.css';
import {Todolist} from './Todolist';

export function App() {
    return (
        <div className="App">
            <Todolist title = {"What to learn"}/>
            <Todolist title = {"Songs"}/>
            <Todolist title = {"Books"}/>
        </div>
    );
}

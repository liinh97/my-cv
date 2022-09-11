import React, { Component } from 'react';
import Index from "./Mycv/index";
import './App.css';
import SortableList from './Components/SortableList';
import DragDropFiles from './Components/DragDropFiles';

class App extends Component {
    
    render() {

        return (

            <div className="App">
                <Index />
            </div>

        );
    }
}

export default App;

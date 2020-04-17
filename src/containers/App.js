import React, { Component } from 'react';
import Persons from '../components/Persons/Persons'
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass'
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context'

import classes from './App.module.css';



class App extends Component {

  state = {
    persons: [
      { id: 1, name: 'Harun', age: 35 },
      { id: 2, name: 'Indah', age: 35 },
      { id: 3, name: 'Khairy', age: 4 }
    ],
    otherState: 'some other state',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    aunthenticated: false

  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[App.js] getDerivedStateFromProps', props);
  //   return state;
  // }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[App.js] shouldComponentUpdate');
  //   return true;
  // }

  // componentDidUpdate() {
  //   console.log('[App.js] componentDidUpdate');
  // }

  loginHandler = () => {
    this.setState ({ aunthenticated: true })
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );
    const person = { ...this.state.persons[personIndex] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    
    this.setState( (prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      }
      
    });
  }

  deletePersonHandler = ( personIndex ) => {
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render() {
    console.log('[App.js] render');
    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
        <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
            isAunthenticated={this.state.aunthenticated}
            />
      )
    }

    return (
        <Auxiliary>
          <button 
            onClick={() => {this.setState({ showCockpit: false }) }}>
              REMOVE COCKPIT
          </button>

          <AuthContext.Provider value={{
            aunthenticated: this.state.aunthenticated, 
            login: this.loginHandler
            }} >
            {
              this.state.showCockpit 
              ? 
                (
                  <Cockpit 
                    title={this.props.appTitle}
                    showPersons={this.state.showPersons}
                    persons={this.state.persons}
                    clicked={this.togglePersonsHandler}
                    // login={this.loginHandler}
                    />
                )
              : 
                null
            }
            
            {persons}
          </AuthContext.Provider>
          </Auxiliary>
    );
  }
}

export default withClass (App, classes.App);

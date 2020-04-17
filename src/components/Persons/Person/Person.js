import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'

import Auxiliary from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/withClass'

import classes from './Person.module.css';

class Person extends Component {

    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext
    
    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log(this.context.aunthenticated)
    }

    render () {        
        // console.log('[Person.js] rendering...')
        return(
            <Auxiliary>
                    {
                    this.context.aunthenticated 
                    ?
                    ( <p>Authenticated</p> ) 
                    :
                    ( <p>Please Log in</p> )
                    }

                <p onClick={this.props.click}>
                    I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input 
                    ref={this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name} />
                    
            </Auxiliary>
        )
    }
}

Person.propType = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass (Person, classes.Person);
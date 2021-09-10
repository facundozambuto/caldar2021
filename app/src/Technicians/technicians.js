import React, { Component } from 'react';
import { connect } from 'react-redux';

class Technicians extends Component {
    render() {
        return (
            <h1>Técnicos</h1>
        )
    }
}

const techniciansComponent = connect()(Technicians);
export {techniciansComponent as Technicians}

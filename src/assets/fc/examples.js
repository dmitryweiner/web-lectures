import React from 'react';

class ShowSomething extends React.Component {
    render() {
        return <span>{this.props.somethingToShow}</span>;
    }
}
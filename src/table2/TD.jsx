import React, { Component } from 'react';

class TD extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
    }
    update() {
      const val = 'hola desde td';
      this.props.updateState('now',val);
    }
    render() {
        return (
          <div>{this.props.element.id}</div>
        );
    }
}

export default TD;

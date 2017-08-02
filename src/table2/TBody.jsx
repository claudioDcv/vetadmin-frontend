import React, { Component } from 'react';
import TR from './TR';
import { makeKey } from './utils';

class TBody extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
    }
    update() {
      const val = 'hola desde tbody';
      this.props.updateState('now',val);
    }
    render() {
        return (
          <tbody>
          {this.props.tableState.dataset.results.map((e, key) => {
            return (<TR
              key={makeKey(key)}
              element={e}
              tableState={this.props.tableState}
              updateState={this.props.updateState}
            />)
          })}
          </tbody>
        );
    }
}

export default TBody;

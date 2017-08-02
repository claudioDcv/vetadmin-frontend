import React, { Component } from 'react';
import { makeKey } from './utils';

/*
columns[i].component(o, col, key)
*/

class TR extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
      this.TD = this.TD.bind(this);
      this.TDS = this.TDS.bind(this);
    }
    update() {
      const val = 'hola desde td';
      this.props.updateState('now',val);
    }
    TD(o, col, key) {

      let object = col.textEmpty;
      try {
      object = col.name.split('.').reduce((o,i)=>o[i], o)
      } catch (e) {
        console.warn(`atribute (${col.name}), non exist`, e.toString());
      } finally {

      }
      if (object === 'undefined') {
        console.warn(`atribute (${col.name}), is undefined`);
        object = col.textEmpty;
      }
      return (
        <td key={makeKey(key)}>
          {object}
        </td>
      );
    }
    componentAction(o) {
      const actions = this.props.tableState.config.table.thead.actions;
      if (actions.component) {
        return actions.component(o);
      }else{
        return undefined;
      }
    }
    TDS() {
      const o = this.props.element;
      return (
        <tr>
          {this.props.tableState.columns.map((col, key)=>{
            return col.component ? (
              <td key={makeKey(key)}>{col.component(o, col, key)}</td>):
              this.TD(o, col, key);
          })}
          {this.props.tableState.config.table.thead.actions ?
            (<td key="actions">{this.componentAction(o)}</td>): undefined}
        </tr>
      );
    }
    render() {
        return this.TDS();
    }
}

export default TR;

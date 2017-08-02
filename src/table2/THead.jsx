import React, { Component } from 'react';
import _ from './es';
import { makeKey } from './utils';
import HeaderBtn from './HeaderBtn';

class Thead extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
    }
    update() {
      this.props.initialState();
    }
    TH(e, key){
      return (
        <th key={makeKey(key)} className={e.className}>
          <HeaderBtn
            element={e}
            tableState={this.props.tableState}
            updateState={this.props.updateState}
            handlerInputSearch={this.props.handlerInputSearch}
          />
        </th>
      );
    }
    actions(){
      return(
        <th><span className="table2-btn-ordering-disabled">{_.actions}</span></th>
      )
    }
    render() {
        const thead = this.props.tableState.config.table.thead;
        return (
          <thead className={thead.className}>
            <tr>
              {this.props.tableState.columns.map((e, key) => {
                return this.TH(e, key);
              })}
              {thead.actions ? this.actions() : undefined}
            </tr>
          </thead>
        );
    }
}

export default Thead;

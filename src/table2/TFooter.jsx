import React, { Component } from 'react';
import Paginator from './Paginator';

class TFooter extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
    }
    update() {
      const val = 'hola desde tfoot';
      this.props.updateState('now',val);
    }
    render() {
        const state = this.props.tableState;
        return (
          <tfoot>
            <tr>
              <td colSpan={state.columns.length + (state.config.table.thead.actions ? 1 : 0)}>
                {state.paginator.pages === 1 ? undefined : (
                  <Paginator
                    tableState={this.props.tableState}
                    updateState={this.props.updateState}
                  />
                )}
              </td>
            </tr>
          </tfoot>
        );
    }
}

export default TFooter;

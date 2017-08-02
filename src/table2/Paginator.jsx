import React, { Component } from 'react';

import {
  PAGINATOR_GOTO_PAGE,
  PAGINATOR_PREV_PAGE,
  PAGINATOR_NEXT_PAGE,
} from './const';

import { makeKey } from './utils';

class Paginator extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
    }
    update(key, val) {
      this.props.updateState(key,val );
    }
    prevBtn(){
      const isDisabled = this.props.tableState.paginator.firstPage;
      const classDisabled = isDisabled  ? 'disabled' : '';
      return (
        <li className={classDisabled}>
          <a
            role="button"
            tabIndex="0"
            onClick={(e) => {if(!isDisabled){
              this.update(PAGINATOR_PREV_PAGE)
            }}}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
      );
    }
    nextBtn(){
      const isDisabled = this.props.tableState.paginator.lastPage;
      const classDisabled = isDisabled  ? 'disabled' : '';
      return (
        <li className={classDisabled}>
          <a
            role="button"
            tabIndex="0"
            onClick={(e) => {if(!isDisabled){
              this.update(PAGINATOR_NEXT_PAGE)
            }}}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      );
    }
    numberPagination() {
        const config = this.props.tableState.config.paginator;
        const paginator = this.props.tableState.paginator;
        const current = paginator.current;
        if (paginator) {
            const lengthPagation = [];
            const min = current - config.prevLink < 1 ? 1 : current - config.prevLink;
            const max = current + config.nextLink > paginator.pages ? paginator.pages : paginator.current + config.nextLink;

            for (let i = min; i <= max; i += 1) {
                lengthPagation.push(i);
            }

            return lengthPagation.map((nPage, key) => {
                const classCurrent = current === nPage ? 'active' : '';
                if (classCurrent === 'active') {
                    return (<li key={makeKey(key)} className={classCurrent}><span>{nPage}</span></li>);
                }
                return (
                  <li key={makeKey(key)}>
                    <a
                      className={classCurrent}
                      role="button"
                      tabIndex="0"
                      onClick={(e) => this.update(PAGINATOR_GOTO_PAGE, nPage)}
                    >{nPage}</a></li>);
            });
        }
        return undefined;
    }
    render() {
        return (
          <ul className="pagination">
            {this.prevBtn()}
            {this.numberPagination()}
            {this.nextBtn()}
          </ul>
        );
    }
}

export default Paginator;

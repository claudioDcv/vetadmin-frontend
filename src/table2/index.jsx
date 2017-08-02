import React, { Component } from 'react';
import './style.css';
import THead from './THead';
import TBody from './TBody';
import TFooter from './TFooter';

import {
  PAGINATOR_GOTO_PAGE,
  PAGINATOR_PREV_PAGE,
  PAGINATOR_NEXT_PAGE,
  RESULTS_ORDERING,
} from './const';

import ajax from './conector/ajax';

import {
  updateQueryStringParameter,
  makePaginator,
  extractParamFromQueryString,
  removeQueryStringParameter,
} from './utils';
import { errorInitialTable } from './errorReport';

import Select from './plugins/Select/index';

class Table2 extends Component {
    constructor(props) {
      super(props);

      this.name = 'Table2';
      this.version = 'v2.0.0';
      this.state = {
        initiaAjax: {...props.config.ajax},
        config: props.config,
        now: new Date().toString(),
        dataset: {
          results: [],
        },
        columns: props.config.columns,
        paginator: {},
        inputSearch: {},
      };
      this.updateState = this.updateState.bind(this);
      this.ajaxGotoPage = this.ajaxGotoPage.bind(this);
      this.initialState = this.initialState.bind(this);
      this.updateQueryStringOut = this.updateQueryStringOut.bind(this);
      this.handlerInputSearch = this.handlerInputSearch.bind(this);
      if (errorInitialTable(props)) {
        this.init();
      }
    }
    handlerInputSearch(key, value){
      const i = this.state.inputSearch;
      i[key] = value;
      this.setState({inputSearch: i });

      if (this.state.inputSearch && this.state.paginator.actual) {
        let url = this.state.paginator.actual;
        const o = this.state.inputSearch;
        for (const v in o) {
          if (o.hasOwnProperty(v)) {
            if (o[v].value) {
              url = updateQueryStringParameter(url, o[v].search, o[v].value);
            }else{
              url = removeQueryStringParameter(url, o[v].search);
            }
          }
        }
        this.ajaxConector({
          url,
          method: this.state.initiaAjax.method,
        }, (dataset, response, opt) => {
          this.setStateService(dataset, response, opt);
        });
      }
    }
    updateState(key, val) {
      const data = this.state;
      switch (key) {
        case PAGINATOR_GOTO_PAGE:
          this.ajaxGotoPage(val);
        break;
        case PAGINATOR_PREV_PAGE:
          this.ajaxConector({
            method: this.state.initiaAjax.method,
            url: this.state.paginator.prev,
          }, (dataset, response, opt) => {
            this.setStateService(dataset, response, opt);
          });
        break;
        case PAGINATOR_NEXT_PAGE:
          this.ajaxConector({
            method: this.state.initiaAjax.method,
            url: this.state.paginator.next,
          }, (dataset, response, opt) => {
            this.setStateService(dataset, response, opt);
          });
        break;
        case RESULTS_ORDERING:
          this.ajaxConector({
            method: this.state.initiaAjax.method,
            url: this.compareOrderingParam(val),
          }, (dataset, response, opt) => {
            this.setStateService(dataset, response, opt);
          });
        break;
        default:
          data[key] = val;
          this.setState(data);
          this.ajax();
      }
    }
    updateQueryStringOut(cb){
      const o = cb(this.state.paginator);
      let url = this.state.paginator.actual;
      for (const v in o) {
        if (o.hasOwnProperty(v)) {
          console.log(v, o[v]);
          url = updateQueryStringParameter(url, v, o[v]);
        }
      }
      this.setState({inputSearch: {} });
      this.ajaxConector({
        url,
        method: this.state.initiaAjax.method,
      }, (dataset, response, opt) => {
        this.setStateService(dataset, response, opt);
      });
    }
    compareOrderingParam(val){
      let param = '';
      const url = this.state.paginator.actual;
      if (this.state.paginator.orderingMode === '-') {
        param = val;
      }else{
        param = `-${val}`;
      }
      let urlCreate = updateQueryStringParameter(url, 'ordering', param);

      const o = this.state.inputSearch;
      for (const v in o) {
        if (o.hasOwnProperty(v)) {
          if (o[v].value) {
            urlCreate = updateQueryStringParameter(urlCreate, o[v].search, o[v].value);
          }
        }
      }
      return urlCreate;
    }
    // AJAX
    ajax() {
      const cbResponse = (dataset, response, opt) => {
        if (this.state.config.cbAfterSend) {
          this.state.config.cbAfterSend(dataset);
        }
        this.setStateService(dataset, response, opt);
      }
      this.ajaxConector(this.state.config.ajax, cbResponse);
    }
    ajaxConector(config, cb) {
      if (this.state.config.cbBeforeSend) {
        this.state.config.cbBeforeSend(config);
      }
      ajax(config, cb);
    }
    setStateService(dataset, response, opt) {
      const currentUrl = this.state.initiaAjax.url;
      this.setState({
        dataset,
        paginator: makePaginator(dataset, currentUrl, response, opt)
      });
    }
    initialState() {
      const initiaAjax = this.state.initiaAjax;
      this.setState({inputSearch: {} });
      this.ajaxConector(initiaAjax, (dataset, response, opt) => {
        this.setStateService(dataset, response, opt);
      });
    }
    ajaxGotoPage(nPage) {
      const configAjax = this.state.config.ajax;
      let url = this.state.paginator.actual;
      url = updateQueryStringParameter(url, 'offset', this.state.paginator.limit * (nPage - 1));
      configAjax.url = updateQueryStringParameter(url, 'limit', this.state.paginator.limit);
      this.ajaxConector(configAjax, (dataset, response, opt) => {
        this.setStateService(dataset, response, opt);
      });
    }
    init(){
      this.ajax();
    }
    render() {
        return (
          <div>
            {this.state.config.table.resetButton ?
            (<button
              onClick={this.initialState}
              className={this.state.config.table.resetButton.className}
            >{this.state.config.table.resetButton.title}</button>) : undefined}
            <table className={`table-2-new ${this.state.config.table.className}`}>
              <THead
                initialState={this.initialState}
                tableState={this.state}
                updateState={this.updateState}
                handlerInputSearch={this.handlerInputSearch}
              />
              <TBody
                tableState={this.state}
                updateState={this.updateState}
              />
              <TFooter
                tableState={this.state}
                updateState={this.updateState}
              />
            </table>
            {this.state.config.debug ? (
              <div>
                {this.state.config.debug.inputSearch ? (
                  <pre>{JSON.stringify(this.state.inputSearch, undefined, 4)}</pre>) :undefined}
                {this.state.config.debug.initiaAjax ? (
                  <pre>{JSON.stringify(this.state.initiaAjax, undefined, 4)}</pre>) :undefined}
                {this.state.config.debug.paginator ? (
                  <pre>{JSON.stringify(this.state.paginator, undefined, 4)}</pre>) :undefined}
                {this.state.config.debug.dataset ? (
                  <pre>{JSON.stringify(this.state.dataset, undefined, 4)}</pre>) :undefined}
              </div>
            ):null}
          </div>
        );
    }
}

export {
  Select,
  updateQueryStringParameter,
  extractParamFromQueryString,
};
export default Table2;

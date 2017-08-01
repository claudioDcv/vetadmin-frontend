import React from 'react';
import { ajax , makePaginator} from './conector.js';

class Table extends React.Component {
  constructor(props){
    super(props);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      ajax: {
        url: 'http://127.0.0.1:8000/colors/',
        method: 'GET',
      },
      dataset: {
        results: [],
      },
      paginator: {},
    };
    this.ajaxInit();
  }
  next(){
    const fn = (dataset) => {
      this.setState({
        paginator: makePaginator(dataset, this.state.ajax.url),
        dataset
      });
    }
    if (!this.state.paginator.lastPage) {
      ajax(this.state.paginator.next, fn);
    }
  }
  prev(){
    const fn = (dataset) => {
      this.setState({
        paginator: makePaginator(dataset, this.state.ajax.url),
        dataset
      });
    }
    if (!this.state.paginator.firstPage) {
      ajax(this.state.paginator.prev, fn);
    }
  }
  ajaxInit(){
    const fn = (dataset) => {
      this.setState({
        paginator: makePaginator(dataset, this.state.ajax.url),
        dataset
      });
    }
    ajax(this.state.ajax, fn);
  }
  render(){
    return (
      <div>
        <div className="btn-group">
          <button className="btn btn-default" disabled={this.state.paginator.firstPage} onClick={this.prev}>Anterior</button>
          <button className="btn btn-default" disabled={this.state.paginator.lastPage} onClick={this.next}>Siguiente</button>
        </div>
        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <th>head</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataset.results.map((e, key) => {
              return (
                <tr key={key}>
                  <td>{e.name}</td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td><pre>{JSON.stringify(this.state.paginator, undefined, 2)}</pre></td>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

export default Table;

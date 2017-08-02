import React from 'react'
import { start } from '../../services/utlis.js';
import Table2, { Select as Table2Select }from '../../table2/Index.jsx';
import axios from 'axios';

const base_url = 'http://127.0.0.1:8000';

const getData = (input, callback) => {
  const list = () => {
    return axios({
      url: `${base_url}/colors/?skip_pagination`,
      method: 'GET',
    }).then(e => e.data.map(i => ({ value: i.id, label: i.name })));
  };
  list().then(e => {
    callback(null, {
      options: e,
      complete: true,
    });
  });
};


export default () => (
  <div>
    <h1>About Us</h1>
    <p>Hello Medium!</p>
    <Table2
      ref={(e) => this.table = e}
      config={{
        ajax: {
          url: `${base_url}/colors/`,
          method: 'GET',
          liveHeaders: () => ({}),
        },
        debug: {
          inputSearch: true,
          paginator: true,
          initiaAjax: false,
          dataset: false,
        },
        cbBeforeSend: false,
        cbAfterSend: false,
        table: {
          className: 'table table-hover table-sm',
          resetButton: {
            className: 'btn btn-danger',
            title: 'Reiniciar',
          },
          thead: {
            className: '',
            actions: {
              className: '',
              component: (e) => (<div>{e.id}</div>),
            },
          },
        },
        paginator: {
          prevLink: 3,
          nextLink: 3,
        },
        columns: [
          {
              title: 'ID',
              name: 'id',
              textEmpty: 'Sin nombre',
              input: 'id',
              inputProps: {
                clearable: false,
              },
              getData: getData,
              componentInput: Table2Select,
          },
          {
              title: 'Nombre',
              name: 'name',
              textEmpty: 'Sin nombre',
              input: 'name__icontains',
              inputPlaceholder: 'Ingrese nombre a buscar',
              inputClassName: 'form-control',
          },
        ],
      }}
    />
  </div>
)

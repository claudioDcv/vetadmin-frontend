import React from 'react';
import axios from 'axios';
import Table2 from 'tabl3/tabl3';

const baseUrl = 'http://127.0.0.1:8000';

const ajax = (opt, callback, errorCallback, nonErrorAjax, onAfterSend) => {
  axios(opt).then(
    (response) => {
      nonErrorAjax();
      callback(response.data, response, opt);
      onAfterSend(response);
    },
    (response) => { errorCallback(response); },
  );
};


export default () => (
  <div>
    <h1>About Us</h1>
    <button onClick={() => {
      this.table.updateQueryStringOut(() => ({
        limit: 1,
        offset: 1,
      }));
    }}
    >Click</button>
    <p>Hello Medium!</p>
    <Table2
      ref={(e) => { this.table = e; }}
      config={{
        ajax: {
          url: `${baseUrl}/colors/?limit=4`,
          method: 'GET',
          liveHeaders: () => ({}),
          test: true,
        },
        conector: ajax,
        debug: {
          inputSearch: true,
          paginator: true,
          initiaAjax: false,
          dataset: true,
        },
        onBeforeSend: (e) => { console.log(e); },
        onAfterSend: (e) => { console.log(e); },
        errors: {
          onAjaxError: (e) => { console.log(e); },
        },
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
              component: e => (<div>{e.id}</div>),
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
);

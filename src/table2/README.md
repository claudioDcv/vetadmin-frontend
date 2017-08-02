# Table2

- Example

- `<table2new config="{config}" />`

- `config`:

- `config.ajax`: {object}

- `config.ajax.url`: {string} => service url

- `config.ajax.method`: {string} => method HTTP

- `config.debug` (optional): {object}

- `config.debug.inputSearch` (optional): {boolen} => activate debug inputSeach

- `config.debug.paginator` (optional): {boolen} => activate debug paginator

- `config.debug.initiaAjax` (optional): {boolen} => activate debug initialAjax

- `config.debug.dataset` (optional): {boolen} => activate debug dataset

- `config.cbBeforeSend`: {boolen/function} => callback(configAjax)

- `config.cbAfterSend`: {boolen/function} => classback(resultDataset)

- `config.table`:

- `config.table.className`: 'table table-hover table-sm',

- `config.table.resetButton`:

- `config.table.resetButton.className`: {string}

- `config.table.resetButton.title`: {string}

- `config.table.thead`: {

- `config.table.thead.className`:

- `config.table.thead.actions` (optional): {object}

- `config.table.thead.actions.className` (optional): {string} => css class to actions columns

- `config.table.thead.actions.component` (optional): {funciton} => callback(instanceColumnsArray)

- `paginator`:

- `paginator.prevLink`: {int}

- `paginator.nextLink`: {int}

- `columns`:

- `columns.title`: 'ID',

- `columns.name`: 'id',

- `columns.textEmpty`: 'Sin nombre',

- `columns.input`: 'id',

- `columns.ordering` (optional): {boolen/string} => false: hide ordering, true: ordering by name

- `columns.inputPlaceholder` (optional): {string} => text show in input search

- `columns.inputClassName`: 'form-control',

- `columns.component`: App.id,

- `columns.componentInput`: App.idSearch,

```javascript

import React from 'react';
import PropTypes from 'prop-types';

import Table2New from '../components/Table2New/Index';

class App extends React.Component {
    static id(instance) {
      return <span>{instance.id}</span>
    }
    static idSearch(handlerChange, instance, value) {
      return (
        <input
          className={instance.inputClassName}
          placeholder={instance.placeholder}
          onChange={handlerChange}
          value={value}
        />
      );
    }
    static actions(instance) {
      return <button className="btn btn-primary">{instance.id}</button>
    }

    render(){
        return(
            <div className="wrapper">
                <button className="btn btn-lg btn-primary btn-block"
                onClick={this.handleClick}>{_('loginBtn')}</button>
                {this.props.session.showError ? this.alertInstance() : null}
                {this.props.session.showSuccess ? this.successInstance() : null}
              </form>
              <button onClick={(e) => {
                this.table.updateQueryStringOut((paginator) => (
                  { offset: 0, limit: 10 }));
              }}>limit 10</button>
              <button onClick={(e) => {
                this.table.updateQueryStringOut((paginator) => (
                  { offset: 0, limit: 30 }));
              }}>limit 30</button>
              <button onClick={(e) => {
                this.table.updateQueryStringOut((paginator) => (
                  { offset: 0, limit: 50 }));
              }}>limit 50</button>
              <button onClick={(e) => {
                this.table.updateQueryStringOut((paginator) => (
                  { offset: 0, limit: 100 }));
              }}>limit 100</button>
              <Table2New
                ref={(e) => this.table = e}
                config={{
                  ajax: {
                    url: 'http://127.0.0.1:8000/api/v1/resources/persons/?ordering=-name',
                    method: 'GET',
                  },
                  debug: {
                    inputSearch: false,
                    paginator: false,
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
                        component: App.actions,
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
                        component: App.id,
                        componentInput: App.idSearch,
                    },
                    {
                        title: 'Nombre',
                        name: 'name',
                        textEmpty: 'Sin nombre',
                        input: 'name__icontains',
                        inputPlaceholder: 'Ingrese nombre a buscar',
                        inputClassName: 'form-control',
                    },
                    {
                        title: 'Apellidos',
                        name: 'last_names',
                        textEmpty: 'Sin nombre',
                        input: 'last_names__icontains',
                    },
                    {
                        title: 'RUT',
                        name: 'rut',
                        textEmpty: 'Sin nombre',
                    },
                    {
                        title: 'Nombre',
                        name: 'name',
                        textEmpty: 'Sin nombre',
                    },
                    {
                        title: 'ID',
                        name: 'organization.id',
                        ordering: false,
                        textEmpty: 'Sin ID',
                        input: 'organization__id__icontains',
                    },
                  ],
                }}
              />
            </div>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired,
};

export default Login;
```

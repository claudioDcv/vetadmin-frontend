import React, { Component } from 'react';
import { RESULTS_ORDERING } from './const';
import _ from './es';

class HeaderBtn extends Component {
    constructor(props){
      super(props);
      this.update = this.update.bind(this);
      this.handlerChangeInput = this.handlerChangeInput.bind(this);
    }
    componentDidMount(){
      this.props.handlerInputSearch(this.nameInputSearch(this.props.element), {
        value: '',
        search: this.props.element.input,
      },{ mode: 'init' });
    }
    nameInputSearch(element){
      return element.name;
    }
    update() {
      const ordering = this.props.element.ordering || this.props.element.name;
      this.props.updateState(RESULTS_ORDERING, ordering);
    }
    makeClassName(){
      const paginator = this.props.tableState.paginator;
      const element = this.props.element;
      let className = 'table2-btn-ordering';
      const orderingAsc = `${className} table2-btn-ordering-asc`;
      const orderingDesc = `${className} table2-btn-ordering-desc`;

      if (element.name === paginator.orderingBy) {
          className = paginator.orderingMode === '' ? orderingDesc : orderingAsc;
      }
      return className;
    }
    handlerChangeInput(event){
      let value = event || '';
      if (event instanceof Array) {
        if (event.length === 0) {
          value = '';
        }
      }
      this.props.handlerInputSearch(this.nameInputSearch(this.props.element),{
        value: value.target ? value.target.value : (value.value || value),
        search: this.props.element.input,
      });
    }
    makeInput() {
      const inputSearch = this.props.tableState.inputSearch;
      const inputPlaceholder = this.props.element.inputPlaceholder;
      const title = this.props.element.title;
      const placeholder = inputPlaceholder ? inputPlaceholder : `${_.placeholder} ${title}`;
      this.props.element.placeholder = placeholder;

      const val = inputSearch[this.props.element.name] || {
        value: '',
        search: this.props.element.input,
      };
      const className = this.props.element.inputClassName || 'form-control';
      this.props.element.inputClassName = className;
      const input = inputSearch ? (
        <input
          value={val.value}
          onChange={this.handlerChangeInput}
          placeholder={placeholder}
          className={this.props.element.inputClassName}
        />
      ) : undefined;
      const element = this.props.element;
      const component = element.componentInput ? element.componentInput(this.handlerChangeInput, element, val.value) : input;
      return component;
    }
    render() {
        const button = this.props.element.ordering !== false ? (
          <button className={this.makeClassName()} onClick={this.update}>{this.props.element.title}</button>
        ) : (<span className="table2-btn-ordering-disabled">{this.props.element.title}</span>);
        const inputSearch = this.props.element.input ? this.makeInput() : undefined;
        return (
          <div>
            {button}
            <div className="table2-input-search-container">
              {inputSearch}
            </div>
          </div>
        );
    }
}

export default HeaderBtn;

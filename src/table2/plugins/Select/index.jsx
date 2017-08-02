import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


const select = (handlerChangeInput, instance, value) => {
    return (
      <Select.Async
        {...instance.inputProps}
        name={instance.name}
        placeholder={instance.placeholder}
        value={value}
        loadOptions={instance.getData}
        onChange={handlerChangeInput}
      />
    );
};

export default select;

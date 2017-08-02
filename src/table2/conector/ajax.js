import axios from 'axios';

const ajax = (opt, callback, errorCallback, nonErrorAjax) => {
    return axios(opt)
      .then((response) => {
          nonErrorAjax();
          callback(response.data, response, opt);
      },response => errorCallback(response));
};

export default ajax;

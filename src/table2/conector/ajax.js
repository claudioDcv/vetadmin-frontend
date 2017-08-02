import axios from 'axios';

const ajax = (opt, callback) => {
    const optService = opt;

    if (opt.liveHeaders) {
      optService.headers = {
        ...opt.headers,
        ...opt.liveHeaders(),
      };
      delete optService.liveHeaders;
    }

    return axios(opt)
      .then((response) => {
          callback(response.data, response, opt);
      });
};

export default ajax;

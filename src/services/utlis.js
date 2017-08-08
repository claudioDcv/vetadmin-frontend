import axios from 'axios';

export const updateOrCreateParamFromQSv = (uri, key, value) => {
  const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, `$1${key}=${value}$2`);
  }
  
  return `${uri + separator + key}=${value}`;
};

export const extractParamFromQS = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, '\\$&');
  let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};


const callback = (data, base) => {
  const service = data;
  let api = '';
  const paginator = {};

  paginator.offset = 0;
  paginator.limit = 0;
  paginator.count = service.count;

  if (service.next) {
    api = service.next;
    paginator.limit = parseInt(extractParamFromQS('limit', api), 10);
    paginator.offset = parseInt(extractParamFromQS('offset', api), 10) - paginator.limit;
  } else if (service.previous) {
    api = service.previous;
    paginator.limit = parseInt(extractParamFromQS('limit', api), 10);
    paginator.offset = parseInt(extractParamFromQS('offset', api), 10) + paginator.limit;
  } else {
    paginator.limit = service.results.length;
  }
};

export const start = () => {
  const base = 'http://127.0.0.1:8000/colors/';
  axios.get(base)
  .then((data) => {
    callback(data.data, base);
  })
  .catch((error) => {
    console.log(error);
  });
};

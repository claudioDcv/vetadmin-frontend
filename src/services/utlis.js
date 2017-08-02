import axios from 'axios';

export const updateQueryStringParameterv = (uri, key, value) => {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
};

export const extractParamFromQueryString = (name, url) => {
      if (!url) url = window.location.href;
      name = name.replace(/[[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


const callback = (data, base) => {
  const service = data;
  let api = '';
  const paginator = {};

  paginator.offset = 0;
  paginator.limit = 0;
  paginator.count = service.count;

  if (service.next) {
    api = service.next;
    paginator.limit = parseInt(extractParamFromQueryString('limit', api), 10);
    paginator.offset = parseInt(extractParamFromQueryString('offset', api), 10) - paginator.limit;
  } else if (service.previous) {
    api = service.previous;
    paginator.limit = parseInt(extractParamFromQueryString('limit', api), 10);
    paginator.offset = parseInt(extractParamFromQueryString('offset', api), 10) + paginator.limit;
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
  .catch(function (error) {
    console.log(error);
  });


};

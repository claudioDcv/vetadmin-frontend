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


  export const extractParamFromQueryStringInt = (name, url) => {
        if (!url) url = window.location.href;
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return 0;
        if (!results[2]) return 0;
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

export const makePaginator = (data, base) => {
  const service = data;
  let api = '';
  const paginator = {};

  paginator.offset = 0;
  paginator.limit = 0;
  paginator.count = service.count;

  if (service.next) {
    api = service.next;
    paginator.limit = parseInt(extractParamFromQueryStringInt('limit', api), 10) || 0;
    paginator.offset = parseInt(extractParamFromQueryString('offset', api), 10) - paginator.limit || 0;
  } else if (service.previous) {
    api = service.previous;
    paginator.limit = parseInt(extractParamFromQueryStringInt('limit', api), 10) || 0;
    paginator.offset = parseInt(extractParamFromQueryStringInt('offset', api), 10) + paginator.limit || 0;
  } else {
    paginator.limit = service.results.length;
  }

  let urlNext = updateQueryStringParameterv(base, 'limit', paginator.limit);
  const offsetNext = (paginator.offset + paginator.limit);
  urlNext = updateQueryStringParameterv(urlNext, 'offset', offsetNext);
  paginator.next = urlNext;

  let urlPrev = updateQueryStringParameterv(base, 'limit', paginator.limit);
  urlPrev = updateQueryStringParameterv(urlPrev, 'offset', (paginator.offset - paginator.limit < 0 ? 0 : paginator.offset - paginator.limit));
  paginator.prev = urlPrev;

  paginator.lastPage = paginator.count <= paginator.offset + paginator.limit ? true : false;
  paginator.firstPage = paginator.offset === 0 ? true : false;
  paginator.current = offsetNext / paginator.limit;
  const pages = (paginator.count - (paginator.count % paginator.limit)) + paginator.limit;
  paginator.pages = paginator.count % paginator.limit > 0 ? pages / paginator.limit : paginator.count / paginator.limit;
  return paginator;
};

export const ajax = (config, callback) => {
  axios(config)
    .then((data) => {
      callback(data.data);
    })
    .catch((e) => {
        console.log(e);
    });
};

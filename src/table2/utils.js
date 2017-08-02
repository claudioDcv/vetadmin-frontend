export const updateQueryStringParameter = (uri, key, value) => {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, `$1${key}=${value}$2`);
    }
    return `${uri}${separator}${key}=${value}`;
};

export const makeKey = (key) => key;


export const removeQueryStringParameter = (url, parameter) => {
    //prefer to use l.search if you have a location/link object
    let urlparts= url.split('?');
    if (urlparts.length>=2) {
    let prefix= encodeURIComponent(parameter)+'=';
        let pars= urlparts[1].split(/[&;]/g);
        //reverse iteration as may be destructive
        for (let i= pars.length; i-- > 0;) {
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
};
/*
export const removeQueryStringParameter = (uri, key) => {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';
    if (uri.match(re)) {
        return uri.replace(re, `$1$2`);
    }
    return `${uri}`;
};
*/

export const extractParamFromQueryString = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return '';
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const extractParamFromQueryStringInt = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return 0;
  if (!results[2]) return 0;
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const makePaginator = (data, base, response, opt) => {
  const service = data;
  let api = base;
  const paginator = {};

  paginator.offset = 0;
  paginator.limit = 0;
  paginator.count = service.count;

  if (service.next) {
    api = service.next;
    paginator.limit = parseInt(extractParamFromQueryStringInt('limit', api), 10) || 0;
    paginator.offset = parseInt(extractParamFromQueryStringInt('offset', api), 10) - paginator.limit || 0;
  } else if (service.previous) {
    api = service.previous;
    paginator.limit = parseInt(extractParamFromQueryStringInt('limit', api), 10) || 0;
    paginator.offset = parseInt(extractParamFromQueryStringInt('offset', api), 10) + paginator.limit || 0;
  } else {
    paginator.limit = service.results.length;
  }

  let urlNext = updateQueryStringParameter(base, 'limit', paginator.limit);
  const offsetNext = (paginator.offset + paginator.limit);
  urlNext = updateQueryStringParameter(urlNext, 'offset', offsetNext);
  paginator.next = urlNext;

  let urlPrev = updateQueryStringParameter(base, 'limit', paginator.limit);
  urlPrev = updateQueryStringParameter(urlPrev, 'offset', (paginator.offset - paginator.limit <= 0 ? 0 : paginator.offset - paginator.limit));
      paginator.prev = urlPrev;

  paginator.lastPage = paginator.count <= paginator.offset + paginator.limit ? true : false;
  paginator.firstPage = paginator.offset === 0 ? true : false;
  paginator.current = offsetNext / paginator.limit;
  const pages = (paginator.count - (paginator.count % paginator.limit)) + paginator.limit;
  paginator.pages = paginator.count % paginator.limit > 0 ? pages / paginator.limit : paginator.count / paginator.limit;
  // ORDERING

  paginator.ordering = extractParamFromQueryString('ordering', opt.url);

  const ordering = paginator.ordering;
  paginator.orderingBy = ordering.slice(0, 1) === '-' ? ordering.slice(1) : ordering;
  paginator.orderingMode = ordering.slice(0, 1) === '-' ? '-' : '';


  paginator.actual = updateQueryStringParameter(opt.url, 'offset', paginator.offset);
  paginator.actual = updateQueryStringParameter(paginator.actual, 'ordering', ordering);
  paginator.next = updateQueryStringParameter(paginator.next, 'ordering', ordering);
  paginator.prev = updateQueryStringParameter(paginator.prev, 'ordering', ordering);

  return paginator;
};

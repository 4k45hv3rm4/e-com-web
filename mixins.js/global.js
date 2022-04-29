import axios from 'axios';
import {store} from '../store/index';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
let CancelToken = axios.CancelToken;
let source = CancelToken.source ();
import urls from '../app-js/urls.js';
import getAccessToken from '../app-js/methods.js';

axios.defaults.baseURL = urls.BASE_URL;
const AxiosHelper = {
  errorHandler: response => {
    switch (response.status) {
      case 400:
        store.dispatch (
          'snackBar/showSnack',
          {
            text: response.data.message,
            color: 'error',
            timeout: 1500,
          },
          {root: true}
        );
        break;
      case 401:
        {
          store.dispatch (
            'snackBar/showSnack',
            {
              text: 'Session Token Expired',
              color: 'error',
              timeout: 1500,
            },
            {root: true}
          );
        }
        break;
      case 403:
        store.dispatch (
          'snackBar/showSnack',
          {
            text: response.data.message,
            color: 'error',
            timeout: 1500,
          },
          {root: true}
        );
        break;
      case 404:
        if (
          response.data.message != 'undefined' &&
          response.data.message != null
        ) {
          store.dispatch (
            'snackBar/showSnack',
            {
              text: 'Page not Found',
              color: 'error',
              timeout: 1500,
            },
            {root: true}
          );
        } else {
          store.dispatch ('snackBar/showSnack', {
            message: 'Invalid API URL',
            color: 'error',
          });
          this.$notifier.showMessage ({
            text: 'Invalid API URL',
            color: 'error',
          });
        }
        break;
      case 440:
        store.dispatch ('snackBar/showSnack', {
          message: 'PublicSession Expired',
          color: 'error',
        });
        this.$notifier.showMessage ({
          text: 'PublicSession Expired',
          color: 'error',
        });
        break;
      default:
        if (response.data.message) {
          store.dispatch ('snackBar/showSnack', {
            message: response.data.message,
            color: 'error',
          });
        } else {
          store.dispatch ('snackBar/showSnack', {
            message: 'Something Went Wrong!',
            color: 'error',
          });
        }
    }
  },
};

export default {
  methods: {
    request_GET: (
      url,
      params,
      headers,
      fnSuccessResponse = null,
      fnFailureResponse = null,
      cancel = false,
      isTokenRequired = false,
      fnFinallyBlock = null
    ) => {
      console.log ('get was called');

      if (cancel) {
        source.cancel ();
        source = axios.CancelToken.source ();
        headers['cancelToken'] = source.token;
      }
      if (isTokenRequired) {
        if (process.client) {
          headers['Authorization'] =
            'Bearer ' + localStorage.getItem ('accessToken');
        }
      }
      axios
        .get (url, {
          params: params,
          headers: headers,
          cancelToken: cancel ? source.token : '',
        })
        .then (function (response) {
          if (fnSuccessResponse != null) {
            fnSuccessResponse (response);
          }
          // update token
          if (
            response.headers.token !== null &&
            response.headers.token !== '' &&
            response.headers.token !== undefined
          ) {
            // localStorage.setItem("token", response.headers.token);
          }
        })
        .catch (function (error) {
          if (axios.isCancel (error)) {
            // Request cancelled
          } else {
            if (!error.response) {
              // Network error
            } else {
              if (fnFailureResponse != null) {
                fnFailureResponse (error.response);
              }
              AxiosHelper.errorHandler (error.response);
            }
          }
        })
        .finally (function () {
          if (fnFinallyBlock != null) {
            fnFinallyBlock ();
          }
        });
    },
    request_POST: (
      url,
      params,
      headers,
      fnSuccessResponse = null,
      fnFailureResponse = null,
      cancel = true,
      isTokenRequired = false,
      fnFinallyBlock = null
    ) => {
      var config = {};

      if (cancel) {
        source.cancel ();
        source = axios.CancelToken.source ();
        config['cancelToken'] = source.token;
      }

      if (!cancel) {
        source = axios.CancelToken.source ();
      }

      if (isTokenRequired) {
        if (process.client) {
          headers['Authorization'] =
            'Bearer ' + getAccessToken();
        }
      }
      console.log (url, 'url');
      config['headers'] = headers;

      axios
        .post (url, params, config)
        .then (function (response) {
          if (fnSuccessResponse != null) {
            fnSuccessResponse (response);
          }
          // update token
          if (
            response.headers.token !== null &&
            response.headers.token !== '' &&
            typeof response.headers.token !== undefined
          ) {
            console.log ('token updated');
          }
        })
        .catch (function (error) {
          console.log (error);
          if (axios.isCancel (error)) {
            console.log ('Request canceled', error);
          } else {
            if (!error.response) {
              // Network error
            } else {
              if (fnFailureResponse != null) {
                fnFailureResponse (error.response);
              }
              AxiosHelper.errorHandler (error.response);
            }
          }
        })
        .finally (function () {
          if (fnFinallyBlock != null) {
            fnFinallyBlock ();
          }
        });
    },
    request_PUT: (
      url,
      params,
      headers,
      fnSuccessResponse = null,
      fnFailureResponse = null,
      cancel = true,
      isTokenRequired = false,
      fnFinallyBlock = null
    ) => {
      var config = {};

      if (cancel) {
        source.cancel ();
        source = axios.CancelToken.source ();
        config['cancelToken'] = source.token;
      }

      if (!cancel) {
        source = axios.CancelToken.source ();
      }

      if (isTokenRequired) {
        if (process.client) {
          headers['Authorization'] =
            'Bearer ' + getAccessToken();
        }
      }

      config['headers'] = headers;
      console.log(headers, 'HEAD', config)
      axios
        .put (url, params, config)
        .then (
          function (response) {
            if (fnSuccessResponse != null) {
              fnSuccessResponse (response);
            }
            // update token
            if (
              response.headers.token !== null &&
              response.headers.token !== '' &&
              response.headers.token !== undefined
            ) {
              localStorage.setItem ('token', response.headers.token);
            }
          },
        )
        .catch (function (error) {
          if (axios.isCancel (error)) {
            console.log ('Request canceled', error.message);
          } else {
            if (!error.response) {
              // Network error
            } else {
              if (fnFailureResponse != null) {
                fnFailureResponse (error.response);
              }

              AxiosHelper.errorHandler (error.response);
            }
          }
        })
        .finally (function () {
          if (fnFinallyBlock != null) {
            fnFinallyBlock ();
          }
        });
    },
  },
};

/**
 * Requestable wraps the logic for making http requests to the API
 */
export class Requestable {

    __apiBase: string;
    __auth: any;
    __AcceptHeader: string;
    __authorizationHeader: string;

    /**
     * Either a username and password or an oauth token for Github
     * @typedef {Object} Requestable.auth
     * @prop {string} [username] - the Github username
     * @prop {string} [password] - the user's password
     * @prop {token} [token] - an OAuth token
     */
    /**
     * Initialize the http internals.
     * @param {Requestable.auth} [auth] - the credentials to authenticate to Github. If auth is
     *                                  not provided request will be made unauthenticated
     * @param {string} [apiBase=https://api.github.com] - the base Github API URL
     * @param {string} [AcceptHeader=v3] - the accept header for the requests
     */
    constructor(token, apiBase?: any, AcceptHeader?: any) {
        this.__apiBase = apiBase || 'https://api.github.com';

        this.__AcceptHeader = AcceptHeader || 'v3';

        if (token)
            this.__authorizationHeader = 'Bearer ' + token;

    }

    /**
     * Compute the URL to use to make a request.
     * @private
     * @param {string} path - either a URL relative to the API base or an absolute URL
     * @return {string} - the URL to use
     */
    __getURL(path) {
        let url = path;

        if (path.indexOf('//') === -1) {
            url = this.__apiBase + path;
        }

        let newCacheBuster = 'timestamp=' + new Date().getTime();
        return url.replace(/(timestamp=\d+)/, newCacheBuster);
    }

    /**
     * Compute the headers required for an API request.
     * @private
     * @param {boolean} raw - if the request should be treated as JSON or as a raw request
     * @param {string} AcceptHeader - the accept header for the request
     * @return {Object} - the headers to use in the request
     */
    __getRequestHeaders(raw?: any, AcceptHeader?: any) {
        let headers = {
            'Authorization': this.__authorizationHeader,
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/vnd.github.' + (AcceptHeader || this.__AcceptHeader),
        };

        if (raw) {
            headers.Accept += '.raw';
        }
        headers.Accept += '+json';

        return headers;
    }

    /**
     * Sets the default options for API requests
     * @protected
     * @param {Object} [requestOptions={}] - the current options for the request
     * @return {Object} - the options to pass to the request
     */
    _getOptionsWithDefaults(requestOptions: any) {
        if (!(requestOptions?.visibility || requestOptions?.affiliation)) {
            requestOptions.type = requestOptions?.type || 'all';
        }
        requestOptions.sort = requestOptions.sort || 'updated';
        requestOptions.per_page = requestOptions.per_page || '100'; // eslint-disable-line

        return requestOptions;
    }

    /**
     * if a `Date` is passed to this function it will be converted to an ISO string
     * @param {*} date - the object to attempt to coerce into an ISO date string
     * @return {string} - the ISO representation of `date` or whatever was passed in if it was not a date
     */
    _dateToISO(date) {
        if (date && (date instanceof Date)) {
            date = date.toISOString();
        }

        return date;
    }


    results = [];
    objects = [];
    resultIDS = {};

    findAllInObject(object, valueOBj, isMulti) {

        for (var objKey in object) {
            this.performSearch(object[objKey], valueOBj, object[objKey]);
            if (!isMulti && this.results.length == 1) {
                return this.results;
            }
        }

        while (this.objects.length !== 0) {
            var objRef = this.objects.pop();
            this.performSearch(objRef._obj, valueOBj, objRef.parent);
            if (!isMulti && this.results.length == 1) {
                return this.results;
            }
        }

        return this.results;
    }


    performSearch(object, valueOBj, opt_parentObj) {

        for (var criteria in valueOBj) {
            var query = {};
            query[criteria] = valueOBj[criteria];
            this.searchObject(object, query, opt_parentObj);
        }

        for (var i = 0; i < this.results.length; i++) {
            var result = this.results[i];
            for (var field in valueOBj) {
                if (result[field] !== undefined) {
                    if (result[field] !== valueOBj[field]) {
                        this.results.splice(i, 1);
                    }
                }
            }
        }
    }


    searchObject(object, valueOBj, opt_parentObj) {
        for (var objKey in object) {

            if (typeof (object[objKey]) !== 'object') {

                if (valueOBj[objKey] == object[objKey]) {
                    if (opt_parentObj !== undefined) {
                        if (this.resultIDS[opt_parentObj._id] === undefined) {
                            this.results.push(opt_parentObj);
                            this.resultIDS[opt_parentObj._id] = '';
                        }
                    } else if (this.resultIDS[object._id] === undefined) {
                        this.results.push(object);
                        this.resultIDS[object._id] = '';
                    }
                }
            } else {

                var obj = object;
                if (opt_parentObj !== undefined) {
                    obj = opt_parentObj;
                }
                var objRef = {
                    parent: obj,
                    _obj: object[objKey]
                };

                this.objects.push(objRef);
            }
        }
    }

}
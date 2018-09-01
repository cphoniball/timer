import queryString from 'query-string';
import * as urlParser from 'url';

export default class Http {
    constructor({ host = '', options = {} }) {
        this.host = urlParser.parse(host).protocol  + '//' +  urlParser.parse(host).host;
        this.options = options;
    }

    // Parse a successful JSON response. Meant to be overridden in implementations
    parseJsonResponse(json) {
        return json;
    }

    /**
     * Called right before every request and injects the returned value into the request headers.
     *
     * Can be overriden in child classes to add common headers e.g. for Authorization
     */
    injectHeaders() {
        return {};
    }

    get(url, queryObject = {} ) {
        const query = Object.keys(queryObject).length ? queryString.stringify(queryObject) : '';
        return this.request(url + query);
    }

    post(url, body) {
        return this.request(url, {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post'
        });
    }

    put(url, body = {}) {
        return this.request(url, {
            body: JSON.stringify(body),
            method: 'put'
        });
    }

    delete(url) {
        return this.request(url, { method: 'delete' });
    }

    // Override this in implementations to set headers at request-time

    resolveUrl(url) {
        if (!this.host) return url;

        return urlParser.resolve(this.host, urlParser.parse(url).path);
    }

    async request(url, options = {}) {
        const requestOptions = {
            ...this.options,
            ...options,
            headers: {
                ...this.options.headers,
                ...options.headers,
                ...this.injectHeaders()
            }
        };

        const response = await fetch(this.resolveUrl(url), requestOptions);
        const json = await response.json();

        // Throw responses that returned HTTP error codes
        if (response.status > 299) throw json;

        return this.parseJsonResponse(json);
    }
}

import queryString from 'query-string';
import * as urlParser from 'url';

interface Options {
    host: string;
    options: RequestInit;
}

export default class Http {
    public host: string;
    public options: RequestInit;

    constructor({ host = '', options = {} }: Options) {
        this.host = urlParser.parse(host).protocol  + '//' +  urlParser.parse(host).host;
        this.options = options;
    }

    // Parse a successful JSON response. Meant to be overridden in implementations
    public parseJsonResponse(json: object) {
        return json;
    }

    /**
     * Called right before every request and injects the returned value into the request headers.
     *
     * Can be overriden in child classes to add common headers e.g. for Authorization
     */
    public injectHeaders() {
        return {};
    }

    public get(url: string, queryObject: object = {} ) {
        const query = Object.keys(queryObject).length ? queryString.stringify(queryObject) : '';
        return this.request(url + query);
    }

    public post(url: string, body: object) {
        return this.request(url, {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post'
        });
    }

    public put(url: string, body: object = {}) {
        return this.request(url, {
            body: JSON.stringify(body),
            method: 'put'
        });
    }

    public delete(url: string) {
        return this.request(url, { method: 'delete' });
    }

    // Override this in implementations to set headers at request-time

    private resolveUrl(url: string) {
        if (!this.host) return url;

        return urlParser.resolve(this.host, urlParser.parse(url).path);
    }

    private async request(url: string, options: RequestInit = {}): Promise<any> {
        const requestOptions: RequestInit = {
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

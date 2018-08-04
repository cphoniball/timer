import Http from '../http/http.service';

const timerApi = new Http({
    host: 'http://api.timer.test',
    options: {
        headers: {
            'Content-Type': 'application/json'
        }
    }
});

interface ApiResponse {
    data: any;
}

timerApi.parseJsonResponse = (body: ApiResponse) => {
    return body.data;
};

timerApi.injectHeaders = () => {
    const token = localStorage.getItem('access_token');
    // return {};
    return token ? { Authorization: `Bearer ${token}` } : {};
};

timerApi.parseJsonResponse.bind(timerApi);

export default timerApi;

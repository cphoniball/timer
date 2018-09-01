import Http from 'global/http/http.service';

const timerApi = new Http({
    host: 'http://api.timer.test',
    options: {
        headers: {
            'Content-Type': 'application/json'
        }
    }
});

timerApi.parseJsonResponse = body => {
    return body.data;
};

timerApi.injectHeaders = () => {
    const token = localStorage.getItem('access_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

timerApi.parseJsonResponse.bind(timerApi);

export default timerApi;

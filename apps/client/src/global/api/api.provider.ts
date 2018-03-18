import Http from 'global/http/http.service';

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

timerApi.parseJsonResponse.bind(timerApi);

export default timerApi;

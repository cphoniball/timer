import Http from 'global/http/http.service';

const timerApi = new Http({ host: 'api.timer.test' });

interface ApiResponse {
    data: any;
}

timerApi.parseJsonResponse = (body: ApiResponse) => {
    return body.data;
};

export default timerApi;

import elasticsearch from 'elasticsearch';

const client = new elasticsearch.Client({
    host: 'localhost:9200'
});

export function search(input, callback) {
    return client.search(input).then(response => {
        // console.log(response);
        return response;
    }).then(callback);
}

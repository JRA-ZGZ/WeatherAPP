const http = require('http');

const appid = process.env.openweatherappid || '7e96e74b66e882f8eb494da512218e9a';
const opts = {
    hostname: 'api.openweathermap.org',
    port: 80,
    withCredentials: false
};



class OpenWeatherMapClient {

    static getWeatherByPlace(city) {      
        const cityEncodec = encodeURIComponent(city);  
        opts.path = `/data/2.5/forecast?q=${cityEncodec}&APPID=${appid}`;
        return new Promise((resolve, reject) => {
            http.get(opts, function (res) {
                var buffer;
                buffer = '';
                res.on('data', function (data) {
                    return buffer += data;
                });
                res.on('error', function (error) {
                    return reject(error);
                });
                return res.on('end', function () {
                    var error, json;
                    try {
                        json = JSON.parse(buffer);
                    } catch (_error) {
                        error = _error;
                        return reject(error);
                    }
                    if (json.list == null) {
                        json.list = [];
                    }
                    return resolve(json);
                });
            });
        });
    };
}

module.exports = OpenWeatherMapClient;
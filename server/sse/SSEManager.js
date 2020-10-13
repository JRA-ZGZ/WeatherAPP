const SSE = require('./SSEClass');
const UpdateWeatherFactory = require('../datasources/UpdateWeatherFactory');
/* //var sse = new SSE(["array", "containing", "initial", "content", "(optional)"]);

...

app.get('/stream', sse.init);

...

sse.send(content);
sse.send(content, eventName);
sse.send(content, eventName, customID);
sse.updateInit(["array", "containing", "new", "content"]);
sse.serialize(["array", "to", "be", "sent", "as", "serialized", "events"]);
 */
let SSENotifier;
class SSEManager {
    constructor(app) {
        this.sse = new SSE();
        this.sse.on('error',(e)=>{
            console.error('SSE Event Error', e);
        });
        this.app = app;
        this.listRoutes = new Set();
        SSENotifier = this;
    }
    static getNotifier(){
        return SSENotifier;
    }
    addRoute(city) {
        const cityLowerCase = city.toLowerCase();
        const key = `${cityLowerCase}`
        if (!this.listRoutes.has(key)) {
            this.listRoutes.add(key);
        }
    }    
    init() {
        this.app.get('/sse', this.sse.init);
        setInterval(() => {
            if (this.listRoutes.size) {
                const isoDate = new Date().toISOString().slice(0,10);
                this.listRoutes.forEach((key) => {                   
                    UpdateWeatherFactory.build(key, isoDate).then((data) => {
                        console.log(data, key);
                        this.sse.send(data, key);
                    }).catch((e) => {
                        console.error('SSEManager cannot getWeather - Error', e);
                    });
                });
            }
            //All has been notified.
            this.listRoutes.clear()
        }, 30000);
    }
}

module.exports = SSEManager;
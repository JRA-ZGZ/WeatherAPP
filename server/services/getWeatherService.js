const GenericService = require('./GenericService');
const GetWeatherFactory = require('../datasources/GetWeatherFactory');
const SSEManager = require('../sse/SSEManager');
class GetWeatherService extends GenericService {
  
  validateRequest(request) {
    if(!request.params.city || !request.params.timestamp){
      const requestError = new Error('Invalid Request - missing parameters');
      requestError.code = 400;
      throw requestError;
    }
    try{
        new Date(Number(request.params.timestamp));
    }catch(e){
        const requestError = new Error('Invalid Request - invalid parameters');
        requestError.code = 400;
        throw requestError;
    }
  }

  async checkRequest(request){
    //Here we can have custom validation/custom json schema for this endpoint
    this.validateRequest(request);
    //Dont forget to call super for generic jscon schema validation.
    super.checkRequest(request);
  }

  async execute(request){
    const {city, timestamp} = request.params;    
    try{
        const ISOStringDate = new Date(Number(timestamp)).toISOString().slice(0,10);
        const resultWeather = await GetWeatherFactory.build(city,ISOStringDate);
        //Someone is interested in the city weather, let's keep him/her informed
        SSEManager.getNotifier().addRoute(city);

        return resultWeather;
    }catch(e){
        console.error(e);
        if(e.code){
            throw e;
        }
        const serviceError = new Error('GetWeatherService Error');
        serviceError.code = 500;
        throw serviceError;
    }
  }
}
const getWeatherService = new GetWeatherService();
module.exports = getWeatherService.handler.bind(getWeatherService);


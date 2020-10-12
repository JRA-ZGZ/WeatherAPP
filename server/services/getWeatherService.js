const GenericService = require('./GenericService');
const GetWeatherFactory = require('../datasources/GetWeatherFactory');

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
        const resultWeather = await GetWeatherFactory.build(city,new Date(Number(timestamp)).toISOString().slice(0,10));
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


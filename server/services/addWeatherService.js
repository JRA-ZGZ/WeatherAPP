const GenericService = require('./GenericService');
const FirebaseClient = require('../datasources/FirebaseClient');

class AddWeatherService extends GenericService {
  async checkRequest(request){
        if(!request.params.city|| !request.params.timestamp){
            const configError = new Error('Missing parameters -Error');
            configError.code = 400;
            throw configError;
        }
        try{
            new Date(Number(request.params.timestamp));
        }catch(e){
            const requestError = new Error('Invalid Request - invalid parameters');
            requestError.code = 400;
            throw requestError;
        }
        return super.checkRequest(request);
  }
  async execute(request){
    try{
        const ISOStringDate = new Date(Number(request.params.timestamp)).toISOString().slice(0,10);
        const cityLowerCase = request.params.city.toLowerCase()
        const key = `${cityLowerCase}_${ISOStringDate}`       
        await FirebaseClient.set(key, request.body);
        return {message: "Done!"};
    } catch(e){
        //Meter un logger;
        console.error(e);
        const serviceError = new Error('DeleteWeatherService Error');
        serviceError.code = 500;
        throw serviceError;
    }
  }
}
const addWeatherService = new AddWeatherService();
module.exports = addWeatherService.handler.bind(addWeatherService);


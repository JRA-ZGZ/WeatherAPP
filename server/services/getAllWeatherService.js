const GenericService = require('./GenericService');
const FirebaseClient = require('../datasources/FirebaseClient');

class GetAllWeatherService extends GenericService {
  
  async execute(){
    try{
        const result = await FirebaseClient.getAll();
        return result;
    } catch(e){
        //Meter un logger;
        console.error(e);
        const serviceError = new Error('DeleteWeatherService Error');
        serviceError.code = 500;
        throw serviceError;
    }
  }
}
const getAllWeatherService = new GetAllWeatherService();
module.exports = getAllWeatherService.handler.bind(getAllWeatherService);


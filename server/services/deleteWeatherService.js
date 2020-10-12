const GenericService = require('./GenericService');
const FirebaseClient = require('../datasources/FirebaseClient');

class DeleteWeatherService extends GenericService {

  async execute(request){
    try{
        await FirebaseClient.clean();
        return {message:"Done!"};
    } catch(e){
        //Meter un logger;
        console.error(e);
        const serviceError = new Error('DeleteWeatherService Error');
        serviceError.code = 500;
        throw serviceError;
    }
  }
}
const deleteWeatherService = new DeleteWeatherService();
module.exports = deleteWeatherService.handler.bind(deleteWeatherService);


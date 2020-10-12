const GenericService = require('./GenericService');
const SSEManager = require('../sse/SSEManager');

class SSERegisterClient extends GenericService {
  
  validateRequest(request) {
    if(!request.params.city ){
      const requestError = new Error('Invalid Request - missing parameters');
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
    const {city} = request.params;    
    try{
        //Someone is interested in the city weather, let's keep him/her informed
        console.log("SSE", city);
        SSEManager.getNotifier().addRoute(city);

        return {message: 'Done!'};
    }catch(e){
        console.error(e);
        if(e.code){
            throw e;
        }
        const serviceError = new Error('SSERegisterClient Error');
        serviceError.code = 500;
        throw serviceError;
    }
  }
}
const sSERegisterClient = new SSERegisterClient();
module.exports = sSERegisterClient.handler.bind(sSERegisterClient);


class GenericService {
    async checkRequest(request){
        //Here we can validate if the request.body has a valid JSON Schema
        //For that we can use (see https://www.npmjs.com/package/ajv)
        //Thow ConfigurationError in case of error -> 400 HTTP
    }

    async execute(request,response){
        //Better if we have specific error in an other folder for each http code.
        const serverError = new Error("This method should be overriden");
        serverError.code = 500;
        throw serverError;
    }
    async sendReponse(response){
        response.send(response.body);
    }
    async sendError(e,reponse){
        reponse.status(e.code || 500).send({message: e.message || reponse.body});
    }

    async handler(request,response){
        try{
            
            await this.checkRequest;
            response.body = await this.execute(request,response);
            await this.sendReponse(response);
        }catch(e){
            // Server error
            console.error(e);
            await this.sendError(e,response);
        }
    }
}

module.exports = GenericService;
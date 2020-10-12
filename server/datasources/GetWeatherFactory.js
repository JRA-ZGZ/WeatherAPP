const FirebaseClient = require('./FirebaseClient');
const OpenWeatherMapClient = require('./OpenWeatherMapClient');

class GetWeatherFactory {
    static async build(city,ISOStringDate){
        try{
            const cityLowerCase = city.toLowerCase(); 
            const key = `${cityLowerCase}_${ISOStringDate}`          
            //Try from database
            let weatherResult = await FirebaseClient.get(key).catch((e)=> console.log('GetWeatherFactory:FirebaseClien Error',e));
            if(!weatherResult){
                //Try by HTTP
                weatherResult = await OpenWeatherMapClient.getWeatherByPlace(cityLowerCase);
                //Store in database
                if(weatherResult){
                    //Not await for performance enhacement
                    if(weatherResult.cod === "200"){
                        FirebaseClient.set(key,weatherResult).catch((e) => console.error('Factory cannot store in database - Error', e));
                    }else{
                        const factoryError = new Error('Unable to get weather');
                        factoryError.code = weatherResult.cod || 500;
                        return Promise.reject(factoryError);
                    }                    
                }
            }
            return weatherResult;
        }catch(e) {
            console.error("Something was wrong!",e);
            const factoryError = new Error('Get weather fatory unexpected Error');
            factoryError.code = 500;
            throw factoryError;
        }
    }
}

module.exports = GetWeatherFactory;
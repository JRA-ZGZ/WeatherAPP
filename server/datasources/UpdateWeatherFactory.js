const FirebaseClient = require('./FirebaseClient');
const OpenWeatherMapClient = require('./OpenWeatherMapClient');

class UpdateWeatherFactory {
    static async build(city,ISOStringDate){
        try{
            const cityLowerCase = city.toLowerCase(); 
            const key = `${cityLowerCase}_${ISOStringDate}`;
            //Try by HTTP
            let weatherResult = await OpenWeatherMapClient.getWeatherByPlace(cityLowerCase);
            //Store in database
            if(weatherResult && weatherResult.cod === "200"){
                //Not await for performance enhacement
                FirebaseClient.set(key,weatherResult).catch((e) => console.error('Factory cannot store in database - Error', e));
            } else {
                //Try from database , the old value if exists :( 
                weatherResult = await FirebaseClient.get(key).catch((e)=> console.log('UpdateWeatherFactory:FirebaseClien Error',e));
            }
            if(!weatherResult){
                const factoryError = new Error('Unable to get weather');
                factoryError.code = weatherResult.cod || 500;
                return Promise.reject(factoryError);
            }
            return weatherResult;
        }catch(e) {
            console.error("Something was wrong!",e);
            const factoryError = new Error('Update weather fatory unexpected Error');
            factoryError.code = 500;
            throw factoryError;
        }
    }
}

module.exports = UpdateWeatherFactory;
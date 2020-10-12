const express = require('express');
const router = express.Router();
const getWeatherService = require('../services/getWeatherService');
const getAllWeatherService = require('../services/getAllWeatherService');
const deleteWeatherService = require('../services/deleteWeatherService');
const addWeatherService = require('../services/addWeatherService');


/**
 * @api {get} weather/city/:city/:timestamp
 * @apiName weather
 * @apiGroup weather
 * @apiExample Example usage:
 *     endpoint: http://localhost:3000/weather/city/miciudad/1602495491990
 * @apiParam {String} city City Name.
 * @apiParam {Number} timestamp Date.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *      "city": {
 *          "coord": {
 *              "lat": 40.4165,
 *              "lon": -3.7026
 *          },
 *          "country": "ES",
 *          "id": 3117735,
 *          "name": "Madrid",
 *          "population": 1000000,
 *          "sunrise": 1602397294,
 *          "sunset": 1602438062,
 *          "timezone": 7200
 *      },
 *      "cnt": 40,
 *      "cod": "200",
 *      "list": [
 *          {
 *              "dt": 160249549,
 *              "dt_txt": "2020-10-12 12:00:00",
 *              "main": {
 *                  "feels_like": 282.85,
 *                  "grnd_level": 947,
 *                  "humidity": 32,
 *                  "pressure": 1024,
 *                  "sea_level": 1024,
 *                  "temp": 289.02,
 *                  "temp_kf": 0.34,
 *                  "temp_max": 289.02,
 *                  "temp_min": 288.68
 *              },
 *              "weather": [
 *                  {
 *                      "description": "clear sky",
 *                      "icon": "01n",
 *                      "id": 800,
 *                      "main": "Clear"
 *                  }
 *              ]
 *          }
 *      ],
 *      "message": 0
 *  }
 *     
 *     
 *
 * @apiError NotFound weather not found!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "NotFound"
 *     }
 * 
 * @apiError InternalError something was wrong!
 * 
 * @apiErrorExample Error-Server:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error message"
 *     }
 */
router.get('/city/:city/:timestamp', getWeatherService);

/**
 * @api {post} weather/city/:city/:timestamp
 * @apiName weather
 * @apiGroup weather
 * @apiParam {String} city City Name.
 * @apiParam {Number} timestamp Date.
 * @apiExample Example usage:
 *     endpoint: http://localhost:3000/weather/city/miciudad/1602495491990
 *     body:
 *     {
 *      "city": {
 *          "coord": {
 *              "lat": 40.4165,
 *              "lon": -3.7026
 *          },
 *          "country": "ES",
 *          "id": 3117735,
 *          "name": "Madrid",
 *          "population": 1000000,
 *          "sunrise": 1602397294,
 *          "sunset": 1602438062,
 *          "timezone": 7200
 *      },
 *      "cnt": 40,
 *      "cod": "200",
 *      "list": [
 *          {
 *              "dt": 1602495491,
 *              "dt_txt": "2020-10-12 18:00:00",
 *              "main": {
 *                  "feels_like": 282.85,
 *                  "grnd_level": 947,
 *                  "humidity": 32,
 *                  "pressure": 1024,
 *                  "sea_level": 1024,
 *                  "temp": 289.02,
 *                  "temp_kf": 0.34,
 *                  "temp_max": 289.02,
 *                  "temp_min": 288.68
 *              },              
 *              "weather": [
 *                  {
 *                      "description": "clear sky",
 *                      "icon": "01n",
 *                      "id": 800,
 *                      "main": "Clear"
 *                  }
 *              ]
 *          }],
 *      "message": 0
 *  }
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message":"Done!"
 *     }
 *
 * @apiError NotFound Weather not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "NotFound"
 *     }
 * 
 * @apiError InternalError something was wrong!.
 * 
 * @apiErrorExample Error-Server:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error message"
 *     }
 */
router.post('/city/:city/:timestamp',addWeatherService);

/**
 * @api {get} weather/city/all
 * @apiName weather
 * @apiGroup weather
 * @apiExample Example usage:
 *     endpoint: http://localhost:3000/weather/all
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *  {
 *    "barcelona_2020-10-12": {
 *       "city": {
 *          "coord": {
 *             "lat": 40.4165,
 *             "lon": -3.7026
 *          },
 *          "country": "ES",
 *          "id": 3117735,
 *          "name": "Madrid",
 *          "population": 1000000,
 *          "sunrise": 1602397294,
 *          "sunset": 1602438062,
 *          "timezone": 7200
 *       },
 *       "cnt": 40,
 *       "cod": "200",
 *       "list": [
 *          {
 *             "dt": 160249549,
 *             "dt_txt": "2020-10-12 12:00:00",
 *             "main": {
 *                "feels_like": 282.85,
 *                "grnd_level": 947,
 *                "humidity": 32,
 *                "pressure": 1024,
 *                "sea_level": 1024,
 *                "temp": 289.02,
 *                "temp_kf": 0.34,
 *                "temp_max": 289.02,
 *                "temp_min": 288.68
 *             },
 *             "weather": [
 *                {
 *                   "description": "clear sky",
 *                   "icon": "01n",
 *                   "id": 800,
 *                   "main": "Clear"
 *                }
 *             ]
 *          }
 *       ],
 *       "message": 0
 *    }
 * }
 *     
 *     
 *
 * @apiError NotFound weather not found!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "NotFound"
 *     }
 * 
 * @apiError InternalError something was wrong!
 * 
 * @apiErrorExample Error-Server:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error message"
 *     }
 */
router.get('/all', getAllWeatherService);



/**
 * @api {delete} weather/all
 * @apiName weather
 * @apiGroup weather
 * @apiExample Example usage:
 *     endpoint: http://localhost:3000/weather/all
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Done!"
 *     }    
 *     
 *
 * @apiError NotFound weather not found!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "NotFound"
 *     }
 * 
 * @apiError InternalError something was wrong!
 * 
 * @apiErrorExample Error-Server:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Error message"
 *     }
 */
router.delete('/all',deleteWeatherService);


module.exports = router;

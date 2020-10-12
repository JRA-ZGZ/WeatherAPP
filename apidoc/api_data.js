define({ "api": [
  {
    "type": "get",
    "url": "weather/city/:city/:timestamp",
    "title": "",
    "name": "weather",
    "group": "weather",
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost:3000/weather/city/miciudad/1602495491990",
        "type": "json"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Date.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 200 OK\n{\n    \"city\": {\n        \"coord\": {\n            \"lat\": 40.4165,\n            \"lon\": -3.7026\n        },\n        \"country\": \"ES\",\n        \"id\": 3117735,\n        \"name\": \"Madrid\",\n        \"population\": 1000000,\n        \"sunrise\": 1602397294,\n        \"sunset\": 1602438062,\n        \"timezone\": 7200\n    },\n    \"cnt\": 40,\n    \"cod\": \"200\",\n    \"list\": [\n        {\n            \"dt\": 160249549,\n            \"dt_txt\": \"2020-10-12 12:00:00\",\n            \"main\": {\n                \"feels_like\": 282.85,\n                \"grnd_level\": 947,\n                \"humidity\": 32,\n                \"pressure\": 1024,\n                \"sea_level\": 1024,\n                \"temp\": 289.02,\n                \"temp_kf\": 0.34,\n                \"temp_max\": 289.02,\n                \"temp_min\": 288.68\n            },\n            \"weather\": [\n                {\n                    \"description\": \"clear sky\",\n                    \"icon\": \"01n\",\n                    \"id\": 800,\n                    \"main\": \"Clear\"\n                }\n            ]\n        }\n    ],\n    \"message\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>weather not found!.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>something was wrong!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"NotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Server:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/weather.js",
    "groupTitle": "weather"
  },
  {
    "type": "post",
    "url": "weather/city/:city/:timestamp",
    "title": "",
    "name": "weather",
    "group": "weather",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "timestamp",
            "description": "<p>Date.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "   endpoint: http://localhost:3000/weather/city/miciudad/1602495491990\n   body:\n   {\n    \"city\": {\n        \"coord\": {\n            \"lat\": 40.4165,\n            \"lon\": -3.7026\n        },\n        \"country\": \"ES\",\n        \"id\": 3117735,\n        \"name\": \"Madrid\",\n        \"population\": 1000000,\n        \"sunrise\": 1602397294,\n        \"sunset\": 1602438062,\n        \"timezone\": 7200\n    },\n    \"cnt\": 40,\n    \"cod\": \"200\",\n    \"list\": [\n        {\n            \"dt\": 1602495491,\n            \"dt_txt\": \"2020-10-12 18:00:00\",\n            \"main\": {\n                \"feels_like\": 282.85,\n                \"grnd_level\": 947,\n                \"humidity\": 32,\n                \"pressure\": 1024,\n                \"sea_level\": 1024,\n                \"temp\": 289.02,\n                \"temp_kf\": 0.34,\n                \"temp_max\": 289.02,\n                \"temp_min\": 288.68\n            },              \n            \"weather\": [\n                {\n                    \"description\": \"clear sky\",\n                    \"icon\": \"01n\",\n                    \"id\": 800,\n                    \"main\": \"Clear\"\n                }\n            ]\n        }],\n    \"message\": 0\n}",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\":\"Done!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Weather not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>something was wrong!.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"NotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Server:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/weather.js",
    "groupTitle": "weather"
  },
  {
    "type": "get",
    "url": "weather/city/all",
    "title": "",
    "name": "weather",
    "group": "weather",
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost:3000/weather/all",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n {\n   \"barcelona_2020-10-12\": {\n      \"city\": {\n         \"coord\": {\n            \"lat\": 40.4165,\n            \"lon\": -3.7026\n         },\n         \"country\": \"ES\",\n         \"id\": 3117735,\n         \"name\": \"Madrid\",\n         \"population\": 1000000,\n         \"sunrise\": 1602397294,\n         \"sunset\": 1602438062,\n         \"timezone\": 7200\n      },\n      \"cnt\": 40,\n      \"cod\": \"200\",\n      \"list\": [\n         {\n            \"dt\": 160249549,\n            \"dt_txt\": \"2020-10-12 12:00:00\",\n            \"main\": {\n               \"feels_like\": 282.85,\n               \"grnd_level\": 947,\n               \"humidity\": 32,\n               \"pressure\": 1024,\n               \"sea_level\": 1024,\n               \"temp\": 289.02,\n               \"temp_kf\": 0.34,\n               \"temp_max\": 289.02,\n               \"temp_min\": 288.68\n            },\n            \"weather\": [\n               {\n                  \"description\": \"clear sky\",\n                  \"icon\": \"01n\",\n                  \"id\": 800,\n                  \"main\": \"Clear\"\n               }\n            ]\n         }\n      ],\n      \"message\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>weather not found!.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>something was wrong!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"NotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Server:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/weather.js",
    "groupTitle": "weather"
  },
  {
    "type": "delete",
    "url": "weather/all",
    "title": "",
    "name": "weather",
    "group": "weather",
    "examples": [
      {
        "title": "Example usage:",
        "content": "endpoint: http://localhost:3000/weather/all",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Done!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotFound",
            "description": "<p>weather not found!.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalError",
            "description": "<p>something was wrong!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"NotFound\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Server:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"message\": \"Error message\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/weather.js",
    "groupTitle": "weather"
  }
] });

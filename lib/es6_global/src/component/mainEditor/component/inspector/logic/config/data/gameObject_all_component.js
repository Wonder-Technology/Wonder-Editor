'use strict';


var gameObject_all_component = "\n   [\n       {\n            \"type\":\"camera\",\n            \"include_component\":[\n                \"cameraController\"\n            ],\n            \"exclude_component\":[\n                \"boxGeometry\"\n            ],\n            \"all_component\":[\n                { \"type\" : \"transform\" },\n                { \"type\" : \"cameraController\" }\n            ]\n       },\n       {\n            \"type\":\"primitive\",\n            \"include_component\":[\n                \"boxGeometry\"\n            ],\n            \"exclude_component\":[\n                \"cameraController\"\n            ],\n            \"all_component\":[\n                { \"type\" : \"transform\" },\n                { \"type\" : \"material\" },\n                { \"type\" : \"sourceInstance\" }\n            ]\n       }\n   ]\n";

export {
  gameObject_all_component ,
  
}
/* No side effect */

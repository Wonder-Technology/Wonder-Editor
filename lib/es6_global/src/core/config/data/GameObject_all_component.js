


var gameObject_all_component = "\n   [\n       {\n            \"type\":\"camera\",\n            \"include_component\":[\n                \"basicCameraView\",\n                \"perspectiveCameraProjection\"\n            ],\n            \"exclude_component\":[\n                \"boxGeometry\"\n            ],\n            \"all_component\":[\n                { \"type\" : \"transform\" },\n                { \"type\" : \"basicCameraView\" },\n                { \"type\" : \"perspectiveCameraProjection\" }\n            ]\n       },\n       {\n            \"type\":\"primitive\",\n            \"include_component\":[\n                \"boxGeometry\"\n            ],\n            \"exclude_component\":[\n                \"basicCameraView\",\n                \"perspectiveCameraProjection\"\n            ],\n            \"all_component\":[\n                { \"type\" : \"transform\" },\n                { \"type\" : \"basicMaterial\" },\n                { \"type\" : \"sourceInstance\" }\n            ]\n       }\n   ]\n";

export {
  gameObject_all_component ,
  
}
/* No side effect */




var gameObject_all_component = "\n   [\n       {\n            \"type\":\"camera\",\n            \"include_component\":[\n            ],\n            \"exclude_component\":[\n            ],\n            \"all_component\":[\n                { \"type\" : \"transform\" },\n                { \"type\" : \"material\" },\n                { \"type\" : \"light\" },\n                { \"type\" : \"basicCameraView\" },\n                { \"type\" : \"perspectiveCameraProjection\" },\n                { \"type\" : \"arcballCameraController\" }\n            ]\n       },\n       {\n            \"type\":\"primitive\",\n            \"include_component\":[\n            ],\n            \"exclude_component\":[\n            ],\n            \"all_component\":[\n                { \"type\" : \"transform\" },\n                { \"type\" : \"material\" },\n                { \"type\" : \"light\" },\n                { \"type\" : \"basicCameraView\" },\n                { \"type\" : \"perspectiveCameraProjection\" },\n                { \"type\" : \"arcballCameraController\" }\n\n\n\n                ]\n            }\n            ]\n            ";

var gameObject_all_component_test = "\n   [\n       {\n            \"type\":\"Mesh\",\n            \"components\":[\n                { \"type\" : \"MeshRenderer\" },\n                { \"type\" : \"CustomGeometry\" }\n            ]\n       },\n       {\n            \"type\":\"Camera\",\n            \"components\":[\n                { \"type\" : \"BasicCameraView\" },\n                { \"type\" : \"PerspectiveCameraProjection\" },\n                { \"type\" : \"ArcballCameraController\" }\n            ]\n       },\n       {\n            \"type\":\"Rendering\",\n            \"components\":[\n                { \"type\" : \"Light\" },\n                { \"type\" : \"Material\" }\n                ]\n            }\n    ]\n";

export {
  gameObject_all_component ,
  gameObject_all_component_test ,
  
}
/* No side effect */

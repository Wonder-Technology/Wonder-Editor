/* let gameObject_all_component = {|
   [
       {
            "type":"camera",
            "include_component":[
            ],
            "exclude_component":[
            ],
            "all_component":[
                { "type" : "transform" },
                { "type" : "material" },
                { "type" : "light" },
                { "type" : "basicCameraView" },
                { "type" : "perspectiveCameraProjection" },
                { "type" : "arcballCameraController" }
            ]
       },
       {
            "type":"primitive",
            "include_component":[
            ],
            "exclude_component":[
            ],
            "all_component":[
                { "type" : "transform" },
                { "type" : "material" },
                { "type" : "light" },
                { "type" : "basicCameraView" },
                { "type" : "perspectiveCameraProjection" },
                { "type" : "arcballCameraController" }



                ]
            }
            ]
            |}; */

let gameObject_all_component_test = {|
   [
       {
            "type":"Mesh",
            "components":[
                { "type" : "MeshRenderer" },
                { "type" : "CustomGeometry" }
            ]
       },
       {
            "type":"Camera",
            "components":[
                { "type" : "CameraGroup" },
                { "type" : "ArcballCameraController" }
            ]
       },
       {
            "type":"Rendering",
            "components":[
                { "type" : "Light" },
                { "type" : "Material" }
                ]
            }
    ]
|};

/* { "type" : "RenderGroup" } */
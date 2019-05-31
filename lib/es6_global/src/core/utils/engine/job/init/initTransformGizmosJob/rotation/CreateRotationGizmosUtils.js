

import * as ArrayService$WonderEditor from "../../../../../../../service/atom/ArrayService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../../../service/state/engine/GeometryEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as CreateTransformGizmosUtils$WonderEditor from "../CreateTransformGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as DataRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/rotation/DataRotationGizmoSceneViewEditorService.js";

function _generate(_param, _param$1, _i) {
  while(true) {
    var param = _param$1;
    var param$1 = _param;
    var i = _i;
    var indices = param[1];
    var vertices = param[0];
    var segments = param$1[1];
    var radius = param$1[0];
    var match = i > segments;
    if (match) {
      return /* tuple */[
              vertices,
              indices
            ];
    } else {
      var rad = i / segments * 2 * Math.PI;
      _i = i + 1 | 0;
      _param$1 = /* tuple */[
        ArrayService$WonderEditor.push(0, ArrayService$WonderEditor.push(radius * Math.sin(rad), ArrayService$WonderEditor.push(radius * Math.cos(rad), vertices))),
        ArrayService$WonderEditor.push(i, indices)
      ];
      _param = /* tuple */[
        radius,
        segments
      ];
      continue ;
    }
  };
}

function _createCircleGeometry(engineState) {
  var radius = DataRotationGizmoSceneViewEditorService$WonderEditor.getRadius(/* () */0);
  var match = _generate(/* tuple */[
        radius,
        20
      ], /* tuple */[
        /* array */[],
        /* array */[]
      ], 0);
  var match$1 = GeometryEngineService$WonderEditor.create(engineState);
  var geometry = match$1[1];
  var engineState$1 = GeometryEngineService$WonderEditor.setGeometryIndices16(new Uint16Array(match[1]), geometry, GeometryEngineService$WonderEditor.setGeometryVertices(new Float32Array(match[0]), geometry, match$1[0]));
  return /* tuple */[
          engineState$1,
          geometry
        ];
}

function _createCircleGizmo(color, engineState) {
  var match = _createCircleGeometry(engineState);
  var match$1 = CreateTransformGizmosUtils$WonderEditor.createBasicGameObject(match[1], match[0]);
  var meshRenderer = match$1[3];
  var gameObject = match$1[1];
  var engineState$1 = MeshRendererEngineService$WonderEditor.setDrawMode(/* Line_strip */3, meshRenderer, MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(meshRenderer, false, BasicMaterialEngineService$WonderEditor.setColor(color, match$1[2], match$1[0])));
  return /* tuple */[
          engineState$1,
          gameObject,
          GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState$1)
        ];
}

function _createCircleGizmos(engineState) {
  var match = _createCircleGizmo(DataRotationGizmoSceneViewEditorService$WonderEditor.getYZCircleColor(/* () */0), engineState);
  var match$1 = _createCircleGizmo(DataRotationGizmoSceneViewEditorService$WonderEditor.getXZCircleColor(/* () */0), match[0]);
  var match$2 = _createCircleGizmo(DataRotationGizmoSceneViewEditorService$WonderEditor.getXYCircleColor(/* () */0), match$1[0]);
  var engineState$1 = TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
        90,
        0,
        0
      ], match$1[2], TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
            0,
            90,
            0
          ], match[2], match$2[0]));
  return /* tuple */[
          engineState$1,
          /* tuple */[
            match[1],
            match$1[1],
            match$2[1]
          ]
        ];
}

function createRotationGizmos(engineState) {
  var match = _createCircleGizmos(engineState);
  var match$1 = match[1];
  var xyGizmo = match$1[2];
  var xzGizmo = match$1[1];
  var yzGizmo = match$1[0];
  var match$2 = GameObjectEngineService$WonderEditor.create(match[0]);
  var wholeGizmo = match$2[1];
  var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, xyGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, xzGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, yzGizmo, match$2[0])));
  return /* tuple */[
          engineState$1,
          wholeGizmo,
          /* tuple */[
            yzGizmo,
            xzGizmo,
            xyGizmo
          ]
        ];
}

export {
  _generate ,
  _createCircleGeometry ,
  _createCircleGizmo ,
  _createCircleGizmos ,
  createRotationGizmos ,
  
}
/* ArrayService-WonderEditor Not a pure module */

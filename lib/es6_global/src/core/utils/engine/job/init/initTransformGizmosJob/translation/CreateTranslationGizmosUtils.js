

import * as GeometryEngineService$WonderEditor from "../../../../../../../service/state/engine/GeometryEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../service/state/engine/TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../../../../../service/state/engine/MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../../../../../../service/state/engine/BasicMaterialEngineService.js";
import * as CreateTransformGizmosUtils$WonderEditor from "../CreateTransformGizmosUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as TransformGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/TransformGameObjectEngineService.js";
import * as DataTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../../service/state/editor/view/sceneView/transform/translation/DataTranslationGizmoSceneViewEditorService.js";

function _createTranslationAxisGizmo(color, engineState) {
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var axisGameObject = match[1];
  var match$1 = GeometryEngineService$WonderEditor.createConeGeometry(0.5, 1, 10, 10, match[0]);
  var match$2 = GeometryEngineService$WonderEditor.createCylinderGeometry(0.1, 0.1, 5, 5, 5, match$1[0]);
  var match$3 = CreateTransformGizmosUtils$WonderEditor.createBasicGameObject(match$1[1], match$2[0]);
  var coneGameObject = match$3[1];
  var match$4 = CreateTransformGizmosUtils$WonderEditor.createBasicGameObject(match$2[1], match$3[0]);
  var cylinderGameObject = match$4[1];
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("line", cylinderGameObject, GameObjectEngineService$WonderEditor.setGameObjectName("arrow", coneGameObject, match$4[0]));
  var engineState$2 = MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(match$4[3], false, BasicMaterialEngineService$WonderEditor.setColor(color, match$4[2], MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(match$3[3], false, BasicMaterialEngineService$WonderEditor.setColor(color, match$3[2], engineState$1))));
  var engineState$3 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(coneGameObject, /* tuple */[
        0,
        5.5,
        0
      ], TransformGameObjectEngineService$WonderEditor.setLocalPosition(cylinderGameObject, /* tuple */[
            0,
            2.5,
            0
          ], engineState$2));
  var engineState$4 = HierarchyGameObjectEngineService$WonderEditor.addChild(axisGameObject, cylinderGameObject, HierarchyGameObjectEngineService$WonderEditor.addChild(axisGameObject, coneGameObject, engineState$3));
  return /* tuple */[
          engineState$4,
          axisGameObject,
          GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(axisGameObject, engineState$4)
        ];
}

function _createTranslationPlaneGizmo(color, engineState) {
  var match = GeometryEngineService$WonderEditor.createPlaneGeometry(2, 2, 5, 5, engineState);
  var match$1 = CreateTransformGizmosUtils$WonderEditor.createBasicGameObject(match[1], match[0]);
  var planeMaterial = match$1[2];
  var planeGameObject = match$1[1];
  var engineState$1 = MeshRendererEngineService$WonderEditor.setMeshRendererIsRender(match$1[3], false, BasicMaterialEngineService$WonderEditor.setAlpha(planeMaterial, 0.3, BasicMaterialEngineService$WonderEditor.setColor(color, planeMaterial, match$1[0])));
  return /* tuple */[
          engineState$1,
          planeGameObject,
          GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(planeGameObject, engineState$1)
        ];
}

function _createAxisGizmos(engineState) {
  var match = _createTranslationAxisGizmo(DataTranslationGizmoSceneViewEditorService$WonderEditor.getXAxisColor(/* () */0), engineState);
  var match$1 = _createTranslationAxisGizmo(DataTranslationGizmoSceneViewEditorService$WonderEditor.getYAxisColor(/* () */0), match[0]);
  var match$2 = _createTranslationAxisGizmo(DataTranslationGizmoSceneViewEditorService$WonderEditor.getZAxisColor(/* () */0), match$1[0]);
  var engineState$1 = TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
        90,
        0,
        0
      ], match$2[2], TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
            0,
            0,
            -90
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

function _createPlaneGizmos(engineState) {
  var match = _createTranslationPlaneGizmo(DataTranslationGizmoSceneViewEditorService$WonderEditor.getXYPlaneColor(/* () */0), engineState);
  var match$1 = _createTranslationPlaneGizmo(DataTranslationGizmoSceneViewEditorService$WonderEditor.getXZPlaneColor(/* () */0), match[0]);
  var match$2 = _createTranslationPlaneGizmo(DataTranslationGizmoSceneViewEditorService$WonderEditor.getYZPlaneColor(/* () */0), match$1[0]);
  var engineState$1 = TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
        90,
        0,
        0
      ], match$1[2], TransformEngineService$WonderEditor.setLocalEulerAngles(/* tuple */[
            0,
            90,
            0
          ], match$2[2], match$2[0]));
  return /* tuple */[
          engineState$1,
          /* tuple */[
            match[1],
            match$1[1],
            match$2[1]
          ]
        ];
}

function createTranslationGizmos(engineState) {
  var match = _createAxisGizmos(engineState);
  var match$1 = match[1];
  var zAxisGizmo = match$1[2];
  var yAxisGizmo = match$1[1];
  var xAxisGizmo = match$1[0];
  var match$2 = _createPlaneGizmos(match[0]);
  var match$3 = match$2[1];
  var yzPlaneGizmo = match$3[2];
  var xzPlaneGizmo = match$3[1];
  var xyPlaneGizmo = match$3[0];
  var match$4 = GameObjectEngineService$WonderEditor.create(match$2[0]);
  var wholeGizmo = match$4[1];
  var engineState$1 = HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, yzPlaneGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, xzPlaneGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, xyPlaneGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, xAxisGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, yAxisGizmo, HierarchyGameObjectEngineService$WonderEditor.addChild(wholeGizmo, zAxisGizmo, match$4[0]))))));
  return /* tuple */[
          engineState$1,
          wholeGizmo,
          /* tuple */[
            xAxisGizmo,
            yAxisGizmo,
            zAxisGizmo
          ],
          /* tuple */[
            xyPlaneGizmo,
            xzPlaneGizmo,
            yzPlaneGizmo
          ]
        ];
}

export {
  _createTranslationAxisGizmo ,
  _createTranslationPlaneGizmo ,
  _createAxisGizmos ,
  _createPlaneGizmos ,
  createTranslationGizmos ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */

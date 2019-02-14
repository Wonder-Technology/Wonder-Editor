

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as CamlinternalOO from "../../../../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as Vector3Service$Wonderjs from "../../../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as Vector3Service$WonderEditor from "../../../../../../service/primitive/Vector3Service.js";

function distanceToPoint(point, param) {
  return Vector3Service$WonderEditor.dot(param[/* normal */0], point) + param[/* constant */1];
}

function setFromNormalAndCoplanarPoint(normal, point) {
  return /* record */[
          /* normal */normal,
          /* constant */-Vector3Service$WonderEditor.dot(point, normal)
        ];
}

function setFromCoplanarPoints(a, b, c) {
  var __x = Vector3Service$Wonderjs.sub(/* Float */0, c, b);
  var normal = Vector3Service$Wonderjs.normalize(Vector3Service$Wonderjs.cross(__x, Vector3Service$Wonderjs.sub(/* Float */0, a, b)));
  return setFromNormalAndCoplanarPoint(normal, a);
}

function isPlaneEqual(plane1, plane2) {
  if (plane1[/* constant */1] === plane2[/* constant */1]) {
    return Caml_obj.caml_equal(plane1[/* normal */0], plane2[/* normal */0]);
  } else {
    return false;
  }
}

var class_tables = [
  0,
  0,
  0
];

function computeAngleBetweenVecAndPlane(_, _$1) {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

export {
  distanceToPoint ,
  setFromNormalAndCoplanarPoint ,
  setFromCoplanarPoints ,
  isPlaneEqual ,
  computeAngleBetweenVecAndPlane ,
  
}
/* Vector3Service-WonderEditor Not a pure module */

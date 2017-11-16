let createDefaultScene = (state) => {
  let (state, box) = MainEditorPrimitiveOper.createBox(state);
  let (state, camera) = MainEditorCameraOper.createCamera(state);
  (state, camera, box)
};

let getScene = (state) => {

};
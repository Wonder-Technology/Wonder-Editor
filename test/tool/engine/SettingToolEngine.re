open Wonderjs;

open Sinon;

open StateDataMainType;

let createGetContextStub = (fakeGl, sandbox) =>
  createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(fakeGl);

let buildFakeGl = sandbox => {
  "VERTEX_SHADER": 0,
  "FRAGMENT_SHADER": 1,
  "HIGH_FLOAT": 2,
  "MEDIUM_FLOAT": 3,
  "viewport": createEmptyStub(refJsObjToSandbox(sandbox^)),
  "getShaderPrecisionFormat":
    createEmptyStub(refJsObjToSandbox(sandbox^))
    |> returns({"precision": 1}),
  "getExtension":
    createEmptyStub(refJsObjToSandbox(sandbox^)) |> returns(Obj.magic(0)),
};

let buildFakeCanvas = (id, gl, sandbox) => {
  "id": id,
  "nodeType": 1,
  "style": {
    "left": "",
    "top": "",
    "width": "",
    "height": "",
    "position": "static",
  },
  "width": 0.,
  "height": 0.,
  "getContext": createGetContextStub(gl, sandbox),
};

let buildFakeCanvasOfSize = (width, height) => {
  "width": width,
  "height": height,
};

let setFakeCanvasToEngineState = (~width=1., ~height=1., ()) => {
  let canvas = buildFakeCanvasOfSize(width, height);

  StateLogicService.getAndSetEngineState(ViewToolEngine.setCanvas(canvas));
};

let buildFakeDomForNotPassCanvasId = sandbox => {
  let fakeGl = buildFakeGl(sandbox);
  let canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  let div = {"innerHTML": "", "firstChild": canvasDom};
  let body = {
    "prepend": createEmptyStub(refJsObjToSandbox(sandbox^)),
    "style": {
      "cssText": "",
    },
  };
  createMethodStub(
    refJsObjToSandbox(sandbox^),
    DomHelper.document |> Obj.magic,
    "createElement",
  )
  |> withOneArg("div")
  |> returns(div)
  |> ignore;
  createMethodStub(
    refJsObjToSandbox(sandbox^),
    DomHelper.document |> Obj.magic,
    "querySelectorAll",
  )
  |> withOneArg("body")
  |> returns([body])
  |> ignore;
  (canvasDom, fakeGl, div, body);
};

let buildBufferConfigStr =
    (
      ~geometryPointCount=300,
      ~geometryCount=30,
      ~transformCount=50,
      ~basicMaterialCount=50,
      ~lightMaterialCount=50,
      ~meshRendererCount=50,
      ~textureCountPerMaterial=3,
      ~basicSourceTextureCount=50,
      ~arrayBufferViewSourceTextureCount=50,
      ~sourceInstanceCount=2,
      ~objectInstanceCountPerSourceInstance=100,
      (),
    ) => {j|
       {
            "custom_geometry_point_count": $geometryPointCount,
            "custom_geometry_count": $geometryCount,
  "transform_count": $transformCount,
  "basic_material_count": $basicMaterialCount,
  "light_material_count": $lightMaterialCount,
  "meshRenderer_count": $meshRendererCount,
  "basic_source_texture_count": $basicSourceTextureCount,
   "arrayBuffer_view_source_texture_count": $arrayBufferViewSourceTextureCount,

  "texture_count_per_material": $textureCountPerMaterial,

  "instance_buffer": {
    "sourceInstance_count": $sourceInstanceCount,
"objectInstance_count_per_source_instance": $objectInstanceCountPerSourceInstance
  }
       }
        |j};

let buildSetting =
    (isDebug, canvasId, buffer, context, useHardwareInstance, useWorker) =>
  switch (canvasId) {
  | None => {j|
 {
    "is_debug": $isDebug,
    "context": $context,
    "buffer": $buffer,
    "gpu": {
        "use_hardware_instance": $useHardwareInstance
    },
    "worker": {
        "use_worker": $useWorker
    }
}
        |j}
  | Some(canvasId) => {j|
 {
    "is_debug": $isDebug,
    "canvas_id": "$canvasId",
    "context": $context,
    "buffer": $buffer,
    "gpu": {
        "use_hardware_instance": $useHardwareInstance
    },
    "worker": {
        "use_worker": $useWorker
    }
}
        |j}
  };

let createStateAndSetToStateData =
    (
      ~isDebug="true",
      ~canvasId=None,
      ~context={|
        {
        "alpha": true,
        "depth": true,
        "stencil": false,
        "antialias": true,
        "premultiplied_alpha": true,
        "preserve_drawing_buffer": false
        }
               |},
      ~useHardwareInstance="false",
      ~buffer=buildBufferConfigStr(),
      ~useWorker="false",
      (),
    ) => {
  let stateData = StateToolEngine.getStateData();
  ParseSettingService.convertToRecord(
    buildSetting(
      isDebug,
      canvasId,
      buffer,
      context,
      useHardwareInstance,
      useWorker,
    )
    |> Js.Json.parseExn,
  )
  |> ConfigDataLoaderSystem._setSetting(
       stateData,
       CreateStateMainService.createState(),
     )
  |> ConfigDataLoaderSystem._createRecordWithState
  |> StateToolEngine.setState;
};

let setMemory = (state: StateDataMainType.state, ~maxDisposeCount=1000, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    memory:
      Some({
        ...OperateSettingService.unsafeGetMemory(state.settingRecord),
        maxDisposeCount,
      }),
  },
};

let setBufferSize =
    (state: StateDataMainType.state, ~geometryPointCount=100, ()) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    buffer:
      Some({
        ...BufferSettingService.unsafeGetBuffer(state.settingRecord),
        geometryPointCount,
      }),
  },
};

let unsafeGetGPU = state =>
  state.settingRecord |> OperateSettingService.unsafeGetGPU;

let setGPU = (config, state) => {
  ...state,
  settingRecord: {
    ...state.settingRecord,
    gpu: Some(config),
  },
};
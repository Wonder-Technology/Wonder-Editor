open Wonderjs;

open Sinon;

open DomToolEngine;

let buildFakeDomForPassCanvasId = (sandbox) => {
  let canvasDom = {
    "id": "a",
    "nodeType": 1,
    "getContext": createEmptyStub(refJsObjToSandbox(sandbox^))
  };
  createMethodStub(refJsObjToSandbox(sandbox^), documentToObj(document), "querySelectorAll")
  |> withOneArg({j|#webgl|j})
  |> returns([canvasDom])
};

let init =
    (
      ~isTest=Js.Nullable.return(Js.true_),
      ~bufferConfig=Js.Nullable.return({
                      "transformDataBufferCount": Js.Nullable.return(5),
                      "geometryPointDataBufferCount": Js.Nullable.return(5),
                      "basicMaterialDataBufferCount": Js.Nullable.return(5)
                    }),
      ()
    ) =>
  Main.setMainConfig(MainToolEngine.buildMainConfig(~isTest, ~bufferConfig, ()))
  |> (
    (state) => {
      StateData.stateData.state = Some(state);
      state
    }
  );

let prepareTime = () => TimeControllerToolEngine.setStartTime(0.);

let prepare = (sandbox) => {
  prepareTime();
  buildFakeDomForPassCanvasId(sandbox) |> ignore
};
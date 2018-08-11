open Sinon;

let buildFakeCanvas = sandbox => {
  let canvasDom = ColorPickTool.buildFakeCanvas("a", sandbox);

  let createElementStub = ColorPickTool.documentToJsObj(
                            ColorPickTool.document,
                          )##createElement;

  createElementStub |> withOneArg("canvas") |> returns(canvasDom) |> ignore;
};
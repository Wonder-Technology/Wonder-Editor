open Wonderjs;

open StateDataMainType;

let setCanvas = (canvas, state) => {
  ...state,
  viewRecord: state.viewRecord |> ViewService.setCanvas(canvas |> Obj.magic),
};
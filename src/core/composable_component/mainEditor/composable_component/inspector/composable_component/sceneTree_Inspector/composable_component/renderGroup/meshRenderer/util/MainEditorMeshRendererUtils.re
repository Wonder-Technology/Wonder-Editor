open SelectType;

open Wonderjs;

open DrawModeType;

let getDrawModeOptions = () => [|
  {key: Points |> drawModeToUint8, value: "points"},
  {key: Lines |> drawModeToUint8, value: "lines"},
  {key: Line_loop |> drawModeToUint8, value: "line_loop"},
  {key: Line_strip |> drawModeToUint8, value: "Line_strip"},
  {key: Triangles |> drawModeToUint8, value: "Triangles"},
  {key: Triangle_strip |> drawModeToUint8, value: "triangle_strip"},
  {key: Triangle_fan |> drawModeToUint8, value: "Triangle_fan"},
|];
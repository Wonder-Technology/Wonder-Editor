let getNoNameGeometryName = () => "NoName Geometery";

let getName = (geometry, state) =>
  switch (state |> GeometryEngineService.getGeometryName(geometry)) {
  | None => getNoNameGeometryName()
  | Some(geometryName) => geometryName
  };
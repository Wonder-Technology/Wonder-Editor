let getName = (geometry, state) =>
  switch (state |> GeometryEngineService.getGeometryName(geometry)) {
  | None => "New Geometry"
  | Some(geometryName) => geometryName
  };
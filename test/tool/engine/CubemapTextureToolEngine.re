let getIsNeedUpdate = (texture, engineState) =>
  CubemapTextureEngineService.getIsNeedUpdate(texture, engineState);

let getNewCubemap = (~engineState=StateEngineService.unsafeGetState(), ()) => {
  open Wonderjs.CubemapTextureType;

  let {disposedIndexArray, index} as geometryRecord =
    Wonderjs.RecordCubemapTextureMainService.getRecord(engineState);

  let (index, newIndex, disposedIndexArray) =
    ComponentToolEngine.computeGeneratedIndex(index, disposedIndexArray);

  index;
};

let isAlive = (texture, engineState) =>
  Wonderjs.DisposeCubemapTextureMainService.isAlive(
    texture,
    Wonderjs.RecordCubemapTextureMainService.getRecord(engineState),
  );

let unsafeGetGlTexture = (texture, state) =>
  Wonderjs.OperateGlTextureMapService.unsafeGetTexture(
    texture,
    Wonderjs.RecordCubemapTextureMainService.getRecord(state).glTextureMap,
  );

let buildSource = (~width=2, ~height=4, ~src="", ~name="cubemapTexture_Source", ()) =>
  {"width": width, "height": height, "src": src, "name": name} |> Obj.magic;

let setAllSources =
    (
      ~engineState,
      ~texture,
      ~width=4,
      ~height=4,
      ~image1Name="i1",
      ~image2Name="i2",
      ~image3Name="i3",
      ~image4Name="i4",
      ~image5Name="i5",
      ~image6Name="i6",
      (),
    ) => {
  let source1 = buildSource(~width, ~height, ~src="px", ~name=image1Name, ());
  let source2 = buildSource(~width, ~height, ~src="nx", ~name=image2Name, ());
  let source3 = buildSource(~width, ~height, ~src="py", ~name=image3Name, ());
  let source4 = buildSource(~width, ~height, ~src="ny", ~name=image4Name, ());
  let source5 = buildSource(~width, ~height, ~src="pz", ~name=image5Name, ());
  let source6 = buildSource(~width, ~height, ~src="nz", ~name=image6Name, ());

  let engineState =
    engineState
    |> CubemapTextureEngineService.setPXSource(texture, source1)
    |> CubemapTextureEngineService.setNXSource(texture, source2)
    |> CubemapTextureEngineService.setPYSource(texture, source3)
    |> CubemapTextureEngineService.setNYSource(texture, source4)
    |> CubemapTextureEngineService.setPZSource(texture, source5)
    |> CubemapTextureEngineService.setNZSource(texture, source6);

  engineState;
};
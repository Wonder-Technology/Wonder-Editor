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

let buildSource =
    (~width=4, ~height=4, ~src="", ~name="cubemapTexture_Source", ()) =>
  {"width": width, "height": height, "src": src, "name": name} |> Obj.magic;

let setAllSources =
    (
      ~engineState,
      ~texture,
      ~width=4,
      ~height=4,
      ~image1Name="i1.png",
      ~image2Name="i2.png",
      ~image3Name="i3.png",
      ~image4Name="i4.png",
      ~image5Name="i5.png",
      ~image6Name="i6.png",
      (),
    ) => {
  let source1 =
    buildSource(~width, ~height, ~src="px.png", ~name=image1Name, ());
  let source2 =
    buildSource(~width, ~height, ~src="nx.png", ~name=image2Name, ());
  let source3 =
    buildSource(~width, ~height, ~src="py.png", ~name=image3Name, ());
  let source4 =
    buildSource(~width, ~height, ~src="ny.png", ~name=image4Name, ());
  let source5 =
    buildSource(~width, ~height, ~src="pz.png", ~name=image5Name, ());
  let source6 =
    buildSource(~width, ~height, ~src="nz.png", ~name=image6Name, ());

  let engineState =
    engineState
    |> CubemapTextureEngineService.setPXSource(source1, texture)
    |> CubemapTextureEngineService.setNXSource(source2, texture)
    |> CubemapTextureEngineService.setPYSource(source3, texture)
    |> CubemapTextureEngineService.setNYSource(source4, texture)
    |> CubemapTextureEngineService.setPZSource(source5, texture)
    |> CubemapTextureEngineService.setNZSource(source6, texture);

  (engineState, (source1, source2, source3, source4, source5, source6));
};
module Method = {
  let renderWrapSSelect = textureIndex =>
    <Select
      label="WrapS Mode"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapS(textureIndex)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(TextureWrapUtils.changeWrapS(textureIndex))
    />;

  let renderWrapTSelect = textureIndex =>
    <Select
      label="WrapT Mode"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapT(textureIndex)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(TextureWrapUtils.changeWrapT(textureIndex))
    />;
  let renderFilterMagSelect = textureIndex =>
    <Select
      label="Filter Mag Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureIndex)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeFilterMag(textureIndex))
    />;

  let renderFilterMinSelect = textureIndex =>
    <Select
      label="Filter Min Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureIndex)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeFilterMin(textureIndex))
    />;
};

let component = ReasonReact.statelessComponent("TextureInspector");

let render = ((dispatchFunc, renameFunc), name, textureIndex, _self) =>
  <article key="TextureInspector" className="wonder-texture-assetTree">
    <div className="">
      <h1> (DomHelper.textEl("Texture")) </h1>
      <hr />
      <div className="">
        <StringInput
          label="name"
          defaultValue=name
          onBlur=renameFunc
          isNull=false
        />
      </div>
      <div className=""> (Method.renderWrapSSelect(textureIndex)) </div>
      <div className=""> (Method.renderWrapTSelect(textureIndex)) </div>
      <div className=""> (Method.renderFilterMagSelect(textureIndex)) </div>
      <div className=""> (Method.renderFilterMinSelect(textureIndex)) </div>
    </div>
  </article>;

let make = (~store, ~dispatchFunc, ~name, ~textureIndex, ~renameFunc, _children) => {
  ...component,
  render: self => render((dispatchFunc, renameFunc), name, textureIndex, self),
};
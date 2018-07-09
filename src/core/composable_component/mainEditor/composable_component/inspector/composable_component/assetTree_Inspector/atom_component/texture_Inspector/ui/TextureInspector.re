module Method = {
  let renderWrapSSelect = textureId =>
    <Select
      label="WrapS Mode"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapS(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(TextureWrapUtils.changeWrapS(textureId))
    />;

  let renderWrapTSelect = textureId =>
    <Select
      label="WrapT Mode"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapT(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(TextureWrapUtils.changeWrapT(textureId))
    />;
  let renderFilterMagSelect = textureId =>
    <Select
      label="Filter Mag Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeFilterMag(textureId))
    />;

  let renderFilterMinSelect = textureId =>
    <Select
      label="Filter Min Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeFilterMin(textureId))
    />;
};

let component = ReasonReact.statelessComponent("TextureInspector");

let render = ((dispatchFunc, renameFunc), name, textureId, _self) =>
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
      <div className=""> (Method.renderWrapSSelect(textureId)) </div>
      <div className=""> (Method.renderWrapTSelect(textureId)) </div>
      <div className=""> (Method.renderFilterMagSelect(textureId)) </div>
      <div className=""> (Method.renderFilterMinSelect(textureId)) </div>
    </div>
  </article>;

let make = (~store, ~dispatchFunc, ~name, ~textureId, ~renameFunc, _children) => {
  ...component,
  render: self => render((dispatchFunc, renameFunc), name, textureId, self),
};
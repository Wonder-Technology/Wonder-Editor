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
  let renderMagFilterSelect = textureIndex =>
    <Select
      label="Mag Filter Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureIndex)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeMagFilter(textureIndex))
    />;

  let renderMinFilterSelect = textureIndex =>
    <Select
      label="Min Filter Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureIndex)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeMinFilter(textureIndex))
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
          canBeNull=false
        />
      </div>
      <div className=""> (Method.renderWrapSSelect(textureIndex)) </div>
      <div className=""> (Method.renderWrapTSelect(textureIndex)) </div>
      <div className=""> (Method.renderMagFilterSelect(textureIndex)) </div>
      <div className=""> (Method.renderMinFilterSelect(textureIndex)) </div>
    </div>
  </article>;

let make =
    (~store, ~dispatchFunc, ~name, ~textureIndex, ~renameFunc, _children) => {
  ...component,
  render: self =>
    render((dispatchFunc, renameFunc), name, textureIndex, self),
};
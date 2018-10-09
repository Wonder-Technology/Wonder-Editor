module Method = {
  let renderWrapSSelect = textureComponent =>
    <Select
      label="WrapS Mode"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapS(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(TextureWrapUtils.changeWrapS(textureComponent))
    />;

  let renderWrapTSelect = textureComponent =>
    <Select
      label="WrapT Mode"
      options=(TextureWrapUtils.getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapT(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertWrapToInt
      )
      onChange=(TextureWrapUtils.changeWrapT(textureComponent))
    />;
  let renderMagFilterSelect = textureComponent =>
    <Select
      label="Mag Filter Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeMagFilter(textureComponent))
    />;

  let renderMinFilterSelect = textureComponent =>
    <Select
      label="Min Filter Mode"
      options=(TextureFilterUtils.getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeMinFilter(textureComponent))
    />;
};

let component = ReasonReact.statelessComponent("TextureInspector");

let render = ((dispatchFunc, renameFunc), name, textureComponent, _self) =>
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
      <div className=""> (Method.renderWrapSSelect(textureComponent)) </div>
      <div className=""> (Method.renderWrapTSelect(textureComponent)) </div>
      <div className=""> (Method.renderMagFilterSelect(textureComponent)) </div>
      <div className=""> (Method.renderMinFilterSelect(textureComponent)) </div>
    </div>
  </article>;

let make =
    (~store, ~dispatchFunc, ~name, ~textureComponent, ~renameFunc, _children) => {
  ...component,
  render: self =>
    render((dispatchFunc, renameFunc), name, textureComponent, self),
};
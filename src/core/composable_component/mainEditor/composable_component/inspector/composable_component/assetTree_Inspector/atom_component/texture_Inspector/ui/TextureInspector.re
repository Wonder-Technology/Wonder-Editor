module Method = {
  let renderWrapSSelect = textureComponent =>
    <Select
      label="WrapS"
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
      label="WrapT"
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
      label="Mag Filter"
      options=(TextureFilterUtils.getMagFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureComponent)
        |> StateLogicService.getEngineStateToGetData
        |> TextureTypeUtils.convertFilterToInt
      )
      onChange=(TextureFilterUtils.changeMagFilter(textureComponent))
    />;

  let renderMinFilterSelect = textureComponent =>
    <Select
      label="Min Filter"
      options=(TextureFilterUtils.getMinFilterOptions())
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
    <h1> (DomHelper.textEl("Texture")) </h1>
    <hr />
    <StringInput
      label="Name"
      defaultValue=name
      onBlur=renameFunc
      canBeNull=false
    />
    (Method.renderWrapSSelect(textureComponent))
    (Method.renderWrapTSelect(textureComponent))
    (Method.renderMagFilterSelect(textureComponent))
    (Method.renderMinFilterSelect(textureComponent))
  </article>;

let make =
    (~store, ~dispatchFunc, ~name, ~textureComponent, ~renameFunc, _children) => {
  ...component,
  render: self =>
    render((dispatchFunc, renameFunc), name, textureComponent, self),
};
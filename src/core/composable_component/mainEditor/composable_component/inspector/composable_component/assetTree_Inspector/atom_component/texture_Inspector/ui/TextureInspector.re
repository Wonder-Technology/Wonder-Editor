open Wonderjs;
open SourceTextureType;
open DiffType;
open SelectType;

module Method = {
  let changeWrapS = (textureId, value) => {
    WonderLog.Log.print(("select wraps ", value)) |> ignore;
    BasicSourceTextureEngineService.setWrapS(
      value |> TextureInspectorUtils.convertIntToWrap,
    )
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|textureId|], type_: Texture},
       |]);
  };

  let changeWrapT = (textureId, value) => {
    WonderLog.Log.print(("select wrapt ", value)) |> ignore;
    BasicSourceTextureEngineService.setWrapT(
      value |> TextureInspectorUtils.convertIntToWrap,
    )
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|textureId|], type_: Texture},
       |]);
  };

  let _getWrapOptions = () => [|
    {key: REPEAT |> TextureInspectorUtils.convertWrapToInt, value: "REPEAT"},
    {
      key: MIRRORED_REPEAT |> TextureInspectorUtils.convertWrapToInt,
      value: "MIRRORED_REPEAT",
    },
    {
      key: CLAMP_TO_EDGE |> TextureInspectorUtils.convertWrapToInt,
      value: "CLAMP_TO_EDGE",
    },
  |];

  let renderWrapSSelect = textureId =>
    <Select
      label="WrapS Mode"
      options=(_getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapS(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureInspectorUtils.convertWrapToInt
      )
      onChange=(changeWrapS(textureId))
    />;

  let renderWrapTSelect = textureId =>
    <Select
      label="WrapT Mode"
      options=(_getWrapOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getWrapT(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureInspectorUtils.convertWrapToInt
      )
      onChange=(changeWrapT(textureId))
    />;
  let _getFilterOptions = () => [|
    {
      key: NEAREST |> TextureInspectorUtils.convertFilterToInt,
      value: "NEAREST",
    },
    {
      key: LINEAR |> TextureInspectorUtils.convertFilterToInt,
      value: "LINEAR",
    },
    {
      key: NEAREST_MIPMAP_NEAREST |> TextureInspectorUtils.convertFilterToInt,
      value: "NEARESTMIPMAPNEAREST",
    },
    {
      key: LINEAR_MIPMAP_NEAREST |> TextureInspectorUtils.convertFilterToInt,
      value: "LINEARMIPMAPNEAREST",
    },
    {
      key: NEAREST_MIPMAP_LINEAR |> TextureInspectorUtils.convertFilterToInt,
      value: "NEARESTMIPMAPLINEAR",
    },
    {
      key: LINEAR_MIPMAP_LINEAR |> TextureInspectorUtils.convertFilterToInt,
      value: "LINEARMIPMAPLINEAR",
    },
  |];

  let changeFilterMag = (textureId, value) => {
    WonderLog.Log.print(("select filter mag ", value)) |> ignore;
    BasicSourceTextureEngineService.setMagFilter(
      value |> TextureInspectorUtils.convertIntToFilter,
    )
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|textureId|], type_: Texture},
       |]);
  };

  let changeFilterMin = (textureId, value: int) => {
    WonderLog.Log.print(("select filter min ", value)) |> ignore;
    BasicSourceTextureEngineService.setMinFilter(
      value |> TextureInspectorUtils.convertIntToFilter,
    )
    |> StateLogicService.getAndRefreshEngineStateWithDiff([|
         {arguments: [|textureId|], type_: Texture},
       |]);
  };

  let renderFilterMagSelect = textureId =>
    <Select
      label="Filter Mag Mode"
      options=(_getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMagFilter(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureInspectorUtils.convertFilterToInt
      )
      onChange=(changeFilterMag(textureId))
    />;

  let renderFilterMinSelect = textureId =>
    <Select
      label="Filter Min Mode"
      options=(_getFilterOptions())
      selectedKey=(
        BasicSourceTextureEngineService.getMinFilter(textureId)
        |> StateLogicService.getEngineStateToGetData
        |> TextureInspectorUtils.convertFilterToInt
      )
      onChange=(changeFilterMin(textureId))
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
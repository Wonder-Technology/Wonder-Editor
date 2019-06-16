open WonderBsMost;

open WonderBsJszip;

open Js.Promise;

type state = {
  selectTreeForGenerateAllAB: SelectTreeType.tree,
  nameInputValue: string,
  dependencyRelationInputValue: string,
};

type action =
  | ChangeName(string)
  | ChangeDependencyRelation(string)
  | UpdateSelectTreeForGenerateAllAB(SelectTreeType.tree);

module Method = {
  let _toggleSelect = (tree, send, isSelect, node) => {
    let tree = SelectTreeUtils.setSelectForSelectTree(tree, isSelect, node);

    send(UpdateSelectTreeForGenerateAllAB(tree));
  };

  let _buildGenerateAllABUI = (send, selectTreeForGenerateAllAB) =>
    <SelectTree
      key={DomHelper.getRandomKey()}
      tree=selectTreeForGenerateAllAB
      toggleSelectFunc={_toggleSelect(selectTreeForGenerateAllAB, send)}
      getValueNodeIconFunc={
        (type_, value, editorState) =>
          switch (type_) {
          | "assetBundle" => Some("./public/img/assetBundle.png")
          | _ => None
          }
      }
    />;

  let _convertDependencyRelationInputValueStrToMap = [%raw
    dependencyRelationInputValueStr => {|
         return eval( dependencyRelationInputValueStr);
         |}
  ];

  let _generateRABAndSABData = selectTreeForGenerateAllAB =>
    IterateTreeSelectTreeService.fold(
      ~tree=selectTreeForGenerateAllAB,
      ~acc=(
        WonderCommonlib.ArrayService.createEmpty(),
        WonderCommonlib.ArrayService.createEmpty(),
      ),
      ~valueNodeFunc=
        ((sabDataArr, rabDataArr), nodeId, nodeData) =>
          ValueNodeSelectTreeService.getIsSelect(nodeData) ?
            {
              let value = ValueNodeSelectTreeService.getValue(nodeData);

              switch (ValueNodeSelectTreeService.getType(nodeData)) {
              | "assetBundle" =>
                let {type_, path, assetBundle}: HeaderAssetBundleType.assetBundleData =
                  value |> HeaderAssetBundleType.convertValueToAssetBundleData;

                switch (type_) {
                | NodeAssetType.SAB => (
                    sabDataArr |> ArrayService.push((path, assetBundle)),
                    rabDataArr,
                  )
                | NodeAssetType.RAB => (
                    sabDataArr,
                    rabDataArr |> ArrayService.push((path, assetBundle)),
                  )
                };
              | type_ =>
                WonderLog.Log.fatal(
                  WonderLog.Log.buildFatalMessage(
                    ~title="_generateRABAndSABData",
                    ~description={j|unknown type_: $type_|j},
                    ~reason="",
                    ~solution={j||j},
                    ~params={j||j},
                  ),
                )
              };
            } :
            (sabDataArr, rabDataArr),
      ~folderNodeFunc=(acc, nodeId, nodeData, children) => acc,
      (),
    );

  let generateAllABZip =
      (
        selectTreeForGenerateAllAB,
        (zipBaseName, dependencyRelationInputValueStr),
        createZipFunc,
        (editorState, engineState),
      ) =>
    MostUtils.callFunc(() =>
      (
        _convertDependencyRelationInputValueStrToMap(
          dependencyRelationInputValueStr,
        ),
        _generateRABAndSABData(selectTreeForGenerateAllAB),
      )
    )
    |> Most.flatMap(((dependencyRelation, rabAndSABData)) =>
         GenerateAssetBundleEngineService.generateAllAB(
           dependencyRelation,
           rabAndSABData,
         )
       )
    |> Most.flatMap(((wab, rabDataArr, sabDataArr)) =>
         (
           ArrayService.fastConcat(rabDataArr, sabDataArr)
           |> ArrayService.push(("WonderWAB.wab", wab))
           |> WonderCommonlib.ArrayService.reduceOneParam(
                (. zip, (relativePath, ab)) =>
                  zip
                  ->(
                      Zip.write(
                        ~options=Options.makeWriteOptions(~binary=true, ()),
                        relativePath,
                        `trustme(ab |> TypeArrayType.newBlobFromArrayBuffer),
                      )
                    ),
                createZipFunc(),
              )
         )
         ->(Zip.generateAsyncBlob(Zip.makeAsyncBlobOptions()))
         |> then_(content =>
              FileSaver.saveAs(content, {j|$zipBaseName.zip|j}) |> resolve
            )
         |> Most.fromPromise
       );

  let buildDefaultDependencyRelationInputValue = () => {|
    (function() {
        var dependencyRelation = {};

        //todo need rewrite
        dependencyRelation["A.sab"] = ["AssetBundle/B.rab", "AssetBundle/F/c.rab"];

        return dependencyRelation;
    }())
    |};

  let _changeName = event =>
    ChangeName(
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
    );

  let _changeDependencyRelation = event =>
    ChangeDependencyRelation(
      ReactDOMRe.domElementToObj(ReactEventRe.Form.target(event))##value,
    );

  let _renderNameInput = ((state, send)) =>
    <div className="content-field">
      <div className="field-title"> {DomHelper.textEl("name")} </div>
      <div className="field-content">
        <input
          className="input-component"
          type_="text"
          value={state.nameInputValue}
          onChange={_e => send(_changeName(_e))}
        />
      </div>
    </div>;

  let _renderDependencyRelationInput = ((state, send)) =>
    <div className="content-field content-textarea">
      <div className="field-title"> {DomHelper.textEl("relation")} </div>
      <div className="field-content">
        <textarea
          className="input-component"
          type_="text"
          value={state.dependencyRelationInputValue}
          onChange={_e => send(_changeDependencyRelation(_e))}
        />
      </div>
    </div>;

  let renderGenerateAllABModal =
      ((state, send), languageType, (closeFunc, submitFunc)) =>
    <article className="wonder-generateAllAB-modal">
      <div className="modal-item">
        <div className="modal-item-header">
          {
            DomHelper.textEl(
              LanguageUtils.getHeaderLanguageDataByType(
                "generate-all-ab",
                languageType,
              ),
            )
          }
          <img src="./public/img/close.png" onClick={_e => closeFunc()} />
        </div>
        <div className="modal-item-content">
          {_renderNameInput((state, send))}
          {_renderDependencyRelationInput((state, send))}
          {_buildGenerateAllABUI(send, state.selectTreeForGenerateAllAB)}
        </div>
        <div className="modal-item-footer">
          <button
            className="footer-submit"
            onClick={
              _e =>
                generateAllABZip(
                  state.selectTreeForGenerateAllAB,
                  (state.nameInputValue, state.dependencyRelationInputValue),
                  Zip.create,
                )
                |> StateLogicService.getStateToGetData
                |> Most.concat(MostUtils.callFunc(submitFunc))
                |> Most.subscribe({
                     "next": _ => (),
                     "error": e => {
                       let message = Obj.magic(e)##message;
                       let stack = Obj.magic(e)##stack;

                       ConsoleUtils.error(
                         LogUtils.buildErrorMessage(
                           ~description={j|$message|j},
                           ~reason="",
                           ~solution={j||j},
                           ~params={j|stack: $stack|j},
                         ),
                       )
                       |> StateLogicService.getEditorState;
                     },
                     "complete": () => (),
                   })
                |> ignore
            }>
            {DomHelper.textEl("Submit")}
          </button>
        </div>
      </div>
    </article>;
};

let component =
  ReasonReact.reducerComponent("HeaderAssetBundleGenerateAllAB");

let reducer = (action, state) =>
  switch (action) {
  | ChangeName(name) => ReasonReact.Update({...state, nameInputValue: name})
  | ChangeDependencyRelation(dependencyRelation) =>
    ReasonReact.Update({
      ...state,
      dependencyRelationInputValue: dependencyRelation,
    })
  | UpdateSelectTreeForGenerateAllAB(selectTree) =>
    ReasonReact.Update({...state, selectTreeForGenerateAllAB: selectTree})
  };

let render =
    ({state, send}: ReasonReact.self('a, 'b, 'c), (closeFunc, submitFunc)) => {
  let languageType =
    LanguageEditorService.unsafeGetType |> StateLogicService.getEditorState;

  Method.renderGenerateAllABModal(
    (state, send),
    languageType,
    (closeFunc, submitFunc),
  );
};

let make = (~selectTreeForGenerateAllAB, ~closeFunc, ~submitFunc, _children) => {
  ...component,
  initialState: () => {
    selectTreeForGenerateAllAB,
    nameInputValue: "WonderAllAB",
    dependencyRelationInputValue:
      Method.buildDefaultDependencyRelationInputValue(),
  },
  reducer,
  render: self => render(self, (closeFunc, submitFunc)),
};
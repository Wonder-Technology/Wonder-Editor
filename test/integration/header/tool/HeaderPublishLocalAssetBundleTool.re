let buildPublishLocalModal =
    (
      ~title="publish local",
      ~defaultName="WonderLocal",
      ~defaultUseWorker=false,
      ~defaultUseAssetBundle=false,
      ~closeFunc=() => (),
      ~submitFunc=(
                    zipName,
                    useWorker,
                    (useAssetBundle, selectTreeForAssetBundle),
                  ) =>
                    (),
      (),
    ) =>
  <PublishLocalModal
    title
    defaultName
    defaultUseWorker
    defaultUseAssetBundle
    closeFunc
    submitFunc
  />;

let buildSelectTreeForAssetBundle = PublishLocalModal.Method.buildSelectTreeForAssetBundle;

/* TODO refactor */
let setSelectForSelectTree = (isSelect, nodeName, tree) =>
  HeaderAssetBundleUtils.GenerateAB.setSelectForSelectTree(
    tree,
    isSelect,
    HeaderAssetBundleTool.findNodeByName(nodeName, tree)
    |> OptionService.unsafeGet,
  );
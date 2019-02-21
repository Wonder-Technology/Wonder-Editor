let buildSceneTreeContainerJsObj =
    (~scrollLeft=11., ~scrollTop=12., ~offsetWidth=12., ~offsetHeight=12., ()) =>
  {
    "scrollLeft": scrollLeft,
    "scrollTop": scrollTop,
    "offsetWidth": offsetHeight,
    "offsetHeight": offsetHeight,
  }
  |> Obj.magic;

let buildSceneTreeNodeDomClientRect = (~offsetLeft=11., ~offsetTop=12., ()) =>
  {"offsetLeft": offsetLeft, "offsetTop": offsetTop} |> Obj.magic;
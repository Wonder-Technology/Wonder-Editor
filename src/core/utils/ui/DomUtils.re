let rec _iterateArrayDom = (targetDom, domArray, isIncludeTarget) =>
  domArray
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. isIncludeTarget, dom) =>
         isIncludeTarget || targetDom === dom === true ?
           true :
           {
             let children =
               (dom |> DomHelperType.convertDomElementToJsObj)##children;

             _iterateArrayDom(targetDom, children, isIncludeTarget);
           },
       isIncludeTarget,
     );

let isSpecificDomChildrenHasTargetDom = (targetDom, domArray) =>
  _iterateArrayDom(targetDom, domArray, false);

let hideDom = [%raw
  domId => {|
                          document.querySelector("#" + domId).style.display = "none";
    |}
];

let showDomFlex = [%raw
  domId => {|
                          document.querySelector("#" + domId).style.display = "flex";
    |}
];
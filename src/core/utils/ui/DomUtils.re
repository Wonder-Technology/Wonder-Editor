let isSpecificDomChildrenHasTargetDom = (targetDom, domArray) => {
  let isIncludeTarget = ref(false);
  let rec _iterateArrayDom = (targetDom, domArray, isIncludeTarget) => {
    let domLen = domArray |> Js.Array.length;

    domArray |> Js.Array.length === 0 ?
      isIncludeTarget :
      {
        for (x in 0 to domLen - 1) {
          targetDom === domArray[x] ?
            {
              isIncludeTarget := true;

              isIncludeTarget;
            } :
            {
              let children = (
                               domArray[x]
                               |> DomHelperType.convertDomElementToJsObj
                             )##children;

              _iterateArrayDom(targetDom, children, isIncludeTarget);
            };
        };
        isIncludeTarget;
      };
  };

  (_iterateArrayDom(targetDom, domArray, isIncludeTarget))^;
};
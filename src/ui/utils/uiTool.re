[@bs.val] external currentTime : unit => int = "Date.now";

[@bs.val] external requireCss : string => unit = "import";

[@bs.send] external internal_getAttribute : (Js.t('a), string) => Js.null(string) = "getAttribute";

[@bs.module "../../../../../src/ui/utils/jsTool"] external dangerousHtml : string => Js.t('a) =
  "dangerousHtml";

[@bs.module "../../../../../src/ui/utils/jsTool"] external distanceFromBottom : unit => int =
  "distanceFromBottom";

let fromNow = (unixtime) => {
  let delta = currentTime() / 1000 - unixtime;
  switch delta {
  | time when time < 3600 => string_of_int(time / 60) ++ "minutes age"
  | time when time < 86400 => string_of_int(time / 3600) ++ "hours age"
  | time => string_of_int(time / 86400) ++ "days age"
  }
};

let getAttribute = (node, name) => Js.Null.to_opt(internal_getAttribute(node, name));

let intEl = (n) => ReasonReact.stringToElement(string_of_int(n));

let textEl = (str) => ReasonReact.stringToElement(str);
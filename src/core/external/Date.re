open DateType;

let fromNow = unixtime => {
  let delta = currentTime() / 1000 - unixtime;
  switch (delta) {
  | time when time < 3600 => string_of_int(time / 60) ++ "minutes age"
  | time when time < 86400 => string_of_int(time / 3600) ++ "hours age"
  | time => string_of_int(time / 86400) ++ "days age"
  };
};
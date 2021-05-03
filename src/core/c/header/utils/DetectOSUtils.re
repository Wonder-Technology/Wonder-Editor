let isMac = () => {
  let platform = Navigator.navigator##platform;

  platform == "Mac68K"
  || platform == "MacPPC"
  || platform == "Macintosh"
  || platform == "MacIntel";
};
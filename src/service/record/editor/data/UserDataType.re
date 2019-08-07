type repoRecord = {
  id: int,
  name: string,
  description: string,
  filePath: string,
};

type userDataRecord = {
  userName: option(string),
  profilePath: option(string),
  email: option(string),
  currentRepo: option(repoRecord),
  userRepos: option(array(repoRecord)),
};
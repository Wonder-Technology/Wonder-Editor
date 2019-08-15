type repoRecord = {
  id: int,
  name: string,
  description: string,
  filePath: string,
};

type userDataRecord = {
  userId: option(int),
  userName: option(string),
  email: option(string),
  currentRepo: option(repoRecord),
  userRepos: option(array(repoRecord)),
};
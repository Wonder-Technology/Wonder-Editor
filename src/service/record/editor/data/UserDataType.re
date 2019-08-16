type repoRecord = {
  id: int,
  name: string,
  description: string,
  filePath: string,
};

type userDataRecord = {
  userId: int,
  userName: string,
  hashCode: string,
  email: string,
  currentRepo: repoRecord,
  userRepos: array(repoRecord),
};
// eslint-disable-next-line
export async function getVersion(_req:any, res: any) {
  const version: string = "Oshavery v.0.1.1";
  const { GIT_COMMIT_HASH } = process.env;
  const revision: string = GIT_COMMIT_HASH || "";
  // バージョンを返す
  res.type("application/json").code(200);

  return{
    version,
    revision,
  };
}

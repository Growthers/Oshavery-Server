// eslint-disable-next-line
export function getVersion(_req: any, res: any) {
  const { GIT_COMMIT_HASH } = process.env;
  const version = "Oshavery v.0.1";
  const revision: string = GIT_COMMIT_HASH || "";
  // バージョンを返す
  res.type("application/json").code(200);

  res.send({
    version,
    revision,
  });
}

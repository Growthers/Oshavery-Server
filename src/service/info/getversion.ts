export function version() {
  const version = "Oshavery v.0.1.3";
  const { GIT_COMMIT_HASH } = process.env;
  const revision: string = GIT_COMMIT_HASH || "";
  return {
    version: version,
    revision: revision,
  };
}

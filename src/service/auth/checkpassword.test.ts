import { checkLoginPassword } from "./checkpassword";

describe("Service/Auth/CheckPassword", () => {
  it("should get channels", async function () {
    const res = await checkLoginPassword({
      raw: "aiueo",
      encoded: "$2a$10$MvQQYOJq8Hovb7zUzwE.nuL0Mr1minmYxzRCtlC.FsssG5rKJcZwC",
    });
    expect(res).toBeTruthy();
  });

  it("should not check password", async () => {
    const res = await checkLoginPassword({
      raw: "",
      encoded: "$2a$10$MvQQYOJq8Hovb7zUzwE.nuL0Mr1minmYxzRCtlC.FsssG5rKJcZwC",
    });
    expect(res).toBeFalsy();
  });
});

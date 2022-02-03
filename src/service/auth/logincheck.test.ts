import { genJWTAuthToken } from "./jwt";
import { loginCheck } from "./logincheck";

describe("Service/Auth/Logincheck", () => {
  it("should return true", async function () {
    const token = await genJWTAuthToken({
      id: "00000000-0000-0000-0000-000000000000",
    });
    if (token != null) {
      const res = await loginCheck(token);
      expect(res).toBeTruthy();
    } else {
      fail();
    }
  });

  it("should return false", async () => {
    const res = await loginCheck("");
    expect(res).toBeFalsy();
  });
});

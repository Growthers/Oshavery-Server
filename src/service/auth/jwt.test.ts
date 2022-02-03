import { checkLoginPassword } from "./checkpassword";
import { genJWTAuthToken, verifyToken } from "./jwt";

describe("Service/Auth/Jwt", () => {
  it("should generate token", async function () {
    const res = await genJWTAuthToken({
      id: "00000000-0000-0000-0000-000000000000",
    });
    expect(res).toBeTruthy();
  });

  it("should not generate token", async () => {
    const res = await genJWTAuthToken({
      id: "",
    });
    expect(res).toBeFalsy();
  });

  it("should not generate token", async () => {
    const token = await genJWTAuthToken({
      id: "00000000-0000-0000-0000-000000000000",
    });
    if (token != null) {
      const res = await verifyToken(token);
      expect(res).toBeTruthy();
    } else {
      fail();
    }
  });
});

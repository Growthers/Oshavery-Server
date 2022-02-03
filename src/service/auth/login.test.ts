import { Login } from "./login";

describe("Service/Auth/Login", () => {
  it("should login success", async function () {
    const res = await Login({
      id: "00000000-0000-0000-0000-000000000000",
      password: "oshavery",
    });
    expect(res).toBeTruthy();
  });

  it("should login fail:invalid id", async () => {
    const res = await Login({
      id: "",
      password: "oshavery",
    });
    expect(res).toBeFalsy();
  });

  it("should login fail:invalid password", async () => {
    const res = await Login({
      id: "00000000-0000-0000-0000-000000000000",
      password: "",
    });
    expect(res).toBeFalsy();
  });
});

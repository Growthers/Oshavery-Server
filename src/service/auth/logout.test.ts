import { logout } from "./logout";

describe("Service/Auth/Logout", () => {
  it("should logout success", async () => {
    const res = await logout(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJpYXQiOjE1MTYyMzkwMjJ9.jwVZVfzzdJ8k-5Sl4D9IA5QDCk_1k_RpbBNXS85GkUU"
    );
    expect(res).toBeTruthy();
  });

  it("should return false", async () => {
    const res = await logout("Bearer");
    expect(res).toBeFalsy();
  });
});

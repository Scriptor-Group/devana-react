// setTokenCookie.test.js
import { hexToTransparentHex, randomString } from "./commons";

describe("randomString", () => {
  test("should generate a random string of the specified length", () => {
    const length = 10;
    const randomStr = randomString(length);
    expect(randomStr).toHaveLength(length);
  });

  test("should generate a random string of length 10 by default", () => {
    const randomStr = randomString();
    expect(randomStr).toHaveLength(10);
  });
});

describe("hexToTransparentHex", () => {
  test("should convert a HEX color to a transparent HEX color", () => {
    const hex = "#ff0000";
    const opacity = 0.5;
    const transparentHex = hexToTransparentHex(hex, opacity);
    expect(transparentHex).toBe("rgba(255, 0, 0, 0.5)");
  });

  test("should handle invalid HEX colors", () => {
    const hex = "#invalid";
    const opacity = 0.5;
    const transparentHex = hexToTransparentHex(hex, opacity);
    expect(transparentHex).toBe("rgba(0, 0, 0, 0.5)");
  });
});

// useApi.test.js
import { renderHook, act } from "@testing-library/react";
import { useApi } from "./useApi";
import { getTokenCookie, setTokenCookie } from "../commons";

jest.mock("../commons", () => ({
  getTokenCookie: jest.fn(),
  setTokenCookie: jest.fn(),
}));

jest.mock("../config", () => ({
  API_URL: "https://api.example.com",
  API_VERSION: "/v1",
}));

describe("useApi", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize token from options or cookie", async () => {
    const tokenFromCookie = "token-from-cookie";
    // @ts-ignore
    getTokenCookie.mockReturnValue(tokenFromCookie);

    const { result: withoutOptions } = renderHook(() => useApi("public-key"));
    expect(withoutOptions.current.token).toBe(tokenFromCookie);

    const tokenFromOptions = "token-from-options";
    const { result: withOptions } = renderHook(() =>
      useApi("public-key", { token: tokenFromOptions }),
    );
    expect(withOptions.current.token).toBe(tokenFromOptions);
  });

  test("should create token", async () => {
    const publicKey = "public-key";
    const mockToken = "token-from-cookie";
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: mockToken }),
      }),
    );

    const { result } = renderHook(() => useApi(publicKey));
    await act(async () => {
      const token = await result.current.createToken();
      expect(token).toBe(mockToken);
      expect(setTokenCookie).toHaveBeenCalledWith(mockToken);

      expect(result.current.token).toBe(mockToken);
    });
  });

  test("should get conversation history", async () => {
    const mockToken = "mock-token";
    const mockMessages = [{ id: 1, content: "Message 1" }];
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ messages: mockMessages }),
      }),
    );

    const { result } = renderHook(() =>
      useApi("public-key", { token: mockToken }),
    );
    const messages = await result.current.getConversationHistory();
    expect(messages).toEqual(mockMessages);
  });
});

import { TOKEN_COOKIE_NAME, removeAuthToken } from "./auth";

type HttpOptionsType = RequestInit | { headers: Record<string, any> };

type AppResponse = Record<string, any>;

export type FetchError = {
  status: number;
  message: string;
};

export type AppError = {
  status: number;
  message: string;
  errors?: { message: string; location: string }[];
};

type ApiReturn<ResponseType, ErrorType> = {
  response?: ResponseType;
  error?: ErrorType | FetchError;
};

/**
 * Wrapper around fetch to make it easy to handle errors
 */
export async function httpCall<
  ResponseType = AppResponse,
  ErrorType = AppError
>(
  url: string,
  options?: HttpOptionsType
): Promise<ApiReturn<ResponseType, ErrorType>> {
  let statusCode: number = 0;
  try {
    const response = await fetch(url, {
      credentials: "include",
      ...options,
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getCookie(TOKEN_COOKIE_NAME)}`,
        ...(options?.headers ?? {}),
      }),
    });
    statusCode = response.status;

    const data = await response.json();

    if (response.ok) {
      return {
        response: data as ResponseType,
        error: undefined,
      };
    }

    // Logout user if token is invalid
    if (data.status === 401) {
      removeAuthToken();
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      return { response: undefined, error: data as ErrorType };
    }

    return {
      response: undefined,
      error: data as ErrorType,
    };
  } catch (error: any) {
    return {
      response: undefined,
      error: {
        status: statusCode,
        message: error.message,
      },
    };
  }
}

export async function httpPost<
  ResponseType = AppResponse,
  ErrorType = AppError
>(
  url: string,
  body: Record<string, any>,
  options?: HttpOptionsType
): Promise<ApiReturn<ResponseType, ErrorType>> {
  return httpCall<ResponseType, ErrorType>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function httpGet<ResponseType = AppResponse, ErrorType = AppError>(
  url: string,
  queryParams?: Record<string, any>,
  options?: HttpOptionsType
): Promise<ApiReturn<ResponseType, ErrorType>> {
  const searchParams = new URLSearchParams(queryParams).toString();
  const queryUrl = searchParams ? `${url}?${searchParams}` : url;

  return httpCall<ResponseType, ErrorType>(queryUrl, {
    credentials: "include",
    method: "GET",
    ...options,
  });
}

// 简单的 cookie 获取函数（用于服务端渲染兼容）
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

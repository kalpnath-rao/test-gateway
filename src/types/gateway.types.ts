export interface User {
  isAuthenticated: boolean;
  accessToken?: string;
}

export interface RequestContext {
  request: {
    headers: {
      get: (key: string) => string | null;
      set: (key: string, value: string) => void;
    };
  };
}

export interface ValidationParams {
  fieldDirectives?: {
    authenticated?: boolean;
  };
  user: User;
}

export interface TokenPayload {
  tid: string;
  typ: string;
  aid: string;
}

export interface HeaderPayload {
  request: {
    headers: {
      get: (key: string) => string | null;
    };
  };
}

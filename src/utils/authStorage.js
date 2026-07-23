const AUTH_KEY = "auth";

export const saveAuth = (authData) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
};

export const getAuth = () => {
  const auth = localStorage.getItem(AUTH_KEY);

  return auth ? JSON.parse(auth) : null;
};

export const removeAuth = () => {
  localStorage.removeItem(AUTH_KEY);
};
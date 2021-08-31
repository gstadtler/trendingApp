import api from "./api";

export const authenticate = async (values) => {
  const { data } = await api("/users/v1/auth/signin", {
    method: "POST",
    auth: {
      username: values.email,
      password: values.password,
    },
  });
  return data;
};

export const fetchUserData = async (token) => {
  const { data } = await api("/users/v1/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const fetchUserProjects = async (token) => {
  const { data } = await api("/projects/v1/project", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

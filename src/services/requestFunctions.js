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

export const createKit = async (values, token) => {
  const response = await api("/kits/v1/kit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      title: values.title,
      description: "trending topic do twitter",
      tier: "CUSTOM",
      type: "LEARNING",
      questions: [{ id: Math.random(), question: values.question }],
    },
  });
  return response;
};

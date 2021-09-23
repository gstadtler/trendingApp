import api from "./api";

export const authenticate = async (values) => {
  let functionReturn;
  await api("/users/v1/auth/signin", {
    method: "POST",
    auth: {
      username: values.email,
      password: values.password,
    },
  })
    .then((response) => {
      functionReturn = response;
    })
    .catch((err) => {
      throw Error(err.message);
    });

  return functionReturn;
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
      description: values.description,
      tier: "CUSTOM",
      type: "LEARNING",
      questions: values.questions,
      references: values.references,
    },
  });
  return response;
};

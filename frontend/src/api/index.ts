export const getHeaders = (headers = {}) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...headers,
});

export const handleResponse = async (res: Response) => {
  if (res.ok) {
    if (res.status === 200) {
      try {
        const response = await res.json();
        return response;
      } catch (e) {
        return await Promise.resolve({});
      }
    }
    return Promise.resolve({});
  } else {
    if (typeof res.json === 'function') {
      const err = await res.json();
      throw { response: err, status: res.status, headers: res.headers };
    } else {
      throw { response: undefined, status: res.status, headers: res.headers };
    }
  }
};

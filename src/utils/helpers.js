export const urlPathBuilder = (url, params) => {
  let constructedUrl = url;
  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      constructedUrl = constructedUrl.replace(`:${key}`, value.toString());
    }
  }
  return constructedUrl;
};

export const isEmpty = data => {
  switch (typeof data) {
    case "object":
      if (data === null) {
        return true;
      }
      return Object.keys(data).length === 0;
    case "string":
      return data === "";
    case "undefined":
      return true;
    default:
      return false;
  }
};
export const isEmpty = (data: any) => {
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
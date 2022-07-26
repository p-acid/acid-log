export const checkGif = (fileName: string) => {
  const dotIndex = fileName.lastIndexOf(".");
  const extention = fileName.slice(dotIndex + 1);

  return extention === "gif";
};

const useTag = (allPostsData) => {
  const obj = {};

  allPostsData.forEach(({ tags }) =>
    tags.forEach(
      (tag) => (obj[tag] = typeof obj[tag] === "undefined" ? 1 : obj[tag] + 1)
    )
  );

  const sortedArr = Object.entries(obj).sort((a, b) => b[1] - a[1]);

  return sortedArr;
};

export default useTag;

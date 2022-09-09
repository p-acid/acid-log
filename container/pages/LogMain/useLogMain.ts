import { useCallback, useState } from "react";

const useLogMain = ({ allLogs }) => {
  const [category, setCategory] = useState("");

  const selectCategory = useCallback(() => {
    setCategory();
  }, []);

  return { category };
};

export default useLogMain;

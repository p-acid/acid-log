import { useCallback, useMemo, useState } from "react";

import { Log, Option } from "../../../interface/CommonTypes";
import { getLogTerm } from "../../../utils/date";

const useLogMain = ({ allLogs }: { allLogs: Log[] }) => {
  const [terms, setTerms] = useState([]);
  const [filter, setFilter] = useState([]);

  const options = useMemo(() => {
    let categorizedTerms = {};

    allLogs.forEach((log) => {
      const logDate = new Date(log.date);
      const year = logDate.getFullYear();
      const month = logDate.getMonth();

      if (!categorizedTerms[year]) {
        categorizedTerms[year] = [month];
        return;
      }

      if (categorizedTerms[year].includes(month)) return;

      categorizedTerms[year] = [...categorizedTerms[year], month];
    });

    const options = Object.entries(categorizedTerms).map(
      ([year, months]: [string, number[]]) => ({
        label: `${year}년`,
        value: months.map((month) => ({
          label: `${month}월`,
          value: `${year}/${month + 1}`,
        })),
      })
    );

    return options;
  }, [allLogs]);

  const filteredLogs = useMemo(() => {
    if (filter.length <= 0) return allLogs;

    return allLogs.filter((log) =>
      filter.includes(getLogTerm(new Date(log.date)))
    );
  }, [allLogs, getLogTerm, filter]);

  const handleTerms = useCallback(
    (option: Option) => {
      setTerms((prev) => {
        if (prev.includes(option.value)) {
          const filteredList = prev.filter((term) => term !== option.value);
          return filteredList;
        }

        return [...prev, option.value];
      });

      setFilter((prev) => [...prev, option.value]);
    },
    [setTerms]
  );

  const removeTerms = useCallback((selectedTerm: string) => {
    setTerms((prev) => {
      const filteredList = prev.filter((term) => term !== selectedTerm);
      return filteredList;
    });

    setFilter((prev) => {
      const filteredList = prev.filter((filter) => filter !== selectedTerm);
      return filteredList;
    });
  }, []);

  const handleFilter = useCallback(
    (selectedTerm: string) => {
      setFilter((prev) => {
        if (prev.includes(selectedTerm)) {
          const filteredList = prev.filter((filter) => filter !== selectedTerm);
          return filteredList;
        }

        return [...prev, selectedTerm];
      });
    },
    [setFilter]
  );

  const componentProps = {
    category: {
      options,
      terms,
      filter,
      handleTerms,
      removeTerms,
      handleFilter,
    },
  };

  return { componentProps, filteredLogs };
};

export default useLogMain;

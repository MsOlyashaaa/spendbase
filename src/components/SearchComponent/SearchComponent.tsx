import { Input } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react";
import { TItem } from "../../types";
import SearchIcon from "@mui/icons-material/Search";

type SearchComponentProps = {
  initiatedData: TItem[];
  setFilter: Dispatch<SetStateAction<string[] | null>>
};

let filteredData: string[] = [];

const SearchComponent: FC<SearchComponentProps> = ({ initiatedData, setFilter }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchItem = useCallback((item: TItem, query: string) => {
    if (item.children != null && item.children.length > 0) {
      let anyAdded = false;

      item.children.forEach(i => {
        const added = searchItem(i, query);
        anyAdded = anyAdded || added;
      });

      if (anyAdded) {
        filteredData.push(item.id);
        return true;
      }
    }

    if (item.name.includes(query)) {
      filteredData.push(item.id);
      return true;
    }

    return false;
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    filteredData = [];
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (searchQuery) {
      initiatedData.forEach(value => searchItem(value, searchQuery));
      setFilter(filteredData);
    } else {
      setFilter(null);
    }
  }, [initiatedData, searchItem, searchQuery, setFilter]);


  return (
    <Input
      type="text"
      startAdornment={<SearchIcon />}
      value={searchQuery}
      onChange={handleSearch}
      placeholder="Пошук..."
    />
  );
};

export default SearchComponent;

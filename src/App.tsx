import { FC, useState } from "react";
import "./App.css";
import SearchComponent from "./components/SearchComponent";
import TreeView from "./components/TreeView";
import { fakeData } from "./data";

const App: FC = () => {
  const [filter, setFilter] = useState<string[] | null>(null);

  return (
    <div className="App">
      <SearchComponent setFilter={setFilter} initiatedData={fakeData} />
      <TreeView data={fakeData} filter={filter} />
    </div>
  );
};

export default App;

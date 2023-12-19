import FolderIcon from "@mui/icons-material/Folder";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { FC, useState } from "react";
import { TItem } from "../../types";
import "./styles.css";

type TreeViewProps = {
  data: TItem[]
  filter: string[] | null
}

const TreeView: FC<TreeViewProps> = ({ data, filter }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (itemId: string) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter((id) => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const renderTreeItem = (item: TItem) => {
    const isFolder = item.type === "folder";
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);

    const handleItemClick = () => {
      if (isFolder) {
        toggleExpand(item.id);
      }
    };

    const className = `child_item ${isFolder && hasChildren ? "child_item_folder" : ""}`;

    return (
      <div className={className} onClick={handleItemClick}>
        {isFolder ? (
          hasChildren ? isExpanded ? <FolderIcon /> : <FolderCopyIcon /> : <FolderOpenIcon />
        ) : (
          <InsertDriveFileOutlinedIcon />
        )}
        <span>{item.name}</span>
      </div>
    );
  };

  const renderTree = (items: TItem[]) =>
    items
      .filter((item) => (filter ? filter.includes(item.id) : true))
      .map((item) => (
        <div key={item.id}>
          {renderTreeItem(item)}
          {expandedItems.includes(item.id) && item.type === "folder" && (
            <div className="tree_child">{item.children && renderTree(item.children)}</div>
          )}
        </div>
      ));

  return <div className="tree_view">{renderTree(data)}</div>;
};

export default TreeView;

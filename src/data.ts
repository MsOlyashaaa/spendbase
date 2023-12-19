import { TItem } from "./types";

export const fakeData: TItem[] = [
  {
    id: "1",
    name: "Folder 8",
    type: "folder",
    children: [
      {
        id: "3",
        name: "File 2",
        type: "file"
      }, {
        id: "4",
        name: "Folder 6",
        type: "folder",
        children: [{
          id: "5",
          name: "File 1",
          type: "file"
        }]
      }
    ]
  },
  {
    id: "6",
    name: "Folder 2",
    type: "folder",
    children: [{
      id: "7",
      name: "File 1",
      type: "file"
    }, {
      id: "8",
      name: "Folder 1",
      type: "folder",
      children: [{
        id: "9",
        name: "File 4",
        type: "file"
      }, {
        id: "433",
        name: "File 1",
        type: "file"
      }]
    }]
  }, {
    id: "11",
    name: "Empty folder",
    type: "folder"
  }
];

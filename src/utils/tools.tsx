import React from "react";
import GlobalSearch from "../assets/tools/GlobalSearch";
import AgentTools from "../assets/tools/Agent";
import WebTools from "../assets/tools/Web";
import FileOpenTools from "../assets/tools/FileOpen";
import DalleTools from "../assets/tools/Dalle";
import FolderOpenTools from "../assets/tools/FolderOpen";
import FindPageTools from "../assets/tools/FindPage";
import FolderCopyTools from "../assets/tools/FolderCopy";

export const toolsIcons = (toolName: string): JSX.Element => {
  if (toolName.startsWith("a-")) {
    return <AgentTools />;
  }

  switch (toolName) {
    case "global-search":
      return <GlobalSearch />;
      break;
    case "google":
      return (
        <img src="./assets/google.png" alt="google" width={24} height={24} />
      );
      break;
    case "website":
      return <WebTools />;
      break;
    case "get-file-content":
      return <FileOpenTools />;
      break;
    case "dalle":
      return <DalleTools />;
      break;
    case "list-of-knowledge-bases":
      return <FolderOpenTools />;
      break;
    case "search-files":
      return <FindPageTools />;
      break;
    case "knowledge-db-search":
      return <FolderCopyTools />;
      break;
    default:
      return <></>;
  }
};

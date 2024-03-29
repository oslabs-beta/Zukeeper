import React from "react";
import { diffProps } from "./types";
import useExtensionStore from "../../store/useExtensionStore";
import { useStore } from "zustand";
import "./DiffDisplay.scss";

export const DiffItem = (props: diffProps): JSX.Element => {
  const { previousStates, currState, prevState, isDarkMode } =
    useStore(useExtensionStore);

  let path: string = "";
  for (let element of props.obj.path) {
    if (typeof element === "string") {
      path += `${element}.`;
    }
  }

  path = path.slice(0, -1);
  let item: JSX.Element = <></>;
  if (props.obj.kind === "E") {
    item = (
      <div className={`diff-item ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        {path}: {props.obj.lhs} {"=>"} {props.obj.rhs}
      </div>
    );
  } else if (props.obj.kind === "N") {
    item = (
      <div className={`diff-item ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        newly added {props.obj.rhs}
      </div>
    );
  } else if (props.obj.kind === "D") {
    item = (
      <div className={`diff-item ${isDarkMode ? "dark-theme" : "light-theme"}`}>
        deleted {props.obj.lhs}
      </div>
    );
  } else if (props.obj.kind === "A") {
    if (props.obj.item.kind === "D") {
      item = (
        <div
          className={`diff-item ${isDarkMode ? "dark-theme" : "light-theme"}`}
        >
          <div>{path}: </div>
          <div>
            + deleted array element {props.obj.item.lhs} at index{" "}
            {props.obj.index}
          </div>
        </div>
      );
    } else if (props.obj.item.kind === "N") {
      if (props.action) {
        item = (
          <div
            className={`diff-item ${isDarkMode ? "dark-theme" : "light-theme"}`}
          >
            <div>{path}: </div>
            <div>
              + Added array element {props.obj.item.rhs} at index{" "}
              {props.obj.index}
            </div>
            <div>
              +{" "}
              {JSON.stringify(prevState[props.obj.path])
                .replaceAll(/,/g, ", ")
                .replaceAll(/:/g, ": ")}{" "}
              {"=>"}{" "}
              {JSON.stringify(currState[props.obj.path])
                .replaceAll(/,/g, ", ")
                .replaceAll(/:/g, ": ")}
            </div>
          </div>
        );
      } else {
        item = (
          <div
            className={`diff-item ${isDarkMode ? "dark-theme" : "light-theme"}`}
          >
            <div>{path}: </div>
            <div>
              + Added array element {props.obj.item.rhs} at index{" "}
              {props.obj.index}
            </div>
            <div>
              +{" "}
              {JSON.stringify(
                previousStates[previousStates.length - 2][props.obj.path]
              )
                .replaceAll(/,/g, ", ")
                .replaceAll(/:/g, ": ")}{" "}
              {"=>"}{" "}
              {JSON.stringify(
                previousStates[previousStates.length - 1][props.obj.path]
              )
                .replaceAll(/,/g, ", ")
                .replaceAll(/:/g, ": ")}
            </div>
          </div>
        );
      }
    }
  }

  return <>{item}</>;
};

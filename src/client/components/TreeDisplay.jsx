import React from 'react';
import Tree from 'react-d3-tree';
import useExtensionStore from '../store/useExtensionStore';
import { useStore } from 'zustand';
import './TreeDisplay.scss'

export const TreeDisplay = () => {

  const { previousStates, currState} = useStore(useExtensionStore);

  const childrenGen = (array, key) => {
    const children = [];
    for (let i = 0; i < array.length; i += 1) {
        if (Array.isArray(array[i]))
          children = children.concat(array[i].childrenGen());
        else
          children.push({name: `${key} [${i}]`, attributes: {value: array[i]}});
    }
    return children;
  };

  const HierarchyConvert = (obj) => {
    const hierarchyObj = {
      name: 'state',
      children: [],
    };
  
    for (const key in obj){
      if (typeof (obj[key]) !== 'object' && !Array.isArray(obj[key]))
        // attribute needs to be conditially added
        hierarchyObj.children.push({name: key, attributes: {value: obj[key]}});
      else if (Array.isArray(obj[key])) {
        const children = childrenGen(obj[key], key);
        hierarchyObj.children.push({name: key, children: children});
      } 
      else
        hierarchyObj.children.push({name: key, attributes: {value: obj[key]}});
    }
    return hierarchyObj
  }

  let stateHeirarchy;
  if(Object.keys(currState).length > 0){
    stateHeirarchy = HierarchyConvert(currState)
  } else {
    stateHeirarchy = HierarchyConvert(previousStates[previousStates.length - 1])
  }

  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle r={10} onClick={toggleNode}></circle>
      <text fill="black" stroke="black" strokeWidth="1" y='4' x={nodeDatum.children? "-13" : "13"} textAnchor={nodeDatum.children? "end" : "start"}>
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes &&
        (<text fill="black" stroke="black" strokeWidth="1" x="20" dy="20" >
          value: {nodeDatum.attributes.value}
        </text>
        )}
    </g>
  );

  
  return (
    <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
      <Tree data={stateHeirarchy} 
      rootNodeClassName="node__root"
      branchNodeClassName="node__branch"
      leafNodeClassName="node__leaf"
      depthFactor={180}
      enableLegacyTransitions={true}
      transitionDuration={750}
      separation={{ siblings: .3, nonSiblings: 1 }}
      translate={{ x: 100, y: 350 }}
      scaleExtent={{ max: 2, min: .5 }}
      nodeSize={{ x: 200, y: 200 }}
      renderCustomNodeElement={rd3tProps =>
        renderForeignObjectNode({ ...rd3tProps })
      }
      />
    </div>
  );
};

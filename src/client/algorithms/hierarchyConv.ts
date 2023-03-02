/* 
hierarchyConv takes in the state to display in the visualization tree,
and converts it to a format readable by D3. 

const example = {
  name: 'State',
  children: [
    {
      name: 'member1',
      attributes: {
        value: 'org1',
      },
    },
    {
      name: 'member2',
      children: [
        name: 'member3',
        attributes: {
          value: 'org2'
        }
      ]
    }
  ]
}  
 */

function hierarchyConv(state) {
  const parent = {
    name: "root",
    children: [],
  };

  function addNodeToTree(key, value, parent) {
    if (Array.isArray(value) && value.length > 0) {
      const node = { name: key, children: [] };
      parent.children.push(node);
      value.forEach((item, index) => {
        addNodeToTree(`[${index}]`, item, node);
      });
    } else if (typeof value === "object" && Object.keys(value).length > 0) {
      const node = { name: key, children: [] };
      parent.children.push(node);
      Object.entries(value).forEach(([key, val]) => {
        addNodeToTree(key, val, node);
      });
    } else {
      if (typeof value === "object") {
        const node = { name: key, attributes: { value: "empty" } };
        parent.children.push(node);
      } else {
        const node = { name: key, attributes: { value } };
        parent.children.push(node);
      }
    }
  }

  addNodeToTree("state", state, parent);
  return parent.children[0];
}

export default hierarchyConv;

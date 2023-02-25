function HierarchyConv(state) {

  const parent = {
    name: 'root',
    children: []
  }
  
  function addNodeToTree(key, value, parent){
    if (Array.isArray(value) && value.length > 0) {
      const node = { name: key, children: [] };
      parent.children.push(node);
      value.forEach((item, index) => {
        addNodeToTree(`[${index}]`, item, node);
      });
    } else if (typeof value === 'object' && Object.keys(value).length > 0) {
      const node = { name: key, children: [] };
      parent.children.push(node);
      Object.entries(value).forEach(([key, val]) => {
        addNodeToTree(key, val, node);
      });
    } else {
        if (typeof value === 'object'){
          const node = { name: key, attributes: { value: 'empty' } };
          parent.children.push(node);
        } else {
          const node = { name: key, attributes: { value } };
          parent.children.push(node);
        }   
    }
  }

  addNodeToTree('state', state, parent)
  return parent.children[0]
}

export default HierarchyConv; 

function zukeeper(createFunction) {
  return (set, get) => {
    const store = createFunction(set, get);
    for (let key in store) {
      if (typeof store[key] === 'function') {
        let functionDefinition = store[key];
        store[key] = (...args) => {
          functionDefinition(...args);
          const currstate = get();
          window.postMessage({
            body: 'Data',
            state: JSON.stringify(currstate),
            actions: key,
          });
        };
      }
    }
    return store;
  };
}

export default zukeeper;
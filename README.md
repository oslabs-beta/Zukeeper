# Zukeeper

Zukeeper is a set of devtools for Zustand, in Zustand, featuring action and state logging, diffing, state hierarchy visualization, and time travel debugging. It's meant for the Zustand community, so it's fully open source and in active development ([flag issues](https://github.com/oslabs-beta/Zukeeper/issues), send us PRs!)

## How do I use it?

Zukeeper was designed with simplicity in mind, and the setup reflects that. Here's how you can start:

Install the [Zukeeper chrome extension](https://chrome.google.com/webstore/detail/zukeeper-zustand-devtools/copnnlbbmgdflldkbnemmccblmgcnlmo?hl=en)

npm install zukeeper
```javascript
npm i zukeeper
```
Import zukeeper into your store creation file
Pass zukeeper as middleware to create( )
Assign your store, as you named it, to window.store

![An image showing how to implement Zukeeper when creating a Zustand store](./README%20assets/zukeeperSetup.png)

That's it! Once your extension is installed and your store is ready, you're good to go. Zukeeper lives in the Chrome devtool panel, just as you'd expect. Open them up, and begin using the tools! We look forward to expanding to additional browsers in upcoming releases.

---
## What can it do?

Zukeeper's primary features are:

Action and state tracking:

![action and state tracking in Zukeeper](./README%20assets/stateActionTracking.gif)

Diffing:

![diffing in Zukeeper](./README%20assets/diffing.gif)

State hierarchy visualization:

![state hierarchy in Zukeeper](./README%20assets/treeVis.gif)

Time travel debugging:

![time travel debugging in Zukeeper](./README%20assets/timeTravel.gif)

and of course… Dark mode:

![Zukeeper in dark mode](./README%20assets/darkMode.png)

---

## How can I help?

Use Zukeeper! Hunt bugs, flag issues, and send us PRs! We're excited to bring Zukeeper to the community, and we hope the community will be excited to improve. Here is the repo - we look forward to your contributions!
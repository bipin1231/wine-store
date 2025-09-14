// sessionStorage.js
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("checkoutState");
    if (serializedState === null) {
      return undefined; // no saved state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("checkoutState", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Clear sessionStorage (use after payment success or cancel)
export const clearState = () => {
  try {
    sessionStorage.removeItem("checkoutState");
  } catch (err) {
    console.error("Could not clear session state", err);
  }
};


export const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export const readUsersData = () => JSON.parse(localStorage.getItem('usersData'));

export const saveUsersData = (usersData) => localStorage
  .setItem('usersData', JSON.stringify(usersData));

export const addLocalStorage = (userData) => {
  if (!JSON.parse(localStorage.getItem('usersData'))) {
    localStorage.setItem('usersData', JSON.stringify([]));
  }
  if (userData) {
    const usersData = readUsersData();
    saveUsersData([...usersData, userData]);
  }
};

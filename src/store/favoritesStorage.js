export const saveFavToStorage = (favArray) => {
  try {
    const serFavArray = JSON.stringify(favArray);
    localStorage.setItem("favorites", serFavArray);
  } catch (error) {
    console.log(error);
  }
};

export const loadFavFromStorage = () => {
  try {
    const serFavArray = localStorage.getItem("favorites");
    if (serFavArray === null) {
      return undefined;
    }
    return JSON.parse(serFavArray);
  } catch (error) {
    console.log(error);
  }
};

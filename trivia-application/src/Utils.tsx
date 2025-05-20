// turns the url name into the display name for displaying
export const getDisplayName = (type: string) => {
  let nameArr: string[] = type.replace('-', ' ').split(' ');
  for (var i = 0; i < nameArr.length; i++) {
      nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1);     
  }
  
  return nameArr.join(' ');
}

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
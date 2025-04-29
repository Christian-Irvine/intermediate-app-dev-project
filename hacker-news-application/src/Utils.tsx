// turns the url name into the display title for the page
export const getDisplayName = (type: string) => {
  let nameArr: string[] = type.replace('-', ' ').split(' ');
  for (var i = 0; i < nameArr.length; i++) {
      nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1);     
  }
  
  return nameArr.join(' ');
}

// gets the url for a story in the API
export const getStoryApiRoute = (id: string) => {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
}
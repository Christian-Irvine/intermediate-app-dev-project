/**
 * Created by Christian James Irvine
 * Contains utility functions for the rest of the project
 */

// turns the url name into the display title for the page
export const getDisplayName: Function = (type: string) => {
  let nameArr: string[] = type.replace("-", " ").split(" ");
  for (var i = 0; i < nameArr.length; i++) {
    nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1);
  }

  return nameArr.join(" ");
};

// gets the url for a story in the API
export const getStoryApiRoute: Function = (id: string) => {
  return `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
};

// formats time from a string to a dateTime in New Zealand time
export const formatTime: Function = (time: string) => {
  const date: Date = new Date(Number(time) * 1000);
  return date.toLocaleDateString("nz-ST", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
};

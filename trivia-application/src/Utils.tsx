/**
 * Created by Christian James Irvine
 * Contains utility functions for the rest of the project
 */

// Turns the url name into the display name for displaying
export const getDisplayName: Function = (type: string) => {
  let nameArr: string[] = type.replace("-", " ").split(" ");
  for (var i = 0; i < nameArr.length; i++) {
    nameArr[i] = nameArr[i].charAt(0).toUpperCase() + nameArr[i].substring(1);
  }

  return nameArr.join(" ");
};

// A random int function between min (inclusive) and max (exclusive)
export const getRandomInt: Function = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Score interface
export interface Score {
  userName: string;
  score: number;
  category: string;
}

// Gets the category name based on the categoryId
const getHighScoreCategoryName: Function = (category: string) => {
  return `${category}HighScores`;
};

// Loads high scores from localStorage
export const loadHighScores: Function = (category: string) => {
  const scores: string | null = localStorage.getItem(
    getHighScoreCategoryName(category),
  );

  if (scores) {
    return JSON.parse(scores);
  }
};

// Sets high scores
const setHighScores: Function = (category: string, newScores: Array<Score>) => {
  const jsonString: string = JSON.stringify(newScores);

  localStorage.setItem(getHighScoreCategoryName(category), jsonString);
};

// Adds new high score and sorts it
export const addNewHighScore: Function = (
  category: string,
  newScore: Score,
) => {
  let scores: Array<Score> = loadHighScores(category) || [];

  scores.push(newScore);
  scores.sort((score1, score2) => score2.score - score1.score);

  setHighScores(category, scores);
};

// formats a category to its display name
export const formatCategory: Function = (
  categoryName: string,
  categories: any,
) => {
  if (categoryName === "any-category") {
    return "Any Category";
  }

  const validCategory = categories.trivia_categories.find(
    (category: any) => category.id.toString() === categoryName,
  );

  return validCategory.name;
};

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

export interface Score {
  userName: string;
  score: number;
  category: string;
}

const getHighScoreCategoryName = (category: string) => {
  return `${category}HighScores`;
}

export const loadHighScores = (category: string) => {
  const scores: string | null = localStorage.getItem(getHighScoreCategoryName(category));

  if (scores) {
    return JSON.parse(scores);
  }
}

const setHighScores = (category: string, newScores: Array<Score>) => {
  const jsonString: string = JSON.stringify(newScores);

  localStorage.setItem(getHighScoreCategoryName(category), jsonString);
}

export const addNewHighScore = (category: string, newScore: Score) => {
  let scores: Array<Score> = loadHighScores(category) || [];

  scores.push(newScore);
  scores.sort((score1, score2) => score1.score - score2.score);

  setHighScores(category, scores);
}
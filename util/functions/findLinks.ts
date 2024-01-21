// export function findLinks(inputText: string) {
//   const urlPattern =
//     /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

//   const words = inputText.split(/\s+/);
//   const urlIndices = [];

//   for (let i = 0; i < words.length; i++) {
//     if (urlPattern.test(words[i])) {
//       // If the word matches the URL pattern, store the index
//       urlIndices.push(i);
//     }
//   }

//   return urlPattern.test(inputWord);
// }

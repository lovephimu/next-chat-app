export function checkedMessageLength(
  inputMessage: string,
  inputCharacterLimit: number,
) {
  // Return false if input exceeds the character limit
  return inputMessage.trim() && inputMessage.length <= inputCharacterLimit;
}

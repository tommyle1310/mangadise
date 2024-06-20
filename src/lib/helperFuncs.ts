export const maximizeWordLimit = (text: string, wordLimit: number = 20): string => {
    const words = text.split('');
    if (words.length <= wordLimit) {
        return text;
    }
    return words.slice(0, wordLimit).join('') + '...';
};

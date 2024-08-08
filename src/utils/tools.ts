export const formatLongString = (str: string, len: number = 6): string => {
  if (str.length <= len * 2) {
    return str;
  }
  const start = str.slice(0, len);
  const end = str.slice(-len);
  return `${start}...${end}`;
};
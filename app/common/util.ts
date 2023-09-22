export const dateFormat = (date: string) => {
  return date.replace(/:/g, ".");
};

export const convertTag = (tag: string) => {
  const tagTrimmed = tag.replace(/\s/g, "");
  const tagArray = tagTrimmed.split("#");
  tagArray.shift();
  return tagArray;
};

export const addSharpToTag = (tagArray: any) => {
  if (tagArray) {
    let tag = "";
    tagArray.map((u: any) => {
      tag = tag + "#" + u;
    });
    return tag;
  } else "";
};

export const GetUsername = (author: string) =>
  author == "hyunwooda@gmail.com" ? "현우" : null;

export const trimDate = (date: string) => date.substring(2, 15);

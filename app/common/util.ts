import GoogleProvider from "next-auth/providers/google";

// export const dateFormat = (date: string) => {
//   return date.replace(/:/g, ".");
// };

export const convertTag = (tag: string) => {
  const tagTrimmed = tag.replace(/\s/g, "");
  const tagArray = tagTrimmed.split("#");
  return tagArray.filter((u) => u != "");
};

export const addSharpToTag = (tagArray: any) => {
  if (tagArray) {
    let tag = "";
    tagArray.map((u: any) => {
      tag = tag + " #" + u;
    });
    return tag;
  } else "";
};

export const GetUsername = (user: any) =>
  user.email == "hyunwooda@gmail.com"
    ? "현우"
    : user.email == "sunyoung.joo1@gmail.com"
    ? "선영"
    : user.name;
;

export const trimDate = (date: string) => date.substring(2, 15);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const dateFormatTest = (s: string) => {
  const regex = RegExp(/^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/);
  return regex.test(s);
};

export const updateTagSet = (
  tagsSet: any,
  oldTag: string[],
  newTag: string[]
) => {
  let newTagsSet = { ...tagsSet };
  const toBeDeleted = oldTag.filter((e) => !newTag.includes(e));
  const toBeAdded = newTag.filter((e) => !oldTag.includes(e));

  if (toBeDeleted.length > 0) {
    toBeDeleted.forEach((e) => {
      if (newTagsSet[e] > 1) {
        newTagsSet = { ...newTagsSet, [e]: newTagsSet[e] - 1 };
      } else {
        delete newTagsSet[e];
      }
    });
  }
  if (toBeAdded.length > 0) {
    const tagsKey = Object.keys(newTagsSet);
    toBeAdded.forEach((e) => {
      if (tagsKey.includes(e)) {
        newTagsSet = { ...newTagsSet, [e]: newTagsSet[e] + 1 };
      } else {
        newTagsSet = { ...newTagsSet, [e]: 1 };
      }
    });
  }
  return newTagsSet;
};

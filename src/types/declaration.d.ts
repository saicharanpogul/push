declare module '*.png';

type TabBarParamList = {
  NFTs: {};
  Bookmark: {};
};

type NFT = {
  name: string;
  owner: string;
  videoUri?: string;
  imageUri: string;
  tokenId: string;
};

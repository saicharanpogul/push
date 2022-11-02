import {createSlice} from '@reduxjs/toolkit';

import {RootState} from '../store';

export interface BookmarkState {
  nfts: NFT[];
  tokenIds: string[];
  loading: boolean;
  error: string;
}

const initialState: BookmarkState = {
  nfts: [],
  tokenIds: [],
  loading: false,
  error: '',
};

export const bookmark = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    resetBookmarks: state => {
      state.nfts = [];
      state.tokenIds = [];
    },
    bookmarkNFT: (state, action) => {
      const tokenId = action.payload.data.tokenId;
      state.nfts.push(action.payload.data);
      state.tokenIds = [...state.tokenIds, tokenId];
    },
    removeBookmarkedNFT: (state, action) => {
      state.tokenIds = state.tokenIds.filter(
        id => id !== action.payload.data.tokenId,
      );
      state.nfts = state.nfts.filter(
        nft => nft.tokenId !== action.payload.data.tokenId,
      );
    },
  },
});

export const {bookmarkNFT, removeBookmarkedNFT, resetBookmarks} =
  bookmark.actions;

export const getNfts = (state: RootState) => state.bookmark.nfts;
export const getTokenIds = (state: RootState) => state.bookmark.tokenIds;

export default bookmark.reducer;

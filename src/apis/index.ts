import axios from 'axios';
import Config from 'react-native-config';

export const getNFTs = async (tokenId: string) => {
  try {
    const {data} = await axios.get(
      `${Config.BASE_URL}/${Config.NFT_CONTRACT}/nft_metadata/${tokenId}/?quote-currency=USD&format=JSON&key=${Config.COVALENT_KEY}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

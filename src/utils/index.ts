export const truncateAddress = (address: string) => {
  return (
    address.slice(0, 4) +
    '...' +
    address.slice(address.length - 4, address.length)
  );
};

export const wait = (timeout: number) => {
  return new Promise((resolve: any) => setTimeout(resolve, timeout));
};

// utils/addressUtils.js
export const truncateAddress = (address) => {
    if (address && address.length >= 10) {
      const start = address.slice(0, 6);
      const end = address.slice(-4);
      return `${start}...${end}`;
    }
    return address;
  };
  
export const truncateAddress = (address) => {
    if (!address) return address;
    
    return `${address.substring(0, 10)}...${address.substring(address.length-4)}`;
}
import {
    Tr,
    HStack,
    Text,
    Td,
    Image
  } from '@chakra-ui/react';
  
  const Coin = ({
    image,
    name,
    symbol,
    current_price,
    market_cap,
    total_volume,
    price_change_percentage_24h,
    live_price_usd,
    live_change,
    live_volume,
  }) => {
    // Convert live USD price to INR if available, otherwise use CoinGecko INR price
    const priceInInr = live_price_usd ? (live_price_usd * 83).toFixed(2) : current_price?.toFixed(2);
  
    // Choose live or static change percentage
    const change = live_change !== null && live_change !== undefined
      ? live_change
      : price_change_percentage_24h;
  
    // Choose live or static volume
    const volume = live_volume !== null && live_volume !== undefined
      ? live_volume
      : total_volume;
  
    return (
      <Tr
        onClick={() =>
          window.open(`https://www.tradingview.com/symbols/${symbol.toUpperCase()}USDT/`, '_blank')
        }
        _hover={{ bg: 'gray.700', cursor: 'pointer' }}
      >
        <Td>
          <HStack>
            <Image boxSize="30px" objectFit={'contain'} src={image} alt={name} />
            <Text>{name}</Text>
          </HStack>
        </Td>
  
        <Td>
          <Text textTransform={'uppercase'}>{symbol}</Text>
        </Td>
  
        <Td>₹{priceInInr}</Td>
  
        <Td>
          {change < 0 ? (
            <Text color="red.500">{change.toFixed(2)}%</Text>
          ) : (
            <Text color="green.300">{change.toFixed(2)}%</Text>
          )}
        </Td>
  
        <Td>{volume ? volume.toLocaleString() : 'N/A'}</Td>
  
        <Td>{market_cap ? market_cap.toLocaleString() : 'N/A'}</Td>
      </Tr>
    );
  };
  
  export default Coin;
  
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, VStack, Spinner } from '@chakra-ui/react';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Cointable from './components/Cointable';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loaded, setLoaded] = useState(false);

  // 1. Get initial data from CoinGecko
  const getCoins = async () => {
    const uri =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false';
    try {
      const res = await axios.get(uri);
      const data = res.data;

      // Add placeholder for live data
      const mappedCoins = data.map((coin) => ({
        ...coin,
        live_price_usd: null,
        live_volume: null,
        live_change: null,
      }));

      setCoins(mappedCoins);
      setLoaded(true);

      // Setup WebSocket only after coins loaded
      setupWebSocket(mappedCoins);
    } catch (error) {
      console.error('Failed to fetch coins:', error);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  // 2. Setup Binance WebSocket
  const setupWebSocket = (coinList) => {
    const symbols = coinList
      .map((coin) => coin.symbol.toLowerCase() + 'usdt')
      .join('/');

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${symbols
        .split('/')
        .map((s) => `${s}@ticker`)
        .join('/')}`
    );

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const data = message.data;

      setCoins((prevCoins) =>
        prevCoins.map((coin) =>
          (coin.symbol.toLowerCase() + 'usdt') === data.s.toLowerCase()
            ? {
                ...coin,
                live_price_usd: parseFloat(data.c),
                live_volume: parseFloat(data.v),
                live_change: parseFloat(data.P),
              }
            : coin
        )
      );
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };
  };

  // 3. Search filter
  const filterCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container maxW={'5xl'} py={6}>
        <VStack spacing={10}>
          <Searchbar search={search} setSearch={setSearch} />
          {!loaded ? (
            <Spinner
              thickness="4px"
              speed="0.5s"
              emptyColor="gray.600"
              color="purple.500"
              size="xl"
            />
          ) : (
            <Cointable coins={filterCoins} />
          )}
        </VStack>
      </Container>
    </>
  );
}

export default App;

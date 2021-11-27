import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CompletionTriggerKind } from "typescript";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const CoinWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  padding: 20px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;

  border-radius: 15px;
  a {
    transition: color 0.2s ease-in;
    display: block;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setIsLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인 {coins.length !== 0 ? coins.length : null}</Title>
      </Header>
      <CoinsList>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          coins.map((coin) => (
            <Coin>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name, symbol: coin.symbol },
                }}
              >
                <CoinWrapper>
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </CoinWrapper>
              </Link>
            </Coin>
          ))
        )}
      </CoinsList>
    </Container>
  );
}

export default Coins;

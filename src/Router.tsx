import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}
function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark}></Coin>
        </Route>
        <Route path="/">
          <Coins toggleDark={toggleDark}></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

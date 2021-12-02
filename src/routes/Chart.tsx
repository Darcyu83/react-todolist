import { fetchCoinHis } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId: string;
}

interface IHisData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IHisData[]>(["ohlcv", coinId], () =>
    fetchCoinHis(coinId)
  );

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              { name: "Price", data: data?.map((price) => price.close) },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light", palette: "palette1" },
              chart: {
                background: "transparent",
                height: 500,
                width: 500,
                toolbar: { show: false },
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              xaxis: {
                type: "datetime",
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
                categories: data?.map((price) => price.time_close),
              },
              yaxis: { labels: { show: false } },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 100] },
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => value.toFixed(3),
                },
              },
            }}
          />

          <ApexChart
            type="candlestick"
            series={[
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              chart: {
                type: "candlestick",
                background: "transparent",
                height: 350,
                toolbar: { show: false },
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              xaxis: {
                type: "datetime",
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
                categories: data?.map((price) => price.time_close),
              },
              yaxis: { labels: { show: false }, tooltip: { enabled: true } },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 100] },
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => value.toFixed(3),
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}
export default Chart;

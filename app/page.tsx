import LineChart from './_components/LinePlot';

export default function Home() {
  return (
    <LineChart title="テスト用の折れ線グラフ" data={[10, 9, 3, 8, 15, 43, 30, 26, 19, 35]} />
  );
}


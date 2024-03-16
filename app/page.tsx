import BarChart from './_components/BarChart';
import LineChart from './_components/LineChart';

export default function Home() {
  return (
    <div>
      <LineChart title="テスト用の折れ線グラフ" data={[10, 9, 3, 8, 15, 43, 30, 26, 19, 35]} />
      <BarChart title="テスト用の棒グラフ" data={[10, 9, 3, 8, 15, 43, 30, 26, 19, 35]} />
    </div>
  );
}


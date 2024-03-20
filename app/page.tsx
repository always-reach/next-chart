import BarChart from './_components/BarChart';
import LineChart from './_components/LineChart';
import PieChart from './_components/PieChart';

export default function Home() {
  return (
    <div>
      <LineChart title="テスト用の折れ線グラフ" data={[{id:'test1', values:[10, 9, 3, 8, 15, 43, 30, 26, 19, 35]},{id:'test2',values:[1,2,3,4,5,6,7]}]} />
      <BarChart title="テスト用の棒グラフ" data={[{name:'a',value:10},{name:'b',value:3},{name:'c',value:30}]} />
      <PieChart title="テスト用の円グラフ" data={[{name:'a',value:10},{name:'b',value:3},{name:'c',value:30}]} />
    </div>
  );
}


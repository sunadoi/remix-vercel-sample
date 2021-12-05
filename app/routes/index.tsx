import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import dayjs from "dayjs";

type Data = {
  data: object[];
  diff: number;
};

export let loader: LoaderFunction = async () => {
  const startAt = dayjs(new Date());
  const data = await (
    await fetch("https://api.aoikujira.com/tenki/week.php?fmt=json&city=319")
  ).json();

  const endAt = dayjs(new Date());

  return {
    data: data["319"],
    diff: endAt.diff(startAt),
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { data, diff } = useLoaderData<Data>();

  return (
    <ul>
      <li>
        東京の明後日の天気: <code>{JSON.stringify(data[1])}</code>
      </li>
      <li>データ取得経過時間: {diff}ms</li>
    </ul>
  );
}

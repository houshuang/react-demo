import * as React from 'react';
import { connection } from './connection';
import { useReactive } from 'reactive-tools';
import ReactiveRichText from './ReactiveRichText/main';

export const Display = () => {
  const [data, dataFn, timeout] = useReactive(connection, 'examples', 'stian5');
  if (timeout) {
    return <h1>Timeout</h1>;
  }
  if (!data) {
    return '...';
  }
  return (
    <div>
      <ReactiveRichText data={data} dataFn={dataFn} path="text" userId="hi" />
      <hr />
      <ReactiveRichText data={data} dataFn={dataFn} path="text2" userId="hi" />
    </div>
  );
};

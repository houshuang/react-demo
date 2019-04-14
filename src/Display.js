import * as React from 'react';
import { connection } from './connection';
import { useReactive } from '@chilifrog/reactive-tools';
import ReactiveRichText from './ReactiveRichText/main';
import { generateUID, uidColor } from './getUser';
import Stringify from  'json-stable-stringify'
import { cloneDeep } from 'lodash'

const uid = generateUID();

export const Presence = ({ dataFn, id }) => {
  const [presence, setPresence] = React.useState({});
  React.useEffect(
    () => {
      const update = e => setPresence(cloneDeep(dataFn.doc.presence));
      dataFn.doc.on('presence', update);

      return () => dataFn.doc.removeListener('presence', update);
    },
    [id]
  );

  
  return (
    <div>
      {Object.values(presence).map(x => (
        <li key={x.u}>
          <b>{x.u}</b> - {Stringify(x)}
        </li>
      ))}
    </div>
  );
};

export const Display = () => {
  const [data, dataFn, timeout] = useReactive(
    connection,
    'examples',
    'stian5',
    uid
  );
  if (timeout) {
    return <h1>Timeout</h1>;
  }
  if (!data) {
    return '...';
  }
  return (
    <div>
      <div style={{ backgroundColor: uidColor(uid) }}>{uid}</div>
      <ReactiveRichText dataFn={dataFn} path="text" userId="hi" />
      <hr />
      <ReactiveRichText dataFn={dataFn} path="text2" userId="hi" />
      <hr />
      <Presence dataFn={dataFn} id="stian5" />
    </div>
  );
};

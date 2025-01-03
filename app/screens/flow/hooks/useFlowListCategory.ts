import { AutoFlow } from './../../../redux/types.generated';
import * as React from 'react'
import * as Types from '../../../redux/types.generated';

const {useEffect, useState} = React;

export const useFlowListCategory = (cat: string, autoFlowList: Types.AutoFlow[]) => {
  const [data, setData] = useState<(Types.AutoFlow | undefined)[]>([]);
  useEffect(() => {
    let flowList: (Types.AutoFlow | undefined)[] = [];
    switch (cat) {
      case 'all':
        flowList = [...autoFlowList];
        break;
      case 'published':
        flowList = [];
        autoFlowList.forEach((f) => {
          if (f.published) {
            flowList.push(f);
          }
        });
        break;
      case 'archive':
        flowList = [];
        autoFlowList.forEach((f) => {
          if (f.archived) {
            flowList.push(f);
          }
        });
        break;
      default:
        console.error('No such category');
        break;
    }
    setData([...(flowList ?? [])]);
  }, [cat, autoFlowList]);

  return data
}

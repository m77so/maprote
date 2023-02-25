import axios, { AxiosResponse } from 'axios';
import * as topojson from 'topojson-client'

import type { Topology } from 'topojson-specification';
import type { FeatureCollection } from 'geojson';
import { Topology as T2 } from './topology';

async function fetchTopology(): Promise<T2> {
  const response: AxiosResponse<T2> = await axios.get<T2>('https://geoshape.ex.nii.ac.jp/ka/topojson/17/h27ka17201.topojson');
  return response.data;
}

// example usage
fetchTopology().then((topology) => {
    let pols = topojson.feature((topology as unknown) as Topology, "town") as unknown as FeatureCollection
    pols = {...pols, 
    "features": pols.features.map(v=>{
        return {
            ...v,
            "properties": {
                "ANSWER": v.properties?.MOJI
            }
        }
    }),
    "bbox": topology.bbox 
    }

  console.log(JSON.stringify(pols));
}).catch((error) => {
  console.error(error);
});

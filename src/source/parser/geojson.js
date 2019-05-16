import * as turfMeta from '@turf/meta';
import { getCoords } from '@turf/invariant';

export default function geoJSON(data, cfg) {
  const resultData = [];
  data.features = data.features.filter(item => {
    return item != null && item.geometry && item.geometry.type && item.geometry.coordinates && item.geometry.coordinates.length > 0;
  });

  // 数据为空时处理
  turfMeta.flattenEach(data, (currentFeature, featureIndex) => { // 多个polygon 拆成一个
    const coord = getCoords(currentFeature);
    let id = featureIndex + 1;
    if (cfg.idField) {
      id = currentFeature.properties[cfg.idField];
    }
    const dataItem = {
      ...currentFeature.properties,
      coordinates: coord,
      _id: id
    };
    resultData.push(dataItem);
  });
  return {
    dataArray: resultData
  };
}

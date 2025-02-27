export const findDistance = (lat1: any, lat2: any, lng1: any, lng2: any) => {
  const radius = 6371;
  const radians1 = (parseInt(lat1) * Math.PI) / 180;
  const radians2 = (parseInt(lat2) * Math.PI) / 180;

  const deltaLat = ((parseInt(lat2) - parseInt(lat1)) * Math.PI) / 180;
  const deltaLng = ((parseInt(lng2) - parseInt(lng1)) * Math.PI) / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(radians1) * Math.cos(radians2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = radius * c;

  return d;
};

export const findDistance = (latitude1: any, latitude2: any, longitude1: any, longitude2: any): number => {
  const radius = 6371;
  const lat1 = parseInt(latitude1);
  const lat2 = parseInt(latitude2);
  const lng1 = parseInt(longitude1);
  const lng2 = parseInt(longitude2);

  const radians1 = (lat1 * Math.PI) / 180;
  const radians2 = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;

  // Haversine formula
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(radians1) * Math.cos(radians2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radius * c;

  return distance;
};

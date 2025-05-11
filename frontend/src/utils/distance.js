export function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(degree) {
        return degree * Math.PI / 180;
    }
    
    const R = 6371;
    const diffLat = toRad(lat2 - lat1);
    const diffLon = toRad(lon2 - lon1);
      
    const { sin, cos, sqrt, atan2 } = Math;

    const a =
      sin(diffLat / 2) ** 2 +
      cos(toRad(lat1)) * cos(toRad(lat2)) *
      sin(diffLon / 2) ** 2;
  
    const c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return R * c;
  }
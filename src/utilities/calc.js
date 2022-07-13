
export default function distanceBetweenTwoCoordinates (lat1, lng1, lat2, lng2){
const R = 6371e3; // metres earth radius
const φ1 = lat1 * Math.PI/180; 
const φ2 = lat2 * Math.PI/180;
const dLat = (lat2-lat1) * Math.PI/180;
const dLng = (lng2-lng1) * Math.PI/180;
const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(dLng/2) * Math.sin(dLng/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return (R * c/1000); // in KM

}

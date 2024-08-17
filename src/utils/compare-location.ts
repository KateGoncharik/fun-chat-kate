export default function isCurrentLocation(locationToCompare: string): boolean {
  const currentLocationWithoutDash = window.location.pathname.slice(1);
  return currentLocationWithoutDash === locationToCompare;
}


declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => any;
        Marker: new (options: any) => any;
        LatLng: new (lat: number, lng: number) => any;
      };
    };
    initMap?: () => void;
  }
}

export {};

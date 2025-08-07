
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, opts?: MapOptions);
    }
    class Marker {
      constructor(opts?: MarkerOptions);
    }
    interface MapOptions {
      center: LatLng;
      zoom: number;
    }
    interface MarkerOptions {
      position: LatLng;
      map: Map;
      title?: string;
    }
    class LatLng {
      constructor(lat: number, lng: number);
    }
  }
}

export {};

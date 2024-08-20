export type ThreeGlobePosition = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color?: string;
};

export type ThreeGlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  manualRotate?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

export type ThreeGlobeData = {
  size: number;
  order: number;
  color: (t: number) => string;
  lat: number;
  lng: number;
};

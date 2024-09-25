import {CommonModule, isPlatformBrowser} from "@angular/common";
import {AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, PLATFORM_ID, ViewChild,} from "@angular/core";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Fog,
  MathUtils,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import ThreeGlobe from "three-globe";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import {getData} from "./globe-data";
import {ThreeGlobeConfig, ThreeGlobeData, ThreeGlobePosition,} from "./ngx-three-globe.types";

@Component({
  selector: "om-three-globe",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ngx-three-globe.component.html",
  styleUrl: "./ngx-three-globe.component.scss",
})
export class NgxThreeGlobeComponent implements AfterViewInit, OnDestroy {
  @Input("styleClass")
  styleClass?: string;

  @Input("globeSize")
  set globeSize(size: string) {
    this.style["--globe-size"] = size;
  }

  style: any = {};

  @ViewChild("GlobeCanvas") rendererContainer!: ElementRef;

  private renderer = new WebGLRenderer({alpha: true});
  private scene = new Scene();
  private globe = new ThreeGlobe();
  private camera = new PerspectiveCamera();
  private orbitControls?: OrbitControls;

  private ringsInterval?: any;
  private numberOfRings = [0];
  private countries: any;

  @Input("globeConfig")
  set newGlobeConfig(config: ThreeGlobeConfig) {
    this.globeConfig = {...this.globeConfig, ...config};
  }

  private globeConfig: ThreeGlobeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    manualRotate: true,
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  @Input("arcAndRingColors")
  set arcAndRingColors(colors: string[]) {
    this.colors = colors;
  }

  @Input("arcs")
  set arcs(arcs: ThreeGlobePosition[]) {
    this.arcData = arcs;
  }

  private colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  private arcData: ThreeGlobePosition[] = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
    },
    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
    },
  ];

  private globeData: ThreeGlobeData[] = [];

  private isInView = false;
  private isAnimating = false;
  private animationFrameId?: number;
  private intersectionObserver?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {
  }

  ngAfterViewInit(): void {
    this.countries = getData();
    this.setArcColors();
    this.initRenderer();

    if (isPlatformBrowser(this.platformId)) {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.renderContents(entry.isIntersecting);
      });
      this.intersectionObserver.observe(this.rendererContainer.nativeElement);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.ringsInterval);

    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  renderContents(isIntersecting: boolean) {
    if (isIntersecting && !this.isInView) {
      this.isInView = true;

      if (!this.isAnimating) {
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      }
    } else if (!isIntersecting) {
      this.isInView = false;
    }
  }

  setArcColors(): void {
    this.arcData.forEach((arc, index) => {
      this.arcData[index].color =
        this.colors[Math.floor(Math.random() * (this.colors.length - 1))];
    });
  }

  initRenderer(): void {
    this.initGlobe();

    this.renderer.setSize(
      this.rendererContainer.nativeElement.getBoundingClientRect().width,
      this.rendererContainer.nativeElement.getBoundingClientRect().height
    );
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.animate();
  }

  animate(): void {
    if (!this.isInView) {
      this.isAnimating = false;
      return;
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (!this.isAnimating) {
      this.isAnimating = true;
    }

    if (this.globeConfig.initialPosition) {
      this.globe.rotation.set(
        MathUtils.degToRad(this.globeConfig.initialPosition.lat),
        MathUtils.degToRad(-this.globeConfig.initialPosition.lng),
        0
      );
    }

    this.orbitControls?.update();

    this.renderer.render(this.scene, this.camera);
  }

  initGlobe(): void {
    this.buildData();
    this.buildMaterial();

    this.globe
      .hexPolygonsData(this.countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(this.globeConfig.showAtmosphere ?? true)
      .atmosphereColor(this.globeConfig.atmosphereColor ?? "#ffffff")
      .atmosphereAltitude(this.globeConfig.atmosphereAltitude ?? 0.1)
      .hexPolygonColor((e) => {
        return this.globeConfig.polygonColor ?? "rgba(255,255,255,0.7)";
      });

    this.setRingInterval();
    this.startAnimation();

    this.scene.fog = new Fog(0xffffff, 400, 2000);
    this.scene.add(this.globe);

    const ambientLight = new AmbientLight(this.globeConfig.ambientLight, 0.6);

    const leftLight = new DirectionalLight(
      this.globeConfig.directionalLeftLight
    );
    leftLight.position.set(-400, 100, 400);

    const topLight = new DirectionalLight(this.globeConfig.directionalTopLight);
    topLight.position.set(-200, 500, 200);

    const pointLight = new PointLight(this.globeConfig.pointLight, 0.8);
    pointLight.position.set(-200, 500, 200);

    this.scene.add(ambientLight);
    this.scene.add(leftLight);
    this.scene.add(topLight);
    this.scene.add(pointLight);

    this.camera.aspect =
      this.rendererContainer.nativeElement.getBoundingClientRect().width /
      this.rendererContainer.nativeElement.getBoundingClientRect().height;
    this.camera.updateProjectionMatrix();
    this.camera.position.z = 300;

    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.orbitControls.autoRotate = this.globeConfig.autoRotate ?? false;
    this.orbitControls.autoRotateSpeed =
      this.globeConfig.autoRotateSpeed ?? 0.5;
    this.orbitControls.enableRotate = this.globeConfig.manualRotate ?? false;
    this.orbitControls.enablePan = false;
    this.orbitControls.enableZoom = false;
    this.orbitControls.minDistance = 300;
    this.orbitControls.maxDistance = 300;
    this.orbitControls.minPolarAngle = Math.PI / 3.5;
    this.orbitControls.maxPolarAngle = Math.PI - Math.PI / 3;
  }

  private setRingInterval(): void {
    this.ringsInterval = setInterval(() => {
      this.numberOfRings = this.genRandomNumbers(
        0,
        this.globeData.length,
        Math.floor((this.globeData.length * 4) / 5)
      );

      this.globe.ringsData(
        this.globeData.filter((d, i) => this.numberOfRings.includes(i))
      );
    }, 2000);
  }

  private buildMaterial(): void {
    const globeMaterial = this.globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };

    globeMaterial.color = new Color(this.globeConfig.globeColor);
    globeMaterial.emissive = new Color(this.globeConfig.emissive);
    globeMaterial.emissiveIntensity = this.globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = this.globeConfig.shininess || 0.9;
  }

  private buildData(): void {
    const arcs = this.arcData;
    let points: ThreeGlobeData[] = [];
    for (let i = 0; i < arcs.length; i++) {
      const arc = arcs[i];
      const rgb = this.hexToRgb(arc.color ?? "#ffffff") as {
        r: number;
        g: number;
        b: number;
      };
      points.push({
        size: this.globeConfig.pointSize ?? 0,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.startLat,
        lng: arc.startLng,
      });
      points.push({
        size: this.globeConfig.pointSize ?? 0,
        order: arc.order,
        color: (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
          )
        ) === i
    );

    this.globeData = filteredPoints;
  }

  startAnimation(): void {
    this.globe
      .arcsData(this.arcData)
      .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
      .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
      .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
      .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
      .arcColor(
        (e: any) => (e as { color: string }).color ?? "rgba(255, 255, 255, 0.8)"
      )
      .arcAltitude((e) => {
        return (e as { arcAlt: number }).arcAlt * 1;
      })
      .arcStroke((e) => {
        return [0.32, 0.28, 0.3][Math.round(Math.random() * 2)];
      })
      .arcDashLength(this.globeConfig.arcLength ?? 0)
      .arcDashInitialGap((e) => (e as { order: number }).order * 1)
      .arcDashGap(15)
      .arcDashAnimateTime((e) => this.globeConfig.arcTime ?? 0);

    this.globe
      .pointsData(this.globeData)
      .pointColor((e) => (e as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2);

    this.globe
      .ringsData([])
      .ringColor((e: any) => (t: any) => e.color(t))
      .ringMaxRadius(this.globeConfig.maxRings ?? 0)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod(
        ((this.globeConfig.arcTime ?? 0) * (this.globeConfig.arcLength ?? 0)) /
        (this.globeConfig.rings ?? 1)
      );
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  }

  private genRandomNumbers(min: number, max: number, count: number) {
    const arr = [];
    while (arr.length < count) {
      const r = Math.floor(Math.random() * (max - min)) + min;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
  }
}

import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import type { ThreeGlobeConfig, ThreeGlobePosition } from "./ngx-three-globe.types";

@Component({
  selector: "om-three-globe",
  standalone: true,
  template: `
    <div
      [attr.class]="styleClass ? 'om-three-globe ' + styleClass : 'om-three-globe'"
      [attr.style]="globeSize ? '--globe-size: ' + globeSize + ';' : null"
    >
      <div class="om-three-globe-canvas-wrapper"></div>
    </div>
  `,
  styleUrl: "../browser/ngx-three-globe.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxThreeGlobeComponent {
  @Input("styleClass")
  styleClass?: string;

  @Input("globeSize")
  globeSize?: string;

  @Input("globeConfig")
  globeConfig?: ThreeGlobeConfig;

  @Input("arcAndRingColors")
  arcAndRingColors?: string[];

  @Input("arcs")
  arcs?: ThreeGlobePosition[];
}

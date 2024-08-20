# ngx-three-globe

`@omnedia/ngx-three-globe` is an Angular library that provides an interactive, 3D globe visualization built using three-globe and three.js. This component offers customizable globe settings, light sources, and animated arcs and rings, making it perfect for data visualization or adding dynamic elements to your Angular applications.

## Features

- Fully interactive 3D globe visualization with customizable settings.
- Animated arcs and rings for displaying data between different locations on the globe.
- Customizable globe appearance, including atmosphere, lighting, and rotation.
- Built using three-globe and three.js for smooth rendering and interaction.

## Installation

Install the library and the required peer dependencies using npm:

```bash
npm install @omnedia/ngx-three-globe
npm install three three-globe --save
```

Both three-globe and three are required as peer dependencies for this library to function correctly.

## Usage

Import the `NgxThreeGlobeComponent` in your Angular module or component:

```typescript
import { NgxThreeGlobeComponent } from '@omnedia/ngx-three-globe';

@Component({
  ...
  imports: [
    ...
    NgxThreeGlobeComponent,
  ],
  ...
})
```

Use the component in your template:

```html
<om-three-globe
  [globeSize]="'800px'"
  [globeConfig]="{
    globeColor: '#062056',
    atmosphereColor: '#ffffff',
    autoRotate: true,
    autoRotateSpeed: 1
  }"
  [arcAndRingColors]="['#06b6d4', '#3b82f6', '#6366f1']"
  styleClass="custom-globe-class"
></om-three-globe>
```

## API

```html
<om-three-globe
  [globeSize]="globeSize"
  [globeConfig]="globeConfig"
  [arcAndRingColors]="arcAndRingColors"
  [arcs]="ThreeGlobePosition[]"
  styleClass="your-custom-class"
>
</om-three-globe>
```

- `globeSize` (optional): The size of the globe in pixels. Accepts a string value such as '600px' or '100%'. Defaults to '600px'.
- `globeConfig` (optional): A configuration object that defines the appearance and behavior of the globe, including lighting, atmosphere, rotation, and more. See the configuration options below.
- `arcAndRingColors` (optional): An array of color strings used to customize the arcs and rings displayed on the globe. They will get random colors from this array.
- `arcs` (optional): An array of ThreeGlobePosition objects used to add customized arcs if the default ones arent whats needed.
- `styleClass` (optional): A custom CSS class to apply to the globe's wrapper element for additional styling.

## Example

```html
<om-three-globe
  [globeSize]="'500px'"
  [globeConfig]="{
    globeColor: '#0a2f5b',
    showAtmosphere: true,
    atmosphereColor: '#f5f5f5',
    autoRotate: true,
    autoRotateSpeed: 0.8,
    pointLight: '#ffffff'
  }"
  [arcAndRingColors]="['#ff6b6b', '#f06595', '#faa2c1']"
  styleClass="globe-custom-style"
></om-three-globe>
```

This example creates a globe with custom colors, atmosphere, and rotation speed, along with animated arcs connecting various points.

## Globe Configuration Options

The `globeConfig` input allows you to configure various aspects of the globe's appearance and behavior:

- `pointSize`: The size of points on the globe.
- `globeColor`: The main color of the globe.
- `showAtmosphere`: A boolean to toggle the atmosphere effect around the globe.
- `atmosphereColor`: The color of the atmosphere surrounding the globe.
- `atmosphereAltitude`: The altitude of the atmosphere.
- `emissive`: The emissive color of the globe's material.
- `emissiveIntensity`: The intensity of the globe's emissive color.
- `shininess`: The shininess of the globe's surface.
- `polygonColor`: The color of polygons on the globe (e.g., country borders).
- `ambientLight`: The color of the ambient light.
- `directionalLeftLight`: The color of the left directional light.
- `directionalTopLight`: The color of the top directional light.
- `pointLight`: The color of the point light.
- `arcTime`: The duration of the arc animation.
- `arcLength`: The length of the animated arcs.
- `rings`: The number of rings around the globe.
- `maxRings`: The maximum number of rings allowed.
- `manualRotate`: A boolean to enable or disable manual rotation of the globe.
- `autoRotate`: A boolean to enable or disable automatic rotation of the globe.
- `autoRotateSpeed`: The speed at which the globe rotates automatically.

## Dependencies

This library relies on the following peer dependencies for rendering and interactivity:

- `three` - The 3D rendering library used to create and manage 3D scenes.
- `three-globe` - A library built on three.js for creating and animating globes with custom data visualizations.

Ensure that both of these dependencies are installed alongside the library.

```bash
npm install three three-globe --save
```

## Styling

To customize the appearance of the globe or container, use the styleClass input to apply your own CSS classes.

```css
.globe-custom-style {
  background-color: #000;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}
```

## Contributing

Contributions are welcome. Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.
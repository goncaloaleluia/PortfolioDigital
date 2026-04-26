# Design System Document

## 1. Overview & Creative North Star: "The Liquid Curator"
This design system is engineered to feel less like a software interface and more like a high-end digital gallery. The **Creative North Star** is "The Liquid Curator"—a philosophy that blends the structural precision of a geometric grid with the fluid, organic movement of mercury and smoke.

By utilizing a deep-black canvas (`neutral_color_hex`) and metallic accents, we break the "standard template" look. We reject rigid boxes in favor of **intentional asymmetry** and **tonal depth**. The interface should feel as though it is emerging from the darkness, with elements defined by light and shadow rather than lines and borders.

## 2. Colors
Our palette is rooted in a monochromatic spectrum that prioritizes contrast and atmospheric depth.

*   **Background & Surface:** The foundation is absolute `neutral_color_hex` (#000000). Use `surface` (#0e0e0e) for the primary content areas to provide a subtle "lift" from the void.
*   **The Metallic Accents:** `primary_color_hex` (#FFFFFF) and `secondary_color_hex` (#8E9196) function as our silver and liquid metal tones. These should be used sparingly for high-impact elements.
*   **The "No-Line" Rule:** We strictly prohibit the use of 1px solid borders for sectioning. Definition must be achieved through background shifts. For example, a project case study section (`surface_container_low`) sitting atop the main `background` creates a boundary that is felt, not seen.
*   **The "Glass & Gradient" Rule:** To capture the fluid essence of the reference imagery, use linear gradients transitioning from `primary_color_hex` to `primary_container` for hero CTAs. Floating navigation and modals must use **Glassmorphism**: a combination of `surface_variant` at 40% opacity with a `backdrop-blur` of 20px.

## 3. Typography
The typography is designed to feel editorial and authoritative. We pair the structural `Manrope` for displays with the hyper-legible `Inter` for functional text.

*   **Display & Headlines (Manrope):** Use `display-lg` (3.5rem) and `headline-lg` (2rem) to create dramatic entry points. These should be set with tighter letter-spacing (-2%) to mimic high-end fashion mastheads.
*   **Body & Labels (Inter):** `body-lg` (1rem) is your workhorse. Use `on_surface_variant` (#ababab) for secondary body text to ensure the primary white text (`primary_color_hex`) retains its "glow" against the dark background.
*   **Hierarchy as Brand:** High-contrast sizing (e.g., a `label-sm` immediately adjacent to a `display-md`) creates a sophisticated, non-linear rhythm that moves the eye across the page like a curated magazine.

## 4. Elevation & Depth
In a pure black environment, traditional drop shadows are invisible. We create depth through **Tonal Layering**.

*   **The Layering Principle:** Treat the UI as stacked sheets of obsidian.
    *   *Level 0:* `neutral_color_hex` (#000000) - The Void.
    *   *Level 1:* `surface_container_low` (#131313) - The Base Plate.
    *   *Level 2:* `surface_container_high` (#1f1f1f) - Active Cards/Modals.
*   **Ambient Shadows:** For floating elements, use a shadow with a 64px blur, 0px offset, and 8% opacity using the `primary_color_hex` color. This creates a "silver glow" rather than a dark shadow, mimicking light reflecting off liquid metal.
*   **The Ghost Border:** If a container requires further definition, use a `outline_variant` (#484848) at 15% opacity. This "Ghost Border" provides an edge without interrupting the fluid visual flow.

## 5. Components

### Buttons
*   **Primary:** Solid `primary_color_hex` (#FFFFFF) with `on_primary` (#3f4041) text. Apply a `xl` (1.5rem) corner radius. On hover, apply a subtle silver-to-white fluid gradient.
*   **Secondary:** Ghost style. No background, `outline` stroke at 20% opacity. On hover, fill with `surface_bright` (#2c2c2c).

### Cards & Lists
*   **Rule:** Forbid divider lines. Use `spacing-8` (2.75rem) to separate list items.
*   **Cards:** Use `surface_container` (#191919) with `lg` (1rem) rounded corners. On hover, scale the card by 1.02x and transition the background to `surface_container_highest` (#262626).

### Input Fields
*   **Style:** Minimalist under-line or subtle container (`surface_container_low`).
*   **Focus:** Transition the "Ghost Border" from 15% to 60% opacity using the `primary_color_hex` token. Avoid heavy focus rings; use a soft glow.

### Additional Component: The "Fluid Scroll-Indicator"
A custom component inspired by the "liquid metal" prompt. A vertical bar using the `secondary_color_hex` color that expands and thins (morphs) based on scroll velocity, acting as both a progress tracker and a piece of interactive art.

## 6. Do's and Don'ts

### Do
*   **Do** use extreme white space (from the `20` and `24` spacing scales) to let imagery breathe.
*   **Do** use `tertiary_color_hex` (#C4C7C5) for small "status" accents to provide a crisp, cool-toned highlight.
*   **Do** ensure all interactive elements have a micro-interaction (e.g., a 200ms ease-out transform).

### Don't
*   **Don't** use pure `primary_color_hex` for long-form body text; use `on_background` (#e5e5e5) to prevent eye strain against the black background.
*   **Don't** use 100% opaque borders. They "trap" the design and break the premium, liquid feel.
*   **Don't** use "Standard" Material shadows. They are muddy on `neutral_color_hex` surfaces. Always use tinted ambient glows.
---
name: Rural Heritage & Devotion
colors:
  surface: '#fff8f0'
  surface-dim: '#e2d9c8'
  surface-bright: '#fff8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf3e1'
  surface-container: '#f6eddb'
  surface-container-high: '#f0e7d5'
  surface-container-highest: '#eae2d0'
  on-surface: '#1f1b10'
  on-surface-variant: '#564242'
  inverse-surface: '#343024'
  inverse-on-surface: '#f9f0de'
  outline: '#897172'
  outline-variant: '#ddc0c0'
  surface-tint: '#a43946'
  primary: '#6c0c20'
  on-primary: '#ffffff'
  primary-container: '#8b2635'
  on-primary-container: '#ffa3a9'
  inverse-primary: '#ffb2b6'
  secondary: '#a03f30'
  on-secondary: '#ffffff'
  secondary-container: '#fe8672'
  on-secondary-container: '#741f13'
  tertiary: '#2f3821'
  on-tertiary: '#ffffff'
  tertiary-container: '#464f36'
  on-tertiary-container: '#b6c0a1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdadb'
  primary-fixed-dim: '#ffb2b6'
  on-primary-fixed: '#40000d'
  on-primary-fixed-variant: '#842131'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a7'
  on-secondary-fixed: '#400200'
  on-secondary-fixed-variant: '#80281b'
  tertiary-fixed: '#dce7c5'
  tertiary-fixed-dim: '#c0cbaa'
  on-tertiary-fixed: '#161e09'
  on-tertiary-fixed-variant: '#414a31'
  background: '#fff8f0'
  on-background: '#1f1b10'
  surface-variant: '#eae2d0'
typography:
  headline-xl:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-script:
    fontFamily: Playfair Display
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 28px
  caption:
    fontFamily: Literata
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1120px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system evokes a sense of generational continuity, grounded in the soil and faith. It targets an audience that values slow living, heritage, and the sanctity of the everyday. The emotional response is one of warmth, nostalgia, and quiet reverence—like sitting at a sturdy wooden table in a farmhouse kitchen.

The visual style is **Rustic Sophisticated**. It blends the structural elegance of traditional European design with the raw, tactile elements of rural life. Expect high-quality editorial layouts paired with organic textures: aged paper, subtle linen weaves, and botanical ink drawings of coffee branches and garden roses. Religious motifs are woven in as quiet design elements—delicate strokes forming a cross or beads used as decorative separators.

## Colors
The palette is derived from the natural materials of a rural estate. 
- **Deep Burgundy (#8B2635):** The primary color, used for headers and key brand moments to maintain a sense of solemnity and prestige.
- **Terracotta (#C05746):** Represents the earth and baked clay; used for interactive elements and call-to-actions.
- **Olive Green (#707A5E):** Represents the garden and peace; used for secondary buttons and success states.
- **Straw (#F4EBD9):** The foundational neutral, used for backgrounds to mimic the tone of aged parchment or dried harvest.
- **Charcoal Ink (#2D2926):** Used for primary text to ensure legibility while appearing softer than pure black.

## Typography
The typography system relies on the classical authority of **EB Garamond** for headlines, conveying a "literary" and historical weight. For long-form reading, **Source Serif 4** provides modern legibility without sacrificing the traditional aesthetic.

The distinctive "Affect" layer is introduced via **Playfair Display (Italic)**, which serves as our "manuscript" font. It is used sparingly for pull-quotes, recipe notes, or personal annotations, mimicking the hand-written letters found in old family trunks. Labels and metadata use **Literata** in uppercase to provide a structured, organized counterpoint to the more fluid serif styles.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to create a centered, book-like feel. Generous margins (64px+) are encouraged to simulate the "white space" of a printed page. 

On mobile, the layout shifts to a single column with 16px side margins. Elements should feel "anchored" rather than floating; use horizontal rules (subtle 1px lines in Terracotta) to separate sections. Vertical rhythm is strictly based on the 8px base unit to ensure that even with decorative elements, the structure remains professional and orderly.

## Elevation & Depth
This design system rejects synthetic shadows in favor of **Tonal Layers** and **Textural Depth**. 
- **Surfaces:** Depth is created by layering different shades of "Straw" and "Paper". A card might be a slightly lighter tint than the background, separated by a thin, textured border.
- **Borders:** Instead of blurs, use 1px solid or dashed borders in Olive or Burgundy to define containers.
- **Physicality:** Use subtle "grain" overlays on primary containers to give them a tactile, paper-like quality. 
- **Shadows:** If shadows must be used for utility (e.g., a floating action button), use a very low-opacity, warm-tinted "Umber" shadow (#4A3728) to avoid a "digital" look.

## Shapes
Shapes are inspired by the physical world of the past. Elements use **Soft (0.25rem)** rounding to mimic the naturally worn edges of old photographs, prayer cards, and soap bars. 

Avoid "pill" shapes or aggressive circles. Buttons should be rectangular with slightly softened corners. Images and card containers should feature these subtle radii to feel approachable yet structured.

## Components
- **Buttons:** Primary buttons are filled with Deep Burgundy or Terracotta, using centered EB Garamond text in Straw. Secondary buttons use an Olive outline.
- **Cards:** Cards should have a background color of a lighter parchment tint with a thin, darker parchment border. Use botanical illustrations as watermark-style backgrounds in the corners.
- **Lists:** Use custom icons for bullets, such as a stylized coffee bean or a simple cross-stitch "+" symbol.
- **Inputs:** Form fields should look like lines on a ledger. Use a bottom-only border in Olive for a clean, "written" feel.
- **Decorative Dividers:** Use a central motif (like a small rosary bead or a rosebud) flanked by thin horizontal lines to separate major content sections.
- **Chips:** Small, rectangular tags with Soft rounding, using Olive backgrounds and Straw text to categorize "Recipes," "Devotionals," or "Archives."
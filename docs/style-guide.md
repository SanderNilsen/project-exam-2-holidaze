# Style Guide

## Color Palette

### Primary Colors

**Primary Blue**  
- Default: `#1d4ed8`
- CSS variable: `var(--primary)`
- Usage: Main branding, logo, primary buttons, active navigation links, dashboard hero backgrounds

**Primary Blue Hover**  
- Default: `#1e40af`
- CSS variable: `var(--primary-hover)`
- Usage: Hover state for primary buttons and primary interactive elements

**Accent Sky Blue**  
- Default: `#0ea5e9`
- CSS variable: `var(--accent)`
- Usage: Secondary call-to-action buttons, focus states, selected/focus highlights

## Neutral Colors

**Background**  
- Default: `#ffffff`
- CSS variable: `var(--background)`
- Usage: Main content background, cards, modals, form surfaces

**Background Light**  
- Default: `#f8fafc`
- CSS variable: `var(--background-light)`
- Usage: Page backgrounds, section backgrounds, hover states on neutral buttons

**Background Medium**  
- Default: `#f1f5f9`
- Usage: Secondary surfaces, placeholders and subtle section contrast

## Text Colors

**Primary Text**  
- Default: `#1e293b`
- CSS variable: `var(--text)`
- Usage: Headings, main content, strong text

**Muted Text**  
- Default: `#64748b`
- CSS variable: `var(--text-muted)`
- Usage: Supporting text, labels, metadata, descriptions

**Placeholder Text**  
- Default: `#94a3b8`
- CSS variable: `var(--text-placeholder)`
- Usage: Input placeholders and low-priority metadata

**Text on Dark/Primary Backgrounds**  
- Default: `#ffffff`
- Usage: Hero sections, primary buttons, text on dark backgrounds

## Border Colors

**Default Border**  
- Default: `#e2e8f0`
- CSS variable: `var(--border)`
- Usage: Card borders, input borders, header divider, modal borders, neutral buttons

## Status Colors

**Price Green**  
- Default: `#22c55e`
- Usage: Venue prices

**Success Message**  
- Suggested: `#15803d`
- Usage: Success form messages

**Error / Destructive Red**  
- Default: `#ef4444`
- Usage: Cancel buttons, destructive actions

**Error Hover**  
- Default: `#dc2626`
- Usage: Hover state for destructive buttons

**Error Background**  
- Default: `#fef2f2`
- Usage: Error callouts and unavailable date backgrounds

**Error Text**  
- Default: `#991b1b`
- Usage: Error message text and unavailable date text

## Info Colors

**Info Background**  
- Default: `#eff6ff`
- Usage: Register info box and informational callouts

**Info Border**  
- Default: `#60a5fa`
- Usage: Register info box border

## Component-Specific Colors

**Hero Background**  
- Default: `var(--primary)`
- Usage: Dashboard hero panels, All Venues hero

**Card Shadow**  
- Default: `rgba(15, 23, 42, 0.08)`
- Hover: `rgba(15, 23, 42, 0.12)`
- Usage: Venue cards

**Unavailable Date Background**  
- Default: `#fee2e2`
- Usage: Booked/unavailable dates in booking calendar

# Typography

## Font Family

**Default System Font Stack**

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
  "Helvetica Neue", Arial, sans-serif;
```

## Font Sizes

The project uses pixel-based font sizes for consistency.

### Common Sizes

- `12px` - Small metadata, facility labels
- `13px` - Helper text, descriptions inside compact UI
- `14px` - Navigation links, labels, metadata, secondary text
- `15px` - Small buttons
- `16px` - Body text, main buttons, email/role text
- `18px` - Card titles, prices in compact cards
- `22px` - Booking card/modal section headings
- `24px` - Section titles
- `28px` - Large price display
- `32px` - Dashboard hero name
- `36px` - Venue details title / responsive hero title
- `40px` - Page hero title on All Venues
- `56px` - Home hero title on desktop

## Font Weights

- `400` - Regular body text
- `500` - Buttons, card titles, prices
- `600` - Dashboard hero name, active states
- `700` - Main hero titles, logo, strong headings

## Typography Usage

**Logo**
- Size: `24px`
- Weight: `700`
- Color: `var(--primary)`

**Navigation**
- Size: `14px`
- Active weight: `600`
- Active color: `var(--primary)`


**Section Titles**
- Size: `24px`
- Weight: `700`
- Color: `var(--text)`

**Card Titles**
- Size: `18px`
- Weight: `500-700`
- Color: `var(--text)`

**Body Text**
- Size: `16px`
- Weight: `400`
- Color: `var(--text)`

**Muted Text**
- Size: `13-14px`
- Color: `var(--text-muted)`

# Buttons

## Primary Button

Used for main actions such as booking, viewing venues, saving changes and manager actions.

```css
height: 38px - 44px;
padding: 0 16px;
border-radius: 10px;
border: none;
background: var(--primary);
color: #ffffff;
font-size: 15px - 16px;
font-weight: 500;
```

Hover:

```css
background: var(--primary-hover);
```

## Secondary Button

Used for cancel/neutral actions inside modals.

```css
height: 44px;
padding: 0 16px;
border-radius: 8px;
border: 1px solid var(--border);
background: transparent;
color: var(--text);
font-size: 16px;
```

Hover:

```css
background: var(--background-light);
```

## Destructive Button

Used for destructive actions such as cancel booking or delete venue.

```css
height: 38px;
padding: 0 16px;
border-radius: 10px;
border: none;
background: #ef4444;
color: #ffffff;
font-size: 15px;
font-weight: 500;
```

Hover:

```css
background: #dc2626;
```


# Cards

## Venue Cards

Used on Home and All Venues pages.

```css
background: var(--background);
border: 1px solid var(--border);
border-radius: 14px;
box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
overflow: hidden;
```

Hover:

```css
transform: translateY(-2px);
box-shadow: 0 8px 18px rgba(15, 23, 42, 0.12);
```


## Dashboard Cards

Used for bookings, manager venues and sidebar cards.

```css
background: var(--background);
border: 1px solid var(--border);
border-radius: 12px - 16px;
padding: 14px - 22px;
```

# Layout

## Main Container

Most pages use:

```css
max-width: 1100px;
margin: 0 auto;
padding: 0 16px;
```

## Responsive Breakpoints

Common breakpoints:

- `1050px` - Venue grid changes from 3 columns to 2 columns
- `900px` - Venue details layout changes from two columns to one column
- `768px` - Navigation switches to mobile menu / dashboard cards stack
- `680px` - Venue grid changes to one column
- `520px` - Smaller hero/avatar adjustments

# Accessibility Notes

- Buttons should use `type="button"` unless submitting a form.
- Images should include descriptive `alt` text.
- Modals should have clear titles and descriptions.
- Form errors and success messages should be visible near the related form.
- Interactive elements should have hover and focus states.
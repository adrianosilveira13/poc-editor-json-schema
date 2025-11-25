# Design Guidelines: JSON Schema Editor para Fluxos de Petição

## Design Approach
**System-Based Approach** drawing from Linear's precision, Notion's block editing patterns, and VSCode's editor conventions. This utility-focused application prioritizes clarity, efficiency, and professional aesthetics for legal workflow configuration.

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 (p-2, h-8, m-6, gap-4) for consistent rhythm.

**Primary Layout Structure:**
- Three-panel layout: Left sidebar (280px) for flow list, center editor (flex-1), right preview panel (360px, collapsible)
- Top navigation bar: 64px height, contains app title, import/export actions, save status
- Editor canvas: Full viewport height minus navbar, scrollable content areas

**Responsive Behavior:**
- Desktop (1280px+): Full three-panel layout
- Tablet (768-1279px): Stack preview below editor, collapsible sidebar
- Mobile (<768px): Single column, drawer-based navigation

## Typography

**Font Stack:**
- Primary: 'Inter' via Google Fonts (body, UI elements)
- Monospace: 'JetBrains Mono' (JSON preview, code snippets)

**Hierarchy:**
- App Title: text-xl font-semibold
- Section Headers: text-lg font-medium
- Step Cards: text-base font-medium
- Body Text: text-sm
- Labels: text-xs font-medium uppercase tracking-wide
- Code/JSON: text-sm font-mono

## Core Component Library

### Navigation & Structure
**Top Bar:**
- Horizontal flex layout, items-center justify-between, px-6 py-4
- Left: App logo + title
- Right: Action buttons (Import, Export, Save) with icons

**Sidebar (Flow List):**
- Fixed width, overflow-y-auto
- Flow items as interactive cards with hover states
- "+ Novo Fluxo" button at top, w-full
- Each flow card: rounded-lg border, px-4 py-3, cursor-pointer

**Main Editor Panel:**
- Centered max-w-4xl container with px-8 py-6
- Flow name input at top (text-2xl input with minimal styling)
- Steps section with vertical stack, gap-4

### Step Editor Components

**Step Card (Draggable):**
- Rounded-lg border with subtle shadow
- Drag handle on left (icon, cursor-move)
- Header section: flex justify-between items-center, p-4
  - Left: Step type badge + step name
  - Right: Expand/collapse icon + delete button
- Expandable content area: px-4 pb-4, grid gap-4
- Visual feedback for drag operations (opacity, border changes)

**Form Fields:**
- Label + input pairs in vertical stack, gap-2
- Input backgrounds subtle, border-1, rounded-md, px-3 py-2
- Select dropdowns: Full width, consistent styling with inputs
- Textarea (prompt template): min-h-32, font-mono text-sm, resize-y
- Array inputs (inputVars, requiredFields): Vertical list with "+ Adicionar" button, each item with remove icon

**Type Selector:**
- Horizontal pills/badges for step types
- Active state: distinct styling (no color specified, but visual weight difference)
- Includes: gerar-argumentos, inserir-jurisprudencia, resumir-fatos, gerar-pedido-final, custom

### Preview Panel

**JSON Preview:**
- Full height panel, overflow-y-auto
- Top toolbar: "Preview JSON" title, copy button
- Code block: font-mono text-sm, px-4 py-3
- Syntax highlighting structure (brackets, keys, values distinguishable through typography weight)
- Line numbers optional

**Validation Status:**
- Fixed bottom section of preview panel
- Shows validation errors in compact list format
- Success indicator when valid

### Action Buttons

**Primary Actions:**
- Larger size: px-6 py-3, rounded-md, font-medium
- Used for: Save, Export, Create Flow

**Secondary Actions:**
- Standard size: px-4 py-2, rounded-md
- Used for: Cancel, Delete, Add Step

**Icon Buttons:**
- Square: w-8 h-8, rounded, flex items-center justify-center
- Used for: Expand/collapse, delete, drag handle

## Interaction Patterns

**Drag & Drop:**
- Visual placeholder when dragging (dashed border box)
- Smooth drop zone indicators
- Reorder animation: 200ms ease transition

**Expandable Sections:**
- Smooth height transition: 300ms ease
- Rotate chevron icon 180deg when expanded

**Form Validation:**
- Inline error messages below fields (text-sm, mt-1)
- Required field indicators (asterisk after label)

## Icons
Use **Heroicons** via CDN for all interface icons:
- Drag handle: bars-3
- Delete: trash
- Add: plus-circle
- Expand: chevron-down
- Import: arrow-down-tray
- Export: arrow-up-tray
- Save: check-circle

## Empty States
- Center-aligned, max-w-sm in container
- Icon (large, 64px)
- Heading: text-lg font-medium
- Description: text-sm
- CTA button below

**No Images Required** - This is a functional editor interface without marketing/hero needs.
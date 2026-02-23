# UI Components Catalog

> **IMPORTANT FOR AI AGENTS**: Before creating a new component, **ALWAYS check this catalog first** to identify existing components that can be reused or extended. This prevents duplication and maintains consistency.

This document provides a comprehensive inventory of all available UI components in the `@gym-app/ui` package. Components are organized by functional category.

**Documentation Structure**: Each component includes detailed documentation in `{Location}/{ComponentName}.md` files. For example, the Alert component's documentation is at `packages/ui/src/components/data-display/Alert/Alert.md`.

## Table of Contents

- [Data Display Components](#data-display-components)
- [Feedback Components](#feedback-components)
- [Form Components](#form-components)
- [Layout Components](#layout-components)
- [Navigation Components](#navigation-components)
- [Typography Components](#typography-components)
- [Utility Components](#utility-components)
- [MUI Primitives](#mui-primitives)
- [Usage Guidelines](#usage-guidelines)

---

## Data Display Components

Components for displaying data, visualizations, and information to users.

### Alert
**Purpose**: Display important messages and notifications
**Use Cases**: Success messages, error alerts, warnings, informational notices
**Features**: Multiple variants (info, success, warning, danger, glass, gradient), closable, icons, animations
**Location**: `src/components/data-display/Alert`
**Docs**: `src/components/data-display/Alert/Alert.md`

### AlertDialog
**Purpose**: Display critical alerts requiring user acknowledgment
**Use Cases**: Confirmation dialogs, critical warnings, blocking notifications
**Features**: Modal dialog, customizable actions, accessibility support
**Location**: `src/components/data-display/AlertDialog`
**Docs**: `src/components/data-display/AlertDialog/AlertDialog.md`

### Avatar
**Purpose**: Display user profile pictures or initials
**Use Cases**: User profiles, comment sections, team member lists
**Features**: Multiple sizes, fallback to initials, image loading, status indicators
**Location**: `src/components/data-display/Avatar`
**Docs**: `src/components/data-display/Avatar/Avatar.md`

### Badge
**Purpose**: Display small count or status indicators
**Use Cases**: Notification counts, status badges, labels
**Features**: Multiple variants, positioning options, customizable colors
**Location**: `src/components/data-display/Badge`
**Docs**: `src/components/data-display/Badge/Badge.md`

### Banner
**Purpose**: Display prominent messages across the top or bottom of the page
**Use Cases**: Important announcements, system-wide alerts, promotional messages
**Features**: Dismissible, sticky positioning, action buttons
**Location**: `src/components/data-display/Banner`
**Docs**: `src/components/data-display/Banner/Banner.md`

### Carousel
**Purpose**: Display multiple items in a slideshow format
**Use Cases**: Image galleries, featured content, product showcases
**Features**: Auto-play, navigation controls, indicators, responsive
**Location**: `src/components/data-display/Carousel`
**Docs**: `src/components/data-display/Carousel/Carousel.md`

### Chart
**Purpose**: Visualize data with various chart types
**Use Cases**: Analytics dashboards, data visualization, reports
**Features**: Line, bar, pie, area charts using Recharts, responsive, tooltips
**Location**: `src/components/data-display/Chart`
**Docs**: `src/components/data-display/Chart/Chart.md`

### Chip
**Purpose**: Display compact elements representing attributes, tags, or selections
**Use Cases**: Tags, filters, selected items, categories
**Features**: Deletable, clickable, icons, multiple variants
**Location**: `src/components/data-display/Chip`
**Docs**: `src/components/data-display/Chip/Chip.md`

### DataGrid
**Purpose**: Advanced data table with sorting, filtering, pagination, and editing
**Use Cases**: Complex data tables, admin panels, data management interfaces
**Features**: Row selection, inline editing, virtual scrolling, server/client modes, column resizing
**Types**: `GridSelectionMode`, `GridColumn`, `GridSort`, `GridFilter`
**Location**: `src/components/data-display/DataGrid`
**Docs**: `src/components/data-display/DataGrid/DataGrid.md`

### DateTimeDisplay
**Purpose**: Display formatted date and time values
**Use Cases**: Timestamps, event dates, audit logs, activity feeds
**Features**: Multiple format options, relative time display, timezone support
**Location**: `src/components/data-display/DateTimeDisplay`
**Docs**: `src/components/data-display/DateTimeDisplay/DateTimeDisplay.md`

### DescriptionItem
**Purpose**: Display label-value pairs for read-only information
**Use Cases**: Metadata display, property lists, detail views, incident information, profile data
**Features**: Uppercase labels, automatic text formatting, custom React node support, responsive layouts
**Location**: `src/components/data-display/DescriptionItem`
**Docs**: `src/components/data-display/DescriptionItem/DescriptionItem.md`

### AsyncStateContainer
**Purpose**: Composition wrapper for handling async data states consistently
**Use Cases**: Loading/error/empty state management, data fetching UI, API response handling
**Features**: Priority-based rendering (loading > error > empty > children), composition pattern, render props, ARIA attributes
**Related**: LoadingState, ErrorState, EmptyState
**Location**: `src/components/data-display/AsyncStateContainer`
**Docs**: `src/components/data-display/AsyncStateContainer/AsyncStateContainer.md`

### EmptyState
**Purpose**: Display when no data or content is available
**Use Cases**: Empty lists, no search results, placeholder states
**Features**: Customizable illustration, title, description, action buttons, onCreate callback, onRefresh callback, help links
**Location**: `src/components/data-display/EmptyState`
**Docs**: `src/components/data-display/EmptyState/EmptyState.md`

### ErrorState
**Purpose**: Display error messages with optional retry functionality
**Use Cases**: API errors, network failures, validation errors, permission denied
**Features**: Error/warning severity levels, retry button, custom icons, accessible alert role
**Location**: `src/components/data-display/ErrorState`
**Docs**: `src/components/data-display/ErrorState/ErrorState.md`

### LoadingState
**Purpose**: Display loading indicators while content is being fetched
**Use Cases**: Data loading, page transitions, async operations, content placeholders
**Features**: Spinner/skeleton variants, multiple sizes (sm/md/lg), optional message, customizable skeleton rows, ARIA-busy status
**Location**: `src/components/data-display/LoadingState`
**Docs**: `src/components/data-display/LoadingState/LoadingState.md`

### HoverCard
**Purpose**: Display content on hover
**Use Cases**: User previews, additional information, contextual help
**Features**: Positioning options, delay configuration, animations
**Location**: `src/components/data-display/HoverCard`
**Docs**: `src/components/data-display/HoverCard/HoverCard.md`

### InteractiveTooltip
**Purpose**: Display contextual information with click-to-pin functionality
**Use Cases**: Data visualizations (heatmaps, charts), complex information display, interactive tables, status indicators
**Features**: Click-to-pin, dual content modes (hover/pinned), outside click detection, multiple variants (default, dark, light, glass), size options, glow/pulse effects, callbacks
**Location**: `src/components/data-display/InteractiveTooltip`
**Docs**: `src/components/data-display/InteractiveTooltip/InteractiveTooltip.md`

### LazyImage
**Purpose**: High-performance image loading with lazy loading and progressive enhancement
**Use Cases**: Image galleries, content images, product photos, user avatars, hero images
**Features**: Lazy loading with Intersection Observer, multiple loading states (skeleton/spinner/placeholder), error fallback with retry, placeholder images, fade-in animations, object-fit control, performance optimizations
**Location**: `src/components/data-display/LazyImage`
**Docs**: `src/components/data-display/LazyImage/LazyImage.md`

### Lightbox
**Purpose**: Display images in full-screen overlay
**Use Cases**: Image galleries, photo viewers, media previews
**Features**: Zoom, navigation, thumbnails, keyboard shortcuts
**Location**: `src/components/data-display/Lightbox`
**Docs**: `src/components/data-display/Lightbox/Lightbox.md`

### MapPreview
**Purpose**: Display interactive Google Maps
**Use Cases**: Location displays, store locators, geographic data visualization
**Features**: Markers, custom styling, interactive controls, zoom levels
**Location**: `src/components/data-display/MapPreview`
**Docs**: `src/components/data-display/MapPreview/MapPreview.md`

### Popover
**Purpose**: Display floating content anchored to an element
**Use Cases**: Context menus, tooltips with complex content, dropdown panels
**Features**: Positioning, arrow indicator, click/hover triggers
**Location**: `src/components/data-display/Popover`
**Docs**: `src/components/data-display/Popover/Popover.md`

### Progress
**Purpose**: Display progress indicators
**Use Cases**: Loading states, task completion, upload progress
**Features**: Linear/circular variants, determinate/indeterminate, labels
**Location**: `src/components/data-display/Progress`
**Docs**: `src/components/data-display/Progress/Progress.md`

### Sheet
**Purpose**: Display content in a slide-out panel
**Use Cases**: Side panels, filters, details view, forms
**Features**: Multiple positions (left, right, top, bottom), overlay, animations
**Location**: `src/components/data-display/Sheet`
**Docs**: `src/components/data-display/Sheet/Sheet.md`

### Stepper
**Purpose**: Display progress through multi-step processes
**Use Cases**: Wizards, checkout flows, onboarding processes
**Features**: Linear/non-linear, customizable steps, icons, validation
**Location**: `src/components/data-display/Stepper`
**Docs**: `src/components/data-display/Stepper/Stepper.md`

### Table
**Purpose**: Display tabular data
**Use Cases**: Simple data tables, lists with columns, comparison tables
**Features**: Sorting, row selection, responsive, customizable cells
**Location**: `src/components/data-display/Table`
**Docs**: `src/components/data-display/Table/Table.md`

### Timeline
**Purpose**: Display chronological events
**Use Cases**: Activity feeds, event history, project milestones
**Features**: Vertical/horizontal layouts, icons, custom content, animations
**Location**: `src/components/data-display/Timeline`
**Docs**: `src/components/data-display/Timeline/Timeline.md`

### TimingDiagram
**Purpose**: Display timing sequences and technical diagrams
**Use Cases**: System diagrams, sequence visualization, technical documentation
**Features**: Customizable sequences, timing annotations, visual clarity
**Location**: `src/components/data-display/TimingDiagram`
**Docs**: `src/components/data-display/TimingDiagram/TimingDiagram.md`

### Tooltip
**Purpose**: Display brief information on hover or focus
**Use Cases**: Help text, icon explanations, abbreviated content
**Features**: Multiple positions, delay configuration, arrow indicator
**Location**: `src/components/data-display/Tooltip`
**Docs**: `src/components/data-display/Tooltip/Tooltip.md`

---

## Feedback Components

Components for providing feedback to users about system state and actions.

### Dialog
**Purpose**: Display modal dialogs
**Use Cases**: Confirmations, forms, detailed information, alerts
**Features**: Backdrop, animations, customizable size, accessibility
**Location**: `src/components/feedback/Dialog`
**Docs**: `src/components/feedback/Dialog/Dialog.md`

### ErrorBoundary
**Purpose**: Catch JavaScript errors in child components
**Use Cases**: Error recovery, fallback UI, error logging, graceful degradation
**Features**: Error catching, fallback rendering, error reset, development error display
**Location**: `src/components/feedback/ErrorBoundary`
**Docs**: `src/components/feedback/ErrorBoundary/ErrorBoundary.md`

### Modal
**Purpose**: Display modal overlays
**Use Cases**: Pop-ups, lightboxes, focused interactions
**Features**: Backdrop, close on overlay click, escape key support
**Location**: `src/components/feedback/Modal`
**Docs**: `src/components/feedback/Modal/Modal.md`

### Sonner
**Purpose**: Display toast notifications with Sonner library
**Use Cases**: Success messages, error notifications, quick feedback
**Features**: Multiple variants, auto-dismiss, actions, stacking
**Location**: `src/components/feedback/Sonner`
**Docs**: `src/components/feedback/Sonner/Sonner.md`

### StackedModal
**Purpose**: Display multiple modals in a stack
**Use Cases**: Multi-step wizards, nested dialogs, complex workflows
**Features**: Stack management, navigation between modals, backdrop control
**Location**: `src/components/feedback/StackedModal`
**Docs**: `src/components/feedback/StackedModal/StackedModal.md`

### Toast
**Purpose**: Display brief notifications
**Use Cases**: Action confirmations, alerts, temporary messages
**Features**: Auto-dismiss, positioning, variants, actions
**Location**: `src/components/feedback/Toast`
**Docs**: `src/components/feedback/Toast/Toast.md`

### TutorialOverlay
**Purpose**: Display guided tours and onboarding experiences
**Use Cases**: Feature introduction, user onboarding, interactive tutorials
**Features**: Step-by-step guidance, highlighting, skip options
**Location**: `src/components/feedback/TutorialOverlay`
**Docs**: `src/components/feedback/TutorialOverlay/TutorialOverlay.md`

---

## Form Components

Components for user input and form interactions.

### AddressAutocomplete
**Purpose**: Autocomplete for address input with Google Places API
**Use Cases**: Address forms, location entry, shipping forms
**Features**: Google Places integration, suggestions, validation
**Location**: `src/components/form/AddressAutocomplete`
**Docs**: `src/components/form/AddressAutocomplete/AddressAutocomplete.md`

### Autocomplete
**Purpose**: Input with dropdown suggestions
**Use Cases**: Search inputs, selection from large lists, filtering
**Features**: Fuzzy search, multiple selection, custom rendering, async options
**Location**: `src/components/form/Autocomplete`
**Docs**: `src/components/form/Autocomplete/Autocomplete.md`

### Button
**Purpose**: Clickable button component
**Use Cases**: Actions, form submissions, navigation, active state indicators
**Features**: Multiple variants (solid, outline, ghost, text, glass, gradient), sizes (xs-xl), colors (primary, secondary, success, warning, info, danger, neutral), icons, loading states, disabled states, glow/pulse effects, active state support
**Location**: `src/components/form/Button`
**Docs**: `src/components/form/Button/Button.md`

### Calendar
**Purpose**: Date picker and calendar component
**Use Cases**: Date selection, date range picker, scheduling
**Features**: Single/range selection, min/max dates, disabled dates
**Types**: `SelectionMode` (single/range)
**Location**: `src/components/form/Calendar`
**Docs**: `src/components/form/Calendar/Calendar.md`

### Checkbox
**Purpose**: Toggle selection checkbox
**Use Cases**: Multi-select, boolean options, agreements
**Features**: Indeterminate state, labels, validation, disabled state
**Location**: `src/components/form/Checkbox`
**Docs**: `src/components/form/Checkbox/Checkbox.md`

### CodeEditor
**Purpose**: Advanced code editor with syntax highlighting
**Use Cases**: Code input, configuration editing, JSON editing
**Features**: Monaco Editor integration, syntax highlighting, themes, auto-completion
**Location**: `src/components/form/CodeEditor`
**Docs**: `src/components/form/CodeEditor/CodeEditor.md`

### Command
**Purpose**: Command menu component for keyboard-driven interfaces
**Use Cases**: Command palettes, search interfaces, action menus
**Features**: Keyboard navigation, search, grouping, custom commands
**Location**: `src/components/form/Command`
**Docs**: `src/components/form/Command/Command.md`

### DateTimeInput
**Purpose**: Date and time input with picker
**Use Cases**: Scheduling, event creation, date selection, time entry
**Features**: Date picker, time picker, range selection, validation, localization
**Location**: `src/components/form/DateTimeInput`
**Docs**: `src/components/form/DateTimeInput/DateTimeInput.md`

### DensityToggle
**Purpose**: Toggle UI density between compact and comfortable modes
**Use Cases**: User preferences, accessibility, data-dense interfaces
**Features**: Multiple density levels, persistent preference, theme integration
**Location**: `src/components/form/DensityToggle`
**Docs**: `src/components/form/DensityToggle/DensityToggle.md`

### Form
**Purpose**: Form container with validation
**Use Cases**: Data entry, user input collection, settings
**Features**: Validation, error handling, submission handling
**Location**: `src/components/form/Form`
**Docs**: `src/components/form/Form/Form.md`

### Input
**Purpose**: Text input field
**Use Cases**: Text entry, search, forms
**Features**: Multiple types, validation, icons, prefix/suffix, disabled/readonly states
**Location**: `src/components/form/Input`
**Docs**: `src/components/form/Input/Input.md`

### InputOTP
**Purpose**: One-time password input
**Use Cases**: 2FA, verification codes, security codes
**Features**: Auto-focus next field, paste support, validation
**Location**: `src/components/form/InputOTP`
**Docs**: `src/components/form/InputOTP/InputOTP.md`

### Label
**Purpose**: Form field labels
**Use Cases**: Input labels, form field descriptions
**Features**: Required indicator, tooltip support, accessibility
**Location**: `src/components/form/Label`
**Docs**: `src/components/form/Label/Label.md`

### Menubar
**Purpose**: Application menu bar
**Use Cases**: Desktop-style menus, action menus, toolbars
**Features**: Keyboard navigation, nested menus, shortcuts
**Location**: `src/components/form/Menubar`
**Docs**: `src/components/form/Menubar/Menubar.md`

### PasswordStrength
**Purpose**: Password input with strength indicator
**Use Cases**: Registration, password change, account security
**Features**: Strength meter, validation rules, show/hide toggle
**Location**: `src/components/form/PasswordStrength`
**Docs**: `src/components/form/PasswordStrength/PasswordStrength.md`

### PhoneInput
**Purpose**: International phone number input
**Use Cases**: Contact forms, registration, user profiles
**Features**: Country selection, validation, formatting
**Location**: `src/components/form/PhoneInput`
**Docs**: `src/components/form/PhoneInput/PhoneInput.md`

### RadioGroup
**Purpose**: Single selection from multiple options
**Use Cases**: Exclusive choices, settings, surveys
**Features**: Orientation control, validation, disabled options
**Location**: `src/components/form/RadioGroup`
**Docs**: `src/components/form/RadioGroup/RadioGroup.md`

### RichTextEditor
**Purpose**: WYSIWYG text editor
**Use Cases**: Content creation, blog posts, descriptions
**Features**: Formatting tools, markdown support, HTML output, media embedding
**Location**: `src/components/form/RichTextEditor`
**Docs**: `src/components/form/RichTextEditor/RichTextEditor.md`

### Select
**Purpose**: Dropdown selection
**Use Cases**: Single/multiple choice, filters, settings
**Features**: Search, groups, custom rendering, validation
**Location**: `src/components/form/Select`
**Docs**: `src/components/form/Select/Select.md`

### Slider
**Purpose**: Range input slider
**Use Cases**: Volume control, price range, settings
**Features**: Single/range, marks, labels, step control
**Location**: `src/components/form/Slider`
**Docs**: `src/components/form/Slider/Slider.md`

### Switch
**Purpose**: Toggle switch for boolean values
**Use Cases**: Settings, feature toggles, on/off states
**Features**: Labels, disabled state, controlled/uncontrolled
**Location**: `src/components/form/Switch`
**Docs**: `src/components/form/Switch/Switch.md`

### Textarea
**Purpose**: Multi-line text input
**Use Cases**: Comments, descriptions, long-form text
**Features**: Auto-resize, character count, validation
**Location**: `src/components/form/Textarea`
**Docs**: `src/components/form/Textarea/Textarea.md`

### Toggle
**Purpose**: Toggle button
**Use Cases**: View switching, option toggling
**Features**: Icon support, variants, states
**Location**: `src/components/form/Toggle`
**Docs**: `src/components/form/Toggle/Toggle.md`

### ToggleGroup
**Purpose**: Group of toggle buttons
**Use Cases**: View switchers, format options, filters
**Features**: Single/multiple selection, orientation
**Location**: `src/components/form/ToggleGroup`
**Docs**: `src/components/form/ToggleGroup/ToggleGroup.md`

### UploadButton
**Purpose**: File upload button
**Use Cases**: Image uploads, document uploads, file attachments
**Features**: Multiple files, drag & drop, progress, file type filtering
**Location**: `src/components/form/UploadButton`
**Docs**: `src/components/form/UploadButton/UploadButton.md`

---

## Layout Components

Components for structuring and organizing page layouts.

### Accordion
**Purpose**: Collapsible content sections
**Use Cases**: FAQs, expandable content, grouped information
**Features**: Single/multiple expand, icons, animations
**Location**: `src/components/layout/Accordion`
**Docs**: `src/components/layout/Accordion/Accordion.md`

### Card
**Purpose**: Container for grouped content
**Use Cases**: Content blocks, product cards, information panels
**Features**: Header, footer, actions, elevation, variants
**Location**: `src/components/layout/Card`
**Docs**: `src/components/layout/Card/Card.md`

### Collapsible
**Purpose**: Content that can be collapsed/expanded
**Use Cases**: Details sections, advanced options, condensed content
**Features**: Smooth animations, trigger customization, controlled state
**Location**: `src/components/layout/Collapsible`
**Docs**: `src/components/layout/Collapsible/Collapsible.md`

### Container
**Purpose**: Centered content container with max-width
**Use Cases**: Page layouts, content centering, responsive design
**Features**: Multiple sizes, fluid option, padding control
**Location**: `src/components/layout/Container`
**Docs**: `src/components/layout/Container/Container.md`

### Drawer
**Purpose**: Slide-out navigation or content panel
**Use Cases**: Navigation menus, filters, settings panels
**Features**: Multiple positions, overlay, persistent, temporary modes
**Location**: `src/components/layout/Drawer`
**Docs**: `src/components/layout/Drawer/Drawer.md`

### Resizable
**Purpose**: Resizable panels and containers
**Use Cases**: Split views, adjustable sidebars, customizable layouts
**Features**: Drag handles, min/max sizes, save state
**Location**: `src/components/layout/Resizable`
**Docs**: `src/components/layout/Resizable/Resizable.md`

### ScrollArea
**Purpose**: Custom scrollbar for content areas
**Use Cases**: Scrollable content, custom scroll styling, overflow handling
**Features**: Horizontal/vertical scroll, custom scrollbar styling
**Location**: `src/components/layout/ScrollArea`
**Docs**: `src/components/layout/ScrollArea/ScrollArea.md`

### Separator
**Purpose**: Visual separator between content
**Use Cases**: Content dividers, section breaks, list separators
**Features**: Horizontal/vertical, thickness control, spacing
**Location**: `src/components/layout/Separator`
**Docs**: `src/components/layout/Separator/Separator.md`

### Sidebar
**Purpose**: Application sidebar navigation
**Use Cases**: App navigation, menu structure, collapsible navigation
**Features**: Collapsible, nested items, icons, active states
**Location**: `src/components/layout/Sidebar`
**Docs**: `src/components/layout/Sidebar/Sidebar.md`

### Skeleton
**Purpose**: Loading placeholder
**Use Cases**: Content loading states, lazy loading, perceived performance
**Features**: Multiple shapes, animations, customizable
**Location**: `src/components/layout/Skeleton`
**Docs**: `src/components/layout/Skeleton/Skeleton.md`

### Spacer
**Purpose**: Add flexible spacing between elements
**Use Cases**: Layout spacing, responsive gaps, flexible layouts
**Features**: Horizontal/vertical, size variants
**Location**: `src/components/layout/Spacer`
**Docs**: `src/components/layout/Spacer/Spacer.md`

---

## Navigation Components

Components for site and app navigation.

### Breadcrumbs
**Purpose**: Display navigation path
**Use Cases**: Hierarchical navigation, page location indicator
**Features**: Separator customization, max items, truncation
**Location**: `src/components/navigation/Breadcrumbs`
**Docs**: `src/components/navigation/Breadcrumbs/Breadcrumbs.md`

### CommandPalette
**Purpose**: Quick command access via keyboard
**Use Cases**: Global search, keyboard shortcuts, quick actions
**Features**: Fuzzy search, recent commands, keyboard navigation, categories
**Types**: `PaletteCommand`, `CommandPaletteProps`
**Location**: `src/components/navigation/CommandPalette`
**Docs**: `src/components/navigation/CommandPalette/CommandPalette.md`

### ContextMenu
**Purpose**: Right-click context menu
**Use Cases**: Actions on items, context-specific options
**Features**: Keyboard navigation, icons, submenus, separators
**Location**: `src/components/navigation/ContextMenu`
**Docs**: `src/components/navigation/ContextMenu/ContextMenu.md`

### DropdownMenu
**Purpose**: Dropdown menu for actions
**Use Cases**: User menus, action lists, settings
**Features**: Icons, submenus, keyboard navigation, separators
**Location**: `src/components/navigation/DropdownMenu`
**Docs**: `src/components/navigation/DropdownMenu/DropdownMenu.md`

### NavigationMenu
**Purpose**: Main site navigation with infinite-level nesting support
**Use Cases**: Header navigation, sidebar navigation, mega menus, dropdown navigation
**Features**:
- Infinite-level nesting (tested up to 6+ levels)
- Horizontal hover-based dropdowns with 150ms close delay
- Vertical click-based expand/collapse
- Smart badge alignment (no text overlap)
- Icon hover animations (color change + transform)
- Active state management (no hover on active items)
- Collapsible sidebar support
- Mega menu layout variant
- Progressive indentation for deep hierarchies
**Variants**: `horizontal`, `vertical`, `mega`
**Location**: `src/components/navigation/NavigationMenu`
**Docs**: `src/components/navigation/NavigationMenu/NavigationMenu.md`

### Pagination
**Purpose**: Page navigation for lists
**Use Cases**: Data tables, search results, content lists
**Features**: Page numbers, first/last, previous/next, page size selector
**Location**: `src/components/navigation/Pagination`
**Docs**: `src/components/navigation/Pagination/Pagination.md`

### Tabs
**Purpose**: Tab navigation for content sections
**Use Cases**: Content organization, settings panels, multi-view interfaces
**Features**: Horizontal/vertical, icons, badges, lazy loading
**Location**: `src/components/navigation/Tabs`
**Docs**: `src/components/navigation/Tabs/Tabs.md`

---

## Typography Components

Components for text formatting and display.

### Blockquote
**Purpose**: Display quoted text
**Use Cases**: Testimonials, citations, quoted content
**Features**: Attribution, styling variants, icons
**Location**: `src/components/typography/Blockquote`
**Docs**: `src/components/typography/Blockquote/Blockquote.md`

### Code
**Purpose**: Display inline or block code
**Use Cases**: Code snippets, technical documentation, syntax display
**Features**: Inline/block variants, syntax highlighting, copy button
**Location**: `src/components/typography/Code`
**Docs**: `src/components/typography/Code/Code.md`

### Heading
**Purpose**: Section headings
**Use Cases**: Page titles, section headers, hierarchy
**Features**: Multiple levels (h1-h6), variants, responsive sizing
**Location**: `src/components/typography/Heading`
**Docs**: `src/components/typography/Heading/Heading.md`

### Paragraph
**Purpose**: Body text paragraphs
**Use Cases**: Content text, descriptions, articles
**Features**: Size variants, leading control, text alignment
**Location**: `src/components/typography/Paragraph`
**Docs**: `src/components/typography/Paragraph/Paragraph.md`

### Text
**Purpose**: Inline text with formatting
**Use Cases**: Labels, captions, body text, emphasis
**Features**: Size variants, weight, color, truncation
**Location**: `src/components/typography/Text`
**Docs**: `src/components/typography/Text/Text.md`

---

## Utility Components

General-purpose utility components.

### AnimatedIcon
**Purpose**: Icons with animations
**Use Cases**: Interactive icons, loading indicators, state transitions
**Features**: Multiple animation types, customizable timing, trigger controls
**Location**: `src/components/utility/AnimatedIcon`
**Docs**: `src/components/utility/AnimatedIcon/AnimatedIcon.md`

### AspectRatio
**Purpose**: Maintain aspect ratio for content
**Use Cases**: Responsive images, video embeds, media containers
**Features**: Common ratios, custom ratios, responsive
**Location**: `src/components/utility/AspectRatio`
**Docs**: `src/components/utility/AspectRatio/AspectRatio.md`

### InfiniteScroll
**Purpose**: Load more content on scroll
**Use Cases**: Feeds, long lists, pagination alternative
**Features**: Loading states, threshold control, reverse scroll
**Location**: `src/components/utility/InfiniteScroll`
**Docs**: `src/components/utility/InfiniteScroll/InfiniteScroll.md`

### Portal
**Purpose**: Render children outside parent DOM hierarchy
**Use Cases**: Modals, popovers, tooltips
**Features**: Custom container, z-index management
**Location**: `src/components/utility/Portal`
**Docs**: `src/components/utility/Portal/Portal.md`

### Transition
**Purpose**: Animated transitions for component state
**Use Cases**: Show/hide animations, route transitions, state changes
**Features**: Multiple animation types, timing control, callbacks
**Location**: `src/components/utility/Transition`
**Docs**: `src/components/utility/Transition/Transition.md`

### VirtualList
**Purpose**: Efficiently render large lists
**Use Cases**: Long lists, data tables, performance optimization
**Features**: Window virtualization, dynamic heights, scroll restoration
**Location**: `src/components/utility/VirtualList`
**Docs**: `src/components/utility/VirtualList/VirtualList.md`

### WorkflowStep
**Purpose**: Display workflow and process steps
**Use Cases**: Process visualization, workflow builders, step indicators
**Features**: Status indicators, connections, custom content
**Location**: `src/components/utility/WorkflowStep`
**Docs**: `src/components/utility/WorkflowStep/WorkflowStep.md`

---

## MUI Primitives

Low-level MUI components re-exported for use when custom implementations are needed. These are building blocks that don't have direct UI package equivalents.

### Layout Primitives

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| **Box** | `@gym-app/ui/mui/Box` | Flexbox container, replaces `<div>` |
| **Stack** | `@gym-app/ui/mui/Stack` | One-dimensional flex layout |
| **Grid2** | `@gym-app/ui/mui/Grid2` | 12-column responsive grid system |
| **Container** | Use UI `Container` instead | - |

### App Shell Primitives

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| **AppBar** | `@gym-app/ui/mui/AppBar` | Top application bar |
| **Toolbar** | `@gym-app/ui/mui/Toolbar` | Toolbar container for AppBar |
| **CssBaseline** | `@gym-app/ui/mui/CssBaseline` | Global CSS reset/normalize |

### Form Primitives

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| **FormControl** | `@gym-app/ui/mui/FormControl` | Form field wrapper with context |
| **FormControlLabel** | `@gym-app/ui/mui/FormControlLabel` | Label wrapper for Checkbox/Radio/Switch |
| **InputLabel** | `@gym-app/ui/mui/InputLabel` | Animated label for TextField |

### List Primitives

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| **List** | `@gym-app/ui/mui/List` | Container for list items |
| **ListItem** | `@gym-app/ui/mui/ListItem` | Individual list item |
| **ListItemButton** | `@gym-app/ui/mui/ListItemButton` | Clickable list item |
| **ListItemText** | `@gym-app/ui/mui/ListItemText` | Primary/secondary text in list items |

### Utility Primitives

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| **SvgIcon** | `@gym-app/ui/mui/SvgIcon` | Base component for custom SVG icons |
| **useMediaQuery** | `@gym-app/ui/mui/useMediaQuery` | Hook for responsive breakpoints |
| **Link** | `@gym-app/ui/mui/Link` | Text link with MUI styling |

### Advanced Form Primitives

These MUI primitives use the `renderInput` pattern which differs from UI component APIs. Use only when UI Autocomplete doesn't meet requirements.

| Component | Import Path | Purpose |
|-----------|-------------|---------|
| **Autocomplete** | `@gym-app/ui/mui/Autocomplete` | MUI Autocomplete with renderInput pattern |
| **TextField** | `@gym-app/ui/mui/TextField` | Text field for MUI Autocomplete integration |

### Styling Utilities

| Export | Import Path | Purpose |
|--------|-------------|---------|
| **styled** | `@gym-app/ui/mui/styles` | Create styled components |
| **useTheme** | `@gym-app/ui/mui/styles` | Access theme in components |
| **alpha** | `@gym-app/ui/mui/styles` | Color alpha transparency |
| **createTheme** | `@gym-app/ui/mui/styles` | Create custom theme |
| **ThemeProvider** | `@gym-app/ui/mui/styles` | Provide theme to components |

### Usage Example

```tsx
// Import MUI primitives from UI package
import { Box } from '@gym-app/ui/mui/Box';
import { Stack } from '@gym-app/ui/mui/Stack';
import { styled, useTheme } from '@gym-app/ui/mui/styles';
import { FormControl } from '@gym-app/ui/mui/FormControl';
import { InputLabel } from '@gym-app/ui/mui/InputLabel';
```

> **Note**: Prefer using higher-level UI components when available. Only use MUI primitives for custom implementations that can't be achieved with existing components.

---

## Usage Guidelines

### Before Creating a New Component

1. **Search this catalog** - Check if a similar component already exists
2. **Check for extensibility** - Many components accept custom props and can be extended
3. **Review component stories** - Look at Storybook examples to see full capabilities
4. **Consider composition** - Can you combine existing components?
5. **Read the component's `.md` file** - Each component has detailed documentation

### Reusing Components

```tsx
// Good: Reuse existing components
import { Button, Card, Badge } from '@gym-app/ui';

// Bad: Creating redundant components
// Don't create "StatusButton" when Button has variant props
// Don't create "InfoCard" when Card can be styled
```

### Extending Components

```tsx
// Good: Extend with composition
const CustomCard = ({ children, ...props }) => (
  <Card {...props}>
    <CardHeader>Custom Header</CardHeader>
    {children}
  </Card>
);

// Consider: Does this need to be a new component?
// Or can the parent just compose Card + CardHeader?
```

### Component Selection Quick Reference

| Need | Use This Component | Alternative |
|------|-------------------|-------------|
| Display notifications | Alert, Toast, Sonner | Banner (page-wide) |
| User input text | Input | Textarea (multi-line) |
| Select from list | Select, Autocomplete | RadioGroup (few options) |
| Display data table | Table | DataGrid (advanced features) |
| Show progress | Progress | Stepper (multi-step) |
| Navigation | NavigationMenu, Tabs | Breadcrumbs (hierarchy) |
| Modal dialog | Dialog, Modal | Sheet (side panel) |
| Display code | Code | CodeEditor (editable) |
| Load more items | InfiniteScroll | Pagination |
| File upload | UploadButton | Input (type="file") |
| Async data states | AsyncStateContainer | LoadingState, ErrorState, EmptyState |

### Component Documentation

Each component includes comprehensive documentation located in its respective directory. The **Docs** field for each component above shows the exact path to its detailed documentation file.

Documentation files include:
- **`ComponentName.md`** - Detailed documentation (path shown in **Docs** field above)
- **`ComponentName.tsx`** - Implementation
- **`ComponentName.types.ts`** - TypeScript types
- **`ComponentName.stories.tsx`** - Visual examples in Storybook
- **`ComponentName.test.stories.tsx`** - Interaction tests

**Example**: For the Alert component, find documentation at `packages/ui/src/components/data-display/Alert/Alert.md`

### Getting Help

1. **Storybook** - Run `pnpm dev` to browse all components with live examples
2. **Type Definitions** - Check `.types.ts` files for available props
3. **Tests** - Read `.test.stories.tsx` for usage examples
4. **Documentation** - Read `.md` files for detailed guides

---

## Component Count Summary

- **Data Display**: 28 components
- **Feedback**: 7 components
- **Form**: 26 components
- **Layout**: 11 components
- **Navigation**: 7 components
- **Typography**: 5 components
- **Utility**: 7 components
- **MUI Primitives**: 19 re-exports (16 core + 3 advanced)

**Total**: 91 components + 19 MUI primitives available for reuse

---

**Last Updated**: 2026-02-05
**Version**: 1.2.0

> **Note**: This catalog is auto-generated from the component directory structure. Always verify component availability by checking the actual source files and Storybook.

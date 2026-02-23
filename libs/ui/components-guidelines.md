# Component Development Guidelines

## Component Categories Reference

- `data-display`: Tables, Lists, Cards, etc.
- `feedback`: Alerts, Toasts, Modals, etc.
- `form`: Inputs, Selects, Checkboxes, etc.
- `layout`: Grid, Container, Stack, etc.
- `navigation`: Menu, Breadcrumbs, Tabs, etc.
- `utility`: AspectRatio, Portal, Transitions, etc.

## Component Structure

### Path Pattern

`packages/ui/src/components/{category}/{ComponentName}/`

Where:

- `{category}` is **kebab-case** (e.g., `form`, `navigation`)
- `ComponentName` is **PascalCase**

### Required Files

- `{ComponentName}.tsx` - Main component implementation
- `{ComponentName}.types.ts` - TypeScript type definitions
- `{ComponentName}.stories.tsx` - Storybook stories
- `{ComponentName}.test.stories.tsx` - Test stories
- `index.ts` or `index.tsx` - Export file
- `{ComponentName}.md` - Component documentation
- `tests.md` - Test status tracking
- `track.md` - Development tracking

## Implementation Requirements

### Core Implementation Checklist

- [ ] Required props implemented
- [ ] Optional props have defaults
- [ ] Forwards refs where needed
- [ ] Proper TS typing with exported interfaces
- [ ] Accessibility attributes (aria-\*, role, etc.)
- [ ] Theme integration via MUI
- [ ] Responsive design considerations

### TypeScript Requirements

- All props properly typed
- No `any` without justification
- Correct generics/constraints
- Exported types available for external use
- Prop types exported alongside components

### Accessibility Requirements

- ARIA attributes present
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- WCAG compliance

## Story Requirements

### Story Template Structure

```ts
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'Component description from documentation' } },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for each prop
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
```

### Required Story Scenarios

- Default (minimal props)
- All variants/types
- Interactive states (hover, focus, active, disabled)
- Size variations
- Content variations (empty/min/max)
- Edge cases (long text, overflow)
- Accessibility (keyboard, screen reader)
- Responsive (mobile/tablet/desktop)
- Theme (light/dark) if applicable
- Glass effect variant (if applicable)
- Loading state (if applicable)
- Error state (if applicable)
- Empty state (if applicable)

## Test Requirements

### Test File Structure

```ts
import type { Meta, StoryObj } from '@storybook/react-vite';;
import { userEvent, within, expect, waitFor, fn } from '@storybook/test';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName/Tests',
  component: ComponentName,
  parameters: { layout: 'centered', chromatic: { disableSnapshot: false } },
  tags: ['autodocs', 'test'],
};
export default meta;
export type Story = StoryObj<typeof meta>;
```

### Test Categories

1. **Interaction Tests** - User interactions and state changes
2. **Form Interaction Tests** - Form-specific behaviors
3. **Keyboard Navigation Tests** - Keyboard accessibility
4. **Screen Reader Tests** - Screen reader compatibility
5. **Focus Management Tests** - Focus handling
6. **Responsive Design Tests** - Different viewport sizes
7. **Theme Variation Tests** - Light/dark theme support
8. **Visual State Tests** - All visual states
9. **Performance Tests** - Rendering performance
10. **Edge Cases Tests** - Boundary conditions
11. **Integration Tests** - Component composition

### Test Pass Criteria

- **PASS**: Element with `aria-label="Status of the test run"` contains `PASS` in textContent
- **RUNS**: textContent contains `RUNS`
- **FAIL**: textContent contains `FAIL`

## Documentation Requirements

### Component Documentation (`{ComponentName}.md`)

- Component purpose and use cases
- Props documentation with examples
- Usage examples
- Accessibility notes
- Best practices

### Test Tracking (`tests.md`)

```markdown
# {ComponentName} Test Status Tracking

## Test Files Status

- [ ] {ComponentName}.test.stories.tsx created
- [ ] All test categories implemented

## Storybook Tests Status

### Direct Links (quick access)

- Basic Interaction: <paste URL from UI>
- Form Interaction: <paste URL from UI>
- Keyboard Navigation: <paste URL from UI>
- Screen Reader: <paste URL from UI>
- Focus Management: <paste URL from UI>
- Responsive Design: <paste URL from UI>
- Theme Variations: <paste URL from UI>
- Visual States: <paste URL from UI>
- Performance: <paste URL from UI>
- Edge Cases: <paste URL from UI>
- Integration: <paste URL from UI>

### Test Results

| Test Name            | Status  | Pass/Fail | Notes       |
| -------------------- | ------- | --------- | ----------- |
| Basic Interaction    | Pending | -         | Not started |
| Form Interaction     | Pending | -         | Not started |
| Keyboard Navigation  | Pending | -         | Not started |
| Screen Reader        | Pending | -         | Not started |
| Focus Management     | Pending | -         | Not started |
| Responsive Design    | Pending | -         | Not started |
| Theme Variations     | Pending | -         | Not started |
| Visual States        | Pending | -         | Not started |
| Performance          | Pending | -         | Not started |
| Edge Cases           | Pending | -         | Not started |
| Integration          | Pending | -         | Not started |
| [add more if needed] | Pending | -         | Not started |

Legend: Pending | Running | PASS | FAIL

## Static Stories Status

- [ ] Default story
- [ ] All variants covered
- [ ] Glass effect variant (if applicable)
- [ ] Hover state story
- [ ] Disabled state story
- [ ] Loading state story (if applicable)
- [ ] Error state story (if applicable)
- [ ] Empty state story (if applicable)

## Lint Status

- [ ] No lint errors
- [ ] No warnings

## TypeCheck Status

- [ ] No type errors
- [ ] All props properly typed

## Overall Component Status

- [ ] All tests passing
- [ ] Lint clean
- [ ] TypeCheck clean
- [ ] Stories working
- [ ] Ready for production
```

### Development Tracking (`track.md`)

- Component title and one-paragraph description
- Each prop and one-line description of its effect
- Sections: **Lint**, **Type Errors**, **Testing Scenarios**, **Storybook Tests List**, **Current** plan
- Session tracking with BRL date/time and remaining TODOs

### Component Task Assignment (`components.tasks.md`)

Located at `packages/ui/components.tasks.md`, this file tracks:

- Component work assignment status
- Agent assignments (omega-[number] format)
- Work progress states:
  - `(working)` - Currently being implemented
  - `(completed)` - Implementation finished
  - `(verified)` - Human confirmed production-ready
  - `(rechecking)` - Quality assurance in progress
  - `(needs-fixes: reason)` - Issues found during QA
  - `(blocked: reason)` - Work cannot proceed
  - `(partial: phase X)` - Partially completed

Format example:

```
14. Slider (completed) [omega-1] - 2025-09-06 21:30 - All 11 test stories PASS; lint clean; TypeScript clean
```

**Important**: Always check and update this file before starting work on any component to avoid conflicts with other agents.

## Code Quality Standards

### Code Quality

All code quality checks are handled by `pnpm check:component`:

- TypeScript compilation
- ESLint compliance (auto-fix then verify)
- Build validation
- Import/export structure

**Note**: Never run individual linting or type-checking commands. The check:component script handles everything.

## Build and Bundle Requirements

### Export Requirements

- Component must be properly exported from index file
- Types must be exported for external use
- All public APIs documented

### Build Verification

- Component builds without errors
- No missing imports/dependencies
- Build output generated as configured
- All exports bundled correctly

## Package Management

- **Package manager**: pnpm (enforced by `"preinstall": "npx only-allow pnpm"`)
- **Dependencies**: Check existing libraries before adding new ones
- **Framework**: MUI integration required for theming
- **Testing**: Storybook test framework

## Component Validation Command

### Usage

```bash
cd packages/ui
pnpm check:component <category> <ComponentName>
```

### What It Validates

The `check:component` script (`packages/ui/scripts/check-component.js`) performs 14 comprehensive checks:

1. **Documentation catalog** - Component listed in docs
2. **Task tracking** - Entry in components.tasks.md
3. **Change scope** - Only allowed files modified
4. **Test patterns** - No bypass patterns used
5. **Storybook** - Server is reachable
6. **TypeScript** - Component compiles without errors
7. **ESLint fix** - Auto-fixes formatting issues
8. **Build** - Component builds with tsup
9. **ESLint verify** - No remaining lint issues
10. **Folder structure** - Required files present
11. **Barrel exports** - Proper index exports
12. **Stories coverage** - All required stories exist
13. **Design tokens** - Using theme tokens correctly
14. **Accessibility** - A11y stories and tests present

The command must complete successfully before considering a component ready.

## Conventions

### Naming Conventions

- Components: PascalCase (e.g., `ButtonGroup`)
- Props: camelCase (e.g., `isDisabled`)
- Files: Match component name
- Categories: kebab-case (e.g., `data-display`)

### Code Style

- Follow existing patterns in codebase
- Use existing utilities and libraries
- Maintain consistent indentation
- Prefer composition over inheritance
- Use discriminated unions for type safety

### Security Best Practices

- Never expose or log secrets/keys
- Validate all user input
- Sanitize rendered content
- Follow OWASP guidelines
- Implement proper CSP compliance

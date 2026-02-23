# UploadButton Component

**Purpose:** Single-file selection (and optional upload) with variants for plain button, outlined, ghost, and a compact **dropzone** surface for drag-and-drop (still single file).

```ts
interface UploadButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'dropzone';
  label?: string; // Button text
  accept?: string; // e.g. "image/*,.pdf"
  capture?: 'user' | 'environment'; // mobile camera hints
  disabled?: boolean;

  // Selection & upload
  onSelect: (file: File) => void;
  onUpload?: (file: File) => Promise<void>; // optional built-in upload
  uploading?: boolean; // external control of spinner/progress
  progress?: number; // 0–100 (if showing progress)

  // Constraints
  maxSizeMB?: number;
  validate?: (file: File) => string | null; // return error message to block

  // UI hooks
  helperText?: string;
  errorText?: string;
  icon?: React.ReactNode;
  className?: string;
}
```

**Features**

- Click to choose or drag-and-drop (dropzone variant).
- Optional built-in async `onUpload` with progress; or use external upload.
- Size/type validation with friendly error messaging.

**A11y**

- Use `<input type="file">` with `aria-describedby` for helper/error.
- In dropzone, announce drag enter/leave via `aria-live="polite"`.

**Stories / Tests**

- Default, Outline, Ghost, Dropzone; Accept filter; Max size error; Uploading + Progress; Keyboard focus.

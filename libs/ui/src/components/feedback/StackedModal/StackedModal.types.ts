import type { ReactNode } from 'react';

export interface StackedModalProps {
  /** Controls the visibility of the modal */
  open: boolean;
  /** Callback fired when the component requests to be closed */
  onClose: () => void;
  /** Enable glass morphism effect */
  glass?: boolean;
  /** Title displayed in the modal navigation bar */
  navigationTitle?: string | ReactNode;
  /** Modal content */
  children?: ReactNode;
  /** Actions to display in the modal header (desktop) or footer (mobile) */
  actions?: ReactNode;
  /** Unique identifier for the modal in the stack */
  modalId?: string;
  /** Whether the modal can be closed by clicking outside */
  closeOnClickOutside?: boolean;
  /** Whether the modal can be closed by pressing the escape key */
  closeOnEsc?: boolean;
  /** Show loading skeleton overlay */
  loading?: boolean;
  /** Text to display during loading state */
  loadingText?: string;
  /** Make modal full screen */
  fullScreen?: boolean;
  /** Maximum width of the modal */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  /** Disable the backdrop click behavior */
  disableBackdrop?: boolean;
  /** Disable focus trap functionality */
  disableFocusTrap?: boolean;
  /** Keep the modal mounted when closed */
  keepMounted?: boolean;
  /** ARIA labelledby attribute */
  'aria-labelledby'?: string;
  /** ARIA describedby attribute */
  'aria-describedby'?: string;
  /** Enable right-to-left language support */
  rtl?: boolean;
  /** Base test ID for testing purposes - will be used to generate testIds for all sub-elements */
  dataTestId?: string;
}

export interface ModalInfo {
  /** Unique identifier for the modal */
  id: string;
  /** Z-index value for stacking */
  zIndex: number;
  /** Role in the modal stack */
  role: 'primary' | 'secondary' | 'background';
}

export interface ModalStackContextValue {
  /** Current modal stack */
  stack: ModalInfo[];
  /** Add a modal to the stack */
  pushModal: (modalId: string) => void;
  /** Remove a modal from the stack */
  popModal: (modalId?: string) => void;
  /** Clear all modals from the stack */
  clearStack: () => void;
  /** Current depth of the modal stack */
  currentDepth: number;
  /** Check if a modal is in the stack */
  isModalInStack: (modalId: string) => boolean;
  /** Get the role of a modal in the stack */
  getModalRole: (modalId: string) => 'primary' | 'secondary' | 'background' | null;
}

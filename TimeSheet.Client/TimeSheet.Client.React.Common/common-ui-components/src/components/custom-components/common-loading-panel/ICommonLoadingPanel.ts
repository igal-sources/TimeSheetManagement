export interface ICommonLoadingPanelProps {
  className?: string;
  message?: string;
  position: any;
  visible?: boolean;
  withIndicator?: boolean;
  withOverlay?: boolean;
  withPaneBorder?: boolean;
  hideOnOutsideClick?: boolean;
  onHiding: (event: any) => void;
}

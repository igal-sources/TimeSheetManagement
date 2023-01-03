export interface ICommonSearchBarProps {
  placeholderText?: string
  value?: any
  isReadOnly: boolean
  onChange: (newValue: any) => void
  onCancelSearch: () => void
  onRequestSearch: () => void
}

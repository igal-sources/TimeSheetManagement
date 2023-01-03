export interface ICommonAvatarControlProps {
  id?: string
  name?: string
  avatarWidth?: number
  avatarHeight?: number
  imageURL?: string
  imageAltString?: string
  isReadOnly: boolean
  confirm: (value: any, imageInfo: any) => void
  imageInfo: (value: any) => void
}

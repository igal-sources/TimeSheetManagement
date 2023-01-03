import './common-avatar-control.css';
export interface AvatarProps {
    id: string | undefined;
    name: string | undefined;
    avatarWidth: number | undefined;
    avatarHeight: number | undefined;
    imageURL: string | undefined;
    imageAltString: string | undefined;
    isReadOnly: boolean;
    confirm: (value: any) => void;
}
export declare const CommonAvatarControl: ({ id, name, avatarWidth, avatarHeight, imageURL, imageAltString, isReadOnly, confirm }: AvatarProps) => JSX.Element;
export default CommonAvatarControl;

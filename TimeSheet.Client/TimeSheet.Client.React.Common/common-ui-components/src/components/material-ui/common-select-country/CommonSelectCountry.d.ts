import React from 'react';
interface ChildProps {
    id: string | undefined;
    name: string | undefined;
    label: string | undefined;
    value: any | undefined;
    fullWidth: boolean;
    required: boolean;
    disabled: boolean;
    readOnly: boolean;
    multiple: boolean;
    onChange: (value: any) => void;
}
declare const CommonSelectCountry: React.FC<ChildProps>;
export default CommonSelectCountry;

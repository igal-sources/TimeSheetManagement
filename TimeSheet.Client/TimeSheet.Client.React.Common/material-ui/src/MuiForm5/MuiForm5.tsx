import { FunctionComponent } from 'react';
import { withTheme, FormProps } from '@rjsf/core';

import Theme5 from '../Theme5';

//a.z. 2022-07-02 remove "React.ComponentClass<FormProps<T>>"
// const MuiForm5: React.ComponentClass<FormProps<any>> | FunctionComponent<FormProps<any>> = withTheme(Theme5);
const MuiForm5: FunctionComponent<FormProps<any>> = withTheme(Theme5);

export default MuiForm5;

import React, {memo} from 'react';
import Button, {ButtonProps} from '@mui/material/Button';

type Props = ButtonProps & {
    children: React.ReactNode
}

export const ButtonWithMemo = memo(({children, ...rest}: Props) => {
    console.log('ButtonWithMemo')
    return (
        <Button {...rest}>{children}</Button>
    )
})
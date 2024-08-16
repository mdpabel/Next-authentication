import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { ControllerRenderProps } from 'react-hook-form';
import { useState } from 'react';

type Props = {
  field: any;
  placeholder?: string;
};

const PasswordInputField = ({ field, placeholder }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative'>
      <Input
        {...field}
        type={show ? 'text' : 'password'}
        placeholder={placeholder || 'Password'}
      />
      {show ? (
        <EyeOffIcon
          onClick={() => setShow((prev) => !prev)}
          className='top-1/2 right-3 absolute -translate-y-1/2 cursor-pointer'
        />
      ) : (
        <EyeIcon
          onClick={() => setShow((prev) => !prev)}
          className='top-1/2 right-3 absolute -translate-y-1/2 cursor-pointer'
        />
      )}
    </div>
  );
};

export default PasswordInputField;

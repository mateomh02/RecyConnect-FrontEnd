import { useState } from 'react'
import { FormControl, FormField, FormItem, FormMessage, Input, cn } from '@/modules'
import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

type InputFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: string
  placeholder?: string
  type?: string
  disabled?: boolean
  className?: string
  label?: string
  labelClassName?: string
  classNameWrap?: string
}

export const InputField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type = 'text',
  disabled,
  className,
  label,
  labelClassName,
  classNameWrap
}: InputFieldProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type

  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className={cn(classNameWrap)}>
          {label && (
            <label htmlFor={name} className={cn('text-xs font-semibold text-tertiary-600', labelClassName)}>
              {label}
            </label>
          )}
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder={placeholder}
                type={inputType}
                disabled={disabled}
                className={`${className} pr-10`}
              />
              {type === 'password' && (
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 flex items-center px-2 text-tertiary-100 focus:outline-none'
                >
                  {isPasswordVisible ? <FaRegEye size={18} /> : <FaRegEyeSlash size={20} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

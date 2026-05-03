import { type Control, type FieldValues, type Path } from 'react-hook-form'
import { cn, FormControl, FormField, FormItem, FormMessage, SelectInput } from '@/modules'

export interface Options {
  label: string
  value: string
}

interface SelectFieldProps<T extends FieldValues> {
  options: Options[] | undefined
  control: Control<T>
  label?: string
  placeholder?: string
  name: string
  search?: boolean
  disabled?: boolean
  className?: string
  classNameWrap?: string
  loading?: boolean
}

export const SelectField = <T extends FieldValues>({
  options,
  control,
  label,
  placeholder,
  name,
  search,
  disabled,
  className,
  classNameWrap,
  loading
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem className={cn(classNameWrap)}>
          {label && (
            <label htmlFor={name} className='text-xs font-semibold text-tertiary-600'>
              {label}
            </label>
          )}
          <FormControl>
            <SelectInput
              search={search}
              placeholder={placeholder}
              onChange={field.onChange}
              items={options}
              disabled={disabled}
              value={field.value}
              className={className}
              loading={loading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

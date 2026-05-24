import { FormControl, FormField, FormItem, FormMessage, TimeInput } from '@/modules'
import type { Control, FieldValues, Path } from 'react-hook-form'

interface TimeFieldProps<T extends FieldValues> {
  control: Control<T>
  label?: string
  placeholder?: string
  name: string
  disabled?: boolean
  className?: string
}

export const TimeField = <T extends FieldValues>({ control, label, placeholder = '--:--', name, disabled, className }: TimeFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem>
          {label && (
            <label htmlFor={name} className='text-xs font-semibold text-tertiary-600'>
              {label}
            </label>
          )}
          <FormControl>
            <TimeInput
              placeholder={placeholder}
              onChange={field.onChange}
              disabled={disabled}
              value={field.value ?? ''}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

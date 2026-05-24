import { DatePicker, FormControl, FormField, FormItem, FormMessage } from '@/modules'
import type { Control, FieldValues, Path } from 'react-hook-form'

interface DateFieldProps<T extends FieldValues> {
  control: Control<T>
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  value?: Date
}

export const DateField = <T extends FieldValues>({ control, name, label, placeholder, disabled, value }: DateFieldProps<T>) => {
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
            <DatePicker
              {...field}
              disabled={disabled}
              onChange={(value: Date | undefined) => {
                if (value != null) {
                  const date = new Date(value)
                  field.onChange(date)
                }
              }}
              value={field.value ?? value}
              placeholder={placeholder}
            // minDate={new Date()}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

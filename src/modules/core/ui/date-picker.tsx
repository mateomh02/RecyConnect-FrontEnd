import { format } from 'date-fns'
import { useState, useEffect, forwardRef } from 'react'
import { Calendar, cn, Button } from '@/modules'
import { es } from 'date-fns/locale'
import * as Popover from '@radix-ui/react-popover'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'
import { IoCalendarClearOutline } from 'react-icons/io5'

interface DatePickerProps {
  placeholder?: string
  className?: string
  onChange?: (value: Date | undefined) => void
  disabled?: boolean
  value?: any
  minDate?: Date
  maxDate?: Date
  placeholderClassName?: string
}

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      placeholder,
      className,
      onChange,
      disabled,
      value,
      minDate,
      maxDate,
      placeholderClassName
    },
    ref
  ) => {
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const handleNextMonth = () => {
      setCurrentMonth(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      )
    }

    const handlePreviousMonth = () => {
      setCurrentMonth(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      )
    }
    const handleSelectDate = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      onChange?.(selectedDate)
      setOpen(false)
    }
    useEffect(() => {
      setDate(value)
    }, [value])

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger
          type='button'
          ref={ref}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border-[1px] border-slate-300 bg-white pl-3 pr-4 text-left text-sm font-normal text-slate-900 transition-colors',
            'hover:border-slate-400 focus:outline-none cursor-pointer',
            'disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed disabled:opacity-100',
            className
          )}
        >
          {date ? (
            <span className="font-medium">{format(date, 'dd/MM/yyyy', { locale: es })}</span>
          ) : (
            <span className={cn('text-slate-400 font-normal', placeholderClassName)}>
              {placeholder ?? 'DD/MM/AAAA'}
            </span>
          )}
          <div>
            <IoCalendarClearOutline className={cn('ml-2 h-4 w-4 text-slate-500', disabled && 'text-slate-400')} />
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={5}
            className='rounded-md border border-slate-200 bg-white p-4 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-100'
          >
            <div className='mb-3 flex items-center justify-between'>
              <Button
                variant='tertiary'
                onClick={handlePreviousMonth}
                className='h-8 w-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center rounded-md'
              >
                <GoChevronLeft size={20} />
              </Button>
              <span className='text-center text-sm font-semibold text-slate-800 capitalize select-none'>
                {format(currentMonth, 'MMMM yyyy', { locale: es })}
              </span>
              <Button
                variant='tertiary'
                onClick={handleNextMonth}
                className='h-8 w-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900 flex items-center justify-center rounded-md'
              >
                <GoChevronRight size={20} />
              </Button>
            </div>
            <Calendar
              minDate={minDate}
              maxDate={maxDate}
              weekStartsOn={0}
              mode='single'
              selected={date}
              onSelect={handleSelectDate}
              locale={es}
              month={currentMonth}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    )
  }
)

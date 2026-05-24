import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DayPicker } from 'react-day-picker'

import { cn, buttonVariants } from '@/modules'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  minDate?: Date
  maxDate?: Date
}

const IconLeft = () => <ChevronLeftIcon className='h-4 w-4' />
const IconRight = () => <ChevronRightIcon className='h-4 w-4' />

const normalizeDate = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

function Calendar({
  className,
  classNames,
  minDate,
  maxDate,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const isDateDisabled = (date: Date) => {
    const normalizedDate = normalizeDate(date)
    if (minDate && normalizedDate < normalizeDate(minDate)) {
      return true
    }
    if (maxDate && normalizedDate > normalizeDate(maxDate)) {
      return true
    }

    return false
  }

  return (
    <DayPicker
      disabled={isDateDisabled}
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: cn(props.mode === 'single' ? 'space-y-0' : 'space-y-4'),
        month_caption: cn(
          'flex justify-center pt-1 relative items-center',
          props.mode === 'single' && 'hidden'
        ),
        caption_label: 'text-sm font-medium capitalize',
        nav: 'space-x-1 flex items-center',
        button_previous: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 bg-white shadow p-0 hover:bg-gray-50 active:bg-gray-100 hidden absolute left-1'
        ),
        button_next: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 bg-white shadow p-0 hover:bg-gray-50 active:bg-gray-100 hidden absolute right-1'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday: 'text-tertiary-100 w-8 font-bold text-base capitalize',
        week: 'flex w-full mt-2',
        day: cn(
          'h-8 w-8 p-0 font-normal text-base relative text-center text-md focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-xl',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-xl [&:has(>.day-range-start)]:rounded-l-xl first:[&:has([aria-selected])]:rounded-l-xl last:[&:has([aria-selected])]:rounded-r-xl'
            : '[&:has([aria-selected])]:rounded-xl'
        ),
        selected: 'bg-secondary text-tertiary-50 rounded-[4px] hover:bg-secondary hover:text-primary-foreground focus:bg-secondary aria-selected:opacity-100',
        today: 'bg-accent text-accent-foreground',
        outside: 'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        disabled: 'text-muted-foreground opacity-50',
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        range_middle: '!rounded-none !text-tertiary font-normal bg-secondary-100',
        hidden: 'invisible',
        ...classNames
      }}
      components={{
        Chevron: (chevronProps) => {
          if (chevronProps.orientation === 'left') return <IconLeft />
          return <IconRight />
        }
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
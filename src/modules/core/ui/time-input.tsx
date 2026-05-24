import { SelectInput } from '@/modules'

interface Option {
  label: string
  value: string
}

interface TimeFieldProps {
  value?: string
  onChange?: (value: string) => void
  startHour?: number
  endHour?: number
  interval?: number
  placeholder?: string
  disabled?: boolean
  className?: string
}

function generateHourOptions(
  interval: number = 30,
  startHour: number = 0,
  endHour: number = 23
): Option[] {
  const hours: Option[] = []

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const period = hour < 12 ? 'am' : 'pm'
      const adjustedHour = hour % 12 === 0 ? 12 : hour % 12
      const hourString = adjustedHour.toString().padStart(2, '0')
      const minuteString = minute.toString().padStart(2, '0')
      const label = `${hourString}:${minuteString} ${period}`
      const valueHour = hour < 10 ? `0${hour}` : `${hour}`
      const value = `${valueHour}:${minuteString}`

      hours.push({
        label,
        value
      })
    }
  }

  return hours
}

export const TimeInput = ({
  startHour = 0,
  endHour = 23,
  interval = 30,
  placeholder = '--:--',
  disabled,
  onChange,
  className,
  value
}: TimeFieldProps) => {
  const options = generateHourOptions(interval, startHour, endHour)

  return (
    <SelectInput
      placeholder={placeholder}
      onChange={(value) => onChange?.(value as string)}
      items={options}
      disabled={disabled}
      value={value}
      className={className}
      timeField={true}
    />
  )
}

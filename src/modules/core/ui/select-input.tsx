import { Button, Popover, PopoverContent, PopoverTrigger, Input, cn, Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/modules'
import { cloneElement, useEffect, useMemo, useRef, useState, type JSX } from 'react'
import { type FieldError, type Noop } from 'react-hook-form'
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'

interface SelectInputProps<Label extends string, Value extends string> {
  placeholder?: string
  className?: string
  labelKey?: string
  valueKey?: string
  disabled?: boolean
  timeField?: boolean
  search?: boolean
  loading?: boolean
  onBlur?: Noop
  value?: string
  error?: FieldError
  onChange?: (...event: unknown[]) => void
  items?: { [key in Label | Value]: string }[] | null
  onValueChangeCallBack?: any
  leftIcon?: JSX.Element
}

export const SelectInput = <Label extends string, Value extends string>(props: SelectInputProps<Label, Value>) => {
  const {
    className,
    labelKey = 'label',
    valueKey = 'value',
    disabled = false,
    search = false,
    loading = false,
    timeField = false,
    placeholder = '',
    onBlur,
    value = '',
    error,
    onChange,
    items,
    leftIcon,
    onValueChangeCallBack = () => { }
  } = props

  const divRef = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [width, setWidth] = useState<number>(0)
  const [query, setQuery] = useState<string>('')
  const [valueItem, setValueItem] = useState(value)

  const normalizeString = (str: string): string => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const memoizedOptions = useMemo(() => {
    if (!items || items.length === 0) return []
    if (!query) return items

    return items.filter((element) =>
      normalizeString(element[labelKey as Label].toLowerCase()).includes(normalizeString(query.toLowerCase()))
    )
  }, [items, labelKey, query])

  const onValueChange = useMemo(
    () => (value: string) => {
      if (!items || items.length === 0) return

      const item = items.find((item) => item[valueKey as Value] === value)
      if (item) {
        onValueChangeCallBack({
          label: item[labelKey as Label],
          value: item[valueKey as Value]
        })
        setValueItem(value)
      }
    },
    [items, labelKey, valueKey, onValueChangeCallBack]
  )

  // Actualizado para usar bordes y colores accesibles
  const buttonClassName = useMemo(
    () =>
      cn(
        'flex h-10 justify-between px-3 font-normal border border-slate-300 bg-white text-slate-900 transition-colors',
        'hover:border-slate-400 hover:bg-slate-50 focus:outline-none cursor-pointer',
        (disabled || loading) && 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-100'
      ),
    [disabled, loading]
  )

  const updateWidth = () => {
    if (divRef.current) {
      const { width } = divRef.current.getBoundingClientRect()
      setWidth(width)
    }
  }

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => {
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  useEffect(() => {
    setValueItem(value)
  }, [value])

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className='relative flex flex-col justify-center cursor-pointer'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled || loading}
              onBlur={onBlur}
              ref={divRef}
              variant='tertiary'
              role='combobox'
              aria-expanded={open}
              className={buttonClassName}
            >
              <div className='relative flex h-5 w-full items-center'>
                <div className='flex max-w-[90%] items-center truncate'>
                  {leftIcon && (
                    <span className='mr-2 shrink-0 text-slate-500'>
                      {cloneElement(leftIcon, {
                        size: 20,
                        strokeWidth: 1
                      })}
                    </span>
                  )}
                  {valueItem ? (
                    loading ? (
                      <span className="text-slate-400">Cargando...</span>
                    ) : (
                      <span className="font-medium text-slate-900">
                        {memoizedOptions.find((item) => item[valueKey as Value] === valueItem)?.[labelKey as Label]}
                      </span>
                    )
                  ) : (
                    <span className='text-sm text-slate-400 font-normal'>{placeholder}</span>
                  )}
                </div>
                {timeField ? (
                  <div className='absolute right-0 top-0.5'>
                    <Clock className={cn('ml-2 h-4 w-4 shrink-0 text-slate-400', open && 'text-slate-600')} />
                  </div>
                ) : (
                  <div className='absolute right-0 top-0.5'>
                    {!open ? (
                      <ChevronDown className='ml-2 h-4 w-4 shrink-0 text-slate-400' />
                    ) : (
                      <ChevronUp className='ml-2 h-4 w-4 shrink-0 text-slate-600' />
                    )}
                  </div>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            onOpenAutoFocus={(e) => e.preventDefault()}
            sideOffset={4}
            className='rounded-md border border-slate-200 bg-white p-1 shadow-xl z-50 animate-in fade-in-50 zoom-in-95 duration-100'
            style={{
              minWidth: `${width}px`,
              width: `${width}px`,
              maxWidth: 'auto'
            }}
          >
            <Command className='flex w-full flex-col gap-1 bg-white'>
              {search && (
                <Input
                  value={query}
                  className='mb-1 h-9 rounded-sm border-slate-200 text-sm '
                  onChange={(evn) => setQuery(evn.target.value)}
                  placeholder='Buscar...'
                />
              )}
              <CommandEmpty className='py-3 text-center text-sm text-slate-500'>
                {loading ? 'Cargando...' : 'Sin resultados.'}
              </CommandEmpty>
              <CommandList className="max-h-[250px] overflow-y-auto custom-scrollbar">
                <CommandGroup className='p-0'>
                  {memoizedOptions.map((item) => {
                    const labelValue = item[labelKey as Label].trim()
                    const valueValue = item[valueKey as Value]
                    const isSelected = valueValue === value

                    return (
                      <CommandItem
                        className={cn(
                          'mb-0.5 mt-0.5 flex cursor-pointer items-center gap-2 rounded-sm py-2 pl-3 text-sm text-slate-700 transition-colors outline-none select-none',
                          'hover:bg-slate-100 hover:text-slate-900',
                          isSelected && 'bg-slate-100 font-semibold text-secondary hover:bg-slate-200'
                        )}
                        key={valueValue as string}
                        value={valueValue as string}
                        onSelect={(currentValue) => {
                          if (onChange) onChange(currentValue)
                          onValueChange(currentValue)
                          setOpen(false)
                          setTimeout(() => {
                            setQuery('')
                          }, 100)
                        }}
                      >
                        {labelValue}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && <span className='text-xs font-medium text-[#FF432C] mt-0.5'>*{error?.message ?? ''}</span>}
    </div>
  )
}
import {useEffect, useState} from 'react'
import {Button} from './ui/button'
import {Input} from './ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select'
import {Card, CardContent} from './ui/card'
import {AlertCircle, ArrowRight, CheckCircle, Clock, Copy} from 'lucide-react'
import {getCurrentTimezone, MAJOR_TIMEZONES} from '@/lib/utils'

export function DateTimeToTimestamp() {
  const [dateValue, setDateValue] = useState('')
  const [timeValue, setTimeValue] = useState('')
  const [timezone, setTimezone] = useState(() => getCurrentTimezone())
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [userTimezone] = useState(getCurrentTimezone())

  // Set current datetime as default on component mount
  useEffect(() => {
    const now = new Date()
    const date = now.toISOString().split('T')[0]
    const time = now.toTimeString().split(' ')[0].slice(0, 5)
    setDateValue(date)
    setTimeValue(time)
  }, [])

  const handleConvert = () => {
    setError('')
    setResult(null)

    if (!dateValue || !timeValue) {
      setError('Please select both date and time')
      return
    }

    try {
      // Combine date and time
      const dateTimeString = `${dateValue}T${timeValue}`

      let date: Date

      if (timezone === 'UTC') {
        // Parse as UTC
        date = new Date(`${dateTimeString}Z`)
      } else if (timezone === userTimezone) {
        // Parse as local time
        date = new Date(dateTimeString)
      } else {
        // For other timezones, use Intl.DateTimeFormat to handle timezone conversion
        // Parse as if it's in the specified timezone
        try {
          // Create a temporary date to work with
          const tempDate = new Date(dateTimeString)

          // Use toLocaleString to convert from the target timezone to UTC
          const utcString = tempDate.toLocaleString('en-CA', {timeZone: timezone})
          const [datePart, timePart] = utcString.split(', ')
          const [year, month, day] = datePart.split('-')
          const [hour, minute, second] = timePart.split(':')

          // Create date in target timezone and calculate offset
          const targetDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second || '0'))
          const offset = tempDate.getTime() - targetDate.getTime()

          date = new Date(tempDate.getTime() - offset)
        } catch {
          // Fallback to treating as local time if timezone conversion fails
          date = new Date(dateTimeString)
        }
      }

      if (isNaN(date.getTime())) {
        setError('Invalid date or time format')
        return
      }

      const timestamp = Math.floor(date.getTime() / 1000)
      setResult(timestamp)
    } catch (err) {
      setError('Failed to convert date and time')
    }
  }

  const copyToClipboard = async () => {
    if (result === null) return

    try {
      await navigator.clipboard.writeText(result.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy timestamp:', err)
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    const date = now.toISOString().split('T')[0]
    const time = now.toTimeString().split(' ')[0].slice(0, 5)
    setDateValue(date)
    setTimeValue(time)
    setError('')
    setResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="date-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Date
            </label>
            <Input
              id="date-input"
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="time-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Time
            </label>
            <Input
              id="time-input"
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              step="1"
            />
          </div>
        </div>

        <div>
          <label htmlFor="input-timezone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Input Timezone
          </label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone"/>
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value={userTimezone}>Local Time ({userTimezone})</SelectItem>
              {MAJOR_TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleConvert}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            disabled={!dateValue || !timeValue}
          >
            <ArrowRight className="h-4 w-4 mr-2"/>
            Convert to Timestamp
          </Button>
          <Button
            onClick={getCurrentDateTime}
            variant="outline"
            className="px-3"
            title="Use current date and time"
          >
            <Clock className="h-4 w-4"/>
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertCircle className="h-4 w-4"/>
              <span className="text-sm">{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Display */}
      {result !== null && (
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-900/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <Clock className="h-5 w-5"/>
                  <span className="font-semibold">Unix Timestamp Result</span>
                </div>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-300 hover:bg-purple-100 dark:text-purple-400 dark:border-purple-600 dark:hover:bg-purple-900/30"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2"/>
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2"/>
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {result.toString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Seconds since January 1, 1970 UTC
                  </div>
                </div>
              </div>

              <div className="grid gap-3 text-sm">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Input interpreted as
                  </div>
                  <div className="font-mono">
                    {timezone === 'UTC'
                      ? 'UTC Time'
                      : timezone === userTimezone
                        ? `Local Time (${userTimezone})`
                        : MAJOR_TIMEZONES.find(tz => tz.value === timezone)?.label || timezone
                    }
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Milliseconds timestamp
                  </div>
                  <div className="font-mono text-gray-600 dark:text-gray-300">
                    {(result * 1000).toString()}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
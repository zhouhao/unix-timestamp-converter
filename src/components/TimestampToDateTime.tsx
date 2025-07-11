import {useState} from 'react'
import {Button} from './ui/button'
import {Input} from './ui/input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from './ui/select'
import {Card, CardContent} from './ui/card'
import {AlertCircle, ArrowRight, Calendar} from 'lucide-react'
import {convertTimestampToDate, detectTimestampFormat, getCurrentTimezone, isValidTimestamp} from '@/lib/utils'

export function TimestampToDateTime() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{
    date: Date;
    format: 'seconds' | 'milliseconds';
  } | null>(null)
  const [error, setError] = useState('')
  const [timezone, setTimezone] = useState('local')
  const [userTimezone] = useState(getCurrentTimezone())

  const handleConvert = () => {
    setError('')
    setResult(null)

    if (!input.trim()) {
      setError('Please enter a timestamp')
      return
    }

    const timestamp = parseFloat(input.trim())

    if (!isValidTimestamp(timestamp)) {
      setError('Please enter a valid timestamp (positive number)')
      return
    }

    try {
      const format = detectTimestampFormat(timestamp)
      const date = convertTimestampToDate(timestamp)

      setResult({date, format})
    } catch (err) {
      setError('Invalid timestamp format')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setError('')
    setResult(null)
  }

  const formatDate = (date: Date, tz: string) => {
    if (tz === 'UTC') {
      return date.toISOString().replace('T', ' ').replace('.000Z', ' UTC')
    }
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="timestamp-input" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Unix Timestamp
          </label>
          <Input
            id="timestamp-input"
            type="text"
            placeholder="e.g., 1672531200 or 1672531200000"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="font-mono"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Enter timestamp in seconds (10 digits) or milliseconds (13 digits)
          </p>
        </div>

        <div>
          <label htmlFor="timezone-select" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Display Timezone
          </label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger>
              <SelectValue placeholder="Select timezone"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local Time ({userTimezone})</SelectItem>
              <SelectItem value="UTC">UTC</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleConvert}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!input.trim()}
        >
          <ArrowRight className="h-4 w-4 mr-2"/>
          Convert Timestamp
        </Button>
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
      {result && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-4">
                <Calendar className="h-5 w-5"/>
                <span className="font-semibold">Conversion Result</span>
              </div>

              <div className="grid gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Detected Format
                  </div>
                  <div className="text-lg font-mono">
                    {result.format === 'seconds' ? 'Seconds (10 digits)' : 'Milliseconds (13 digits)'}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {timezone === 'UTC' ? 'UTC Time' : `Local Time (${userTimezone})`}
                  </div>
                  <div className="text-lg font-mono">
                    {formatDate(result.date, timezone)}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    ISO Format
                  </div>
                  <div className="text-lg font-mono text-gray-600 dark:text-gray-300">
                    {result.date.toISOString()}
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
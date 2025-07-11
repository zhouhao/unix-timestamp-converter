import {useEffect, useState} from 'react'
import {Card, CardContent, CardHeader, CardTitle} from './ui/card'
import {Button} from './ui/button'
import {CheckCircle, Clock, Copy} from 'lucide-react'
import {getCurrentTimezone} from '@/lib/utils'

export function LiveTimestamp() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0)
  const [copied, setCopied] = useState(false)
  const [timezone] = useState(getCurrentTimezone())

  useEffect(() => {
    const updateTimestamp = () => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000))
    }

    // Initial update
    updateTimestamp()

    // Set up interval to update every second
    const interval = setInterval(updateTimestamp, 1000)

    return () => clearInterval(interval)
  }, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentTimestamp.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy timestamp:', err)
    }
  }

  const currentDate = new Date(currentTimestamp * 1000)

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white border-0 shadow-xl">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Clock className="h-6 w-6 animate-pulse"/>
          <CardTitle className="text-2xl font-bold">
            Current Unix Timestamp
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        {/* Large timestamp display */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="text-4xl md:text-5xl font-mono font-bold mb-2">
            {currentTimestamp.toString()}
          </div>
          <Button
            onClick={copyToClipboard}
            variant="secondary"
            size="sm"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2"/>
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2"/>
                Copy Timestamp
              </>
            )}
          </Button>
        </div>

        {/* Human-readable date */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="font-semibold text-blue-100 dark:text-purple-100 mb-1">
              Local Time ({timezone})
            </div>
            <div className="font-mono text-lg">
              {currentDate.toLocaleString()}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="font-semibold text-blue-100 dark:text-purple-100 mb-1">
              UTC Time
            </div>
            <div className="font-mono text-lg">
              {currentDate.toISOString().replace('T', ' ').replace('.000Z', ' UTC')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
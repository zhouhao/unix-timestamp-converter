import {TimestampToDateTime} from './components/TimestampToDateTime'
import {LiveTimestamp} from './components/LiveTimestamp'
import {DateTimeToTimestamp} from './components/DateTimeToTimestamp'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from './components/ui/card'
import {Separator} from './components/ui/separator'
import {ArrowRightLeft, Calendar} from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">

        {/* Live Timestamp Display - Featured */}
        <div className="mb-8 max-w-6xl mx-auto">
          <LiveTimestamp/>
        </div>

        {/* Main Converters Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Timestamp to DateTime */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <ArrowRightLeft className="h-5 w-5 text-green-600 dark:text-green-400"/>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Timestamp to DateTime
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Convert Unix timestamp to human-readable date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TimestampToDateTime/>
            </CardContent>
          </Card>

          {/* DateTime to Timestamp */}
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400"/>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  DateTime to Timestamp
                </CardTitle>
              </div>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Convert selected date and time to Unix timestamp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DateTimeToTimestamp/>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <Separator className="mb-6"/>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Unix timestamp represents the number of seconds since January 1, 1970 UTC.
            <br/>
            All conversions respect your local timezone settings for accurate results.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
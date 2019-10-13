const Shor = require('./shorModule')

/* HELP PROGRAM & DETAIL */
  
function help () {
  console.log('')
  console.log('CPE393 Quantum - Shor\'s Algorithm Help')
  console.log('')
  console.log('Usage: node ./ [n] [i]')
  console.log('  n -- p x q ; p and q is prime number')
  console.log('  i -- number of process (default: 4)')
  console.log('')
  return 0
}

if (process.argv.length < 3) return help()
if (process.argv[2] === '-h' || process.argv[2] === '--help' || process.argv[2] === 'help' || process.argv[2] === '-H') return help()

console.log('')
console.log('Student: Phumipak Jungpakdee 59070501057')
console.log('')
/* HELP PROGRAM & DETAIL */

/* Datetime Display Function */
const tzoffset = 0 - ((new Date()).getTimezoneOffset() * 60000)
const tzNum = (tzoffset / 3600000)
const tzString = `${tzNum >= 0 ? '+' : '-'}${('00' + tzNum).slice(-2)}:00`
const displayDatetime = (datetime = Date.now()) => {
  const DT = new Date(datetime + tzoffset)
  const iso = DT.toISOString().split('T', 2)
  return `${iso[0]} ${iso[1].slice(0, -1)} ${tzString}`
}
/* Datetime Display Function */

const run = async (N, processA) => {
  console.log(`Shor's Algorithm with N = ${N} (${processA} process)`)
  console.log('')

  const startDatetime = Date.now()
  console.log('Start ', displayDatetime(startDatetime))

  let result = 0
  try {
    result = await Shor(N, processA)
  } catch (error) {
    console.error('Error:', error.message)
  }

  const endDatetime = Date.now()
  console.log('End   ', displayDatetime(endDatetime))

  console.log('')
  console.log('Result of Shor\'s Algorithm')

  if (typeof result === 'number') {
    console.log(`N = ${N}`)
    console.log('')
    console.log('No solution :(')
    console.log('')
    console.log(`Average time spent per processA = ${result.toFixed(2)} ms`)
  } else {
    console.log(`N = ${N}, a = ${result.a}, r = ${result.r}`)
    console.log('')
    console.log('Solution:')
    console.log(`p = ${result.p}`)
    console.log(`q = ${result.q}`)
    console.log('')
    console.log(`Process time spent = ${result.ms} ms`)
  }
  
  const diffMillisecs = endDatetime - startDatetime
  const minute = Math.floor(diffMillisecs / 60000)
  const second = Math.floor((diffMillisecs % 60000) / 1000)
  const millisecond = diffMillisecs % 1000

  console.log('')
  console.log(`All time spent = ${diffMillisecs} ms (${('0' + minute).slice(-2)}:${('0' + second).slice(-2)}.${('00' + millisecond).slice(-3)})`)
  console.log('')
  console.log('')
  return 0
}

// 21, 35, 4559, 50621, 620119, 35100017, 341208619, 2119799177

/* MAIN FUNCTION */
try {
  let processA = 4
  const N = parseInt(process.argv[2])
  if (process.argv[3]) {
    processA = parseInt(process.argv[3])
    if (isNaN(processA)) processA = 4
  }
  if (isNaN(N)) {
    console.error('   Invalid n value')
    return help()
  }
  return run(N, processA)
} catch (error) {
  console.error('Error:', error.message)
  return help()
}
/* MAIN FUNCTION */

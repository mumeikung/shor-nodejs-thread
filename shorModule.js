const { fork } = require('child_process')

const multiShor = (N = 1, thread = 2) => {
  const range = Math.floor(N / thread)

  const process = []
  const result = []
  let count = 0

  return new Promise((resolve, reject) => {

    if (N >= Math.pow(2, 32)) return reject(new Error(`
      Limit N must < 2^32
    `))

    for (let i = 0; i < thread; i++) {
      process[i] = fork('./singleShor.js')
      const start = (i * range) + 1
      const stop = ((i + 1) * range) + 1
      process[i].send({ N: N, start: start, stop: stop })
      process[i].on('message', (message) => {
        if (message.result.success) {
          for (let i = 0 ; i < thread; i ++) process[i].kill()
          return resolve(message.result)
        }
        result[i] = message.result
        count++
        if (count === thread) {
          const success = result.filter(a => a.success)
          let sum = 0
          for (let i = 0 ; i < thread ; i++) {
            process[i].kill()
            sum += result[i].ms
          }
          if (success.length <= 0) resolve(sum / thread)
          return resolve(success.pop())
        }
      })
    }
  })
}

module.exports = multiShor

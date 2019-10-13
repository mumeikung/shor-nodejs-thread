const gcd = (a, b) => {
  let r1 = Math.max(a, b)
  let r2 = Math.min(a, b)
  while (r2 > 0) {
    const mod = r1 % r2
    r1 = r2
    r2 = mod
  }
  return r1
}

const startStep = (base) => {
  const okBit = 52 - base.toString(2).length
  let step = Math.pow(2, okBit)
  while (base < step) step /= 2
  return step
}

const findPeriod = (a, N) => {
  const stepStart = startStep(a)
  let r = 0
  let out = 1
  while (r < 10) {
    r += 2
    for (let i = 0; i < 2; i++) {
      const start = out
      let step = stepStart
      let count = a - 1
      while (count > 0) {
        while (count < step) step /= 2
        out = (out + (start * step)) % N
        count -= step
      }
    }
    if (out === 1) return r
  }
  return -1
}

const findAR = (a, N, stop) => {
  let r = -1
  do {
    a += 1
    if (a >= stop) return null
    if (gcd(a, N) === 1) r = findPeriod(a, N)
  } while (r < 2)
  return [a, r]
}

const findPQ = (a, r, N) => {
  const p = gcd((Math.pow(a, (r / 2)) - 1), N)
  const q = gcd((Math.pow(a, (r / 2)) + 1), N)
  if (p > 1 && q > 1 && p * q === N) return [p, q]
  return null
}

const Shor = (N = 1, start = 1, stop = 1) => {
  const startDatetime = Date.now()
  let ar = [start - 1, 0]
  let pq = null
  do {
    ar = findAR(ar[0] + 1, N, stop)
    if (ar === null) break
    pq = findPQ(ar[0], ar[1], N)
  } while (pq === null)
  const endDatetime = Date.now()
  if (ar === null) {
    return {
      ms: endDatetime - startDatetime,
      success: false
    }
  }
  return {
    a: ar[0],
    r: ar[1],
    N: N,
    p: pq[0],
    q: pq[1],
    ms: endDatetime - startDatetime,
    success: true
  }
}

process.on('message', async (message) => {
  const result = Shor(message.N, message.start, message.stop)
  process.send({ result: result })
})

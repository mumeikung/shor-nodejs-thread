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

const powerMod = (base, pow, mod) => {
  let output = base
  for (let i = (pow % 2 === 0 ? 1 : 0); i < pow; i += 2) output = (output * base * base) % mod
  return output
}

const findPeriod = (a, N) => {
  let r = 2
  let base = Math.pow(a, r) %  N
  while (base !== 1) {
    r += 2
    base = (base * a * a) % N
    if (r > 10) return -1
  }
  if (powerMod(a, r / 2, N) === -1) r = -1
  return r
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

class MersenneTwister {
  static MAX_INT = 4294967296.0
  static N = 624
  static M = 397
  static UPPER_MASK = 0x80000000
  static LOWER_MASK = 0x7fffffff
  static MATRIX_A = 0x9908b0df
  constructor(seed) {
    if (typeof seed !== 'number') {
      seed = new Date().getTime()
    }
    this.mt = new Array(MersenneTwister.N)
    this.mti = MersenneTwister.N + 1
    this.seed(seed)
  }
  seed(seed) {
    this.mt[0] = seed >>> 0
    for (this.mti = 1; this.mti < MersenneTwister.N; ++this.mti) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
      this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti
      this.mt[this.mti] >>>= 0
    }
  }
  rand_int() {
    let y, kk
    const mag01 = new Array(0, MersenneTwister.MATRIX_A)
    if (this.mti >= MersenneTwister.N) {
      if (this.mti === MersenneTwister.N + 1) {
        this.seed(5489)
      }
      for (kk = 0; kk < MersenneTwister.N - MersenneTwister.M; ++kk) {
        y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK)
        this.mt[kk] = this.mt[kk + MersenneTwister.M] ^ (y >>> 1) ^ mag01[y & 1]
      }
      for (; kk < MersenneTwister.N - 1; kk++) {
        y = (this.mt[kk] & MersenneTwister.UPPER_MASK) | (this.mt[kk + 1] & MersenneTwister.LOWER_MASK)
        this.mt[kk] = this.mt[kk + (MersenneTwister.M - MersenneTwister.N)] ^ (y >>> 1) ^ mag01[y & 1]
      }
      y = (this.mt[MersenneTwister.N - 1] & MersenneTwister.UPPER_MASK) | (this.mt[0] & MersenneTwister.LOWER_MASK)
      this.mt[MersenneTwister.N - 1] = this.mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ mag01[y & 1]
      this.mti = 0
    }
    y = this.mt[this.mti++]
    y ^= (y >>> 11)
    y ^= (y << 7) & 0x9d2c5680
    y ^= (y << 15) & 0xefc60000
    y ^= (y >>> 18)
    return y >>> 0
  }
  rand_int31() {
    return this.rand_int() >>> 1
  }
  random() {
    return this.rand_int() * (1.0 / MersenneTwister.MAX_INT)
  }
  rndHiRes = function () {
    const a = this.rand_int() >>> 5
    const b = this.rand_int() >>> 6
    return (a * 67108864.0 + b) * (1.0 / Number.MAX_SAFE_INTEGER)
  }
}

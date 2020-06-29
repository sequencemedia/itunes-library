import os from 'os'
import path from 'path'

const normalise = (p) => path.resolve(p.trim().replace(/^~/, os.homedir))

export default normalise

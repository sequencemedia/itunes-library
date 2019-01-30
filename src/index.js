import debug from 'debug'

const log = debug('itunes-library:log')

export const initialise = () => { }

export const hasChanges = ({
  size,
  atimeMs,
  mtimeMs,
  ctimeMs
},
statsMap = new Map()
) => (
  size !== statsMap.get('size') ||
  atimeMs !== statsMap.get('atimeMs') ||
  mtimeMs !== statsMap.get('mtimeMs') ||
  ctimeMs !== statsMap.get('ctimeMs')
)

export const putChanges = (stats, statsMap) => {
  Object
    .entries(stats)
    .forEach(([ key, value ]) => {
      if (statsMap.get(key) !== value) {
        statsMap.set(key, value)

        log(key, value)
      }
    })

  log(statsMap)
}

export * as library from './library'

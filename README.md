# @sequencemedia/itunes-library

Parses an `iTunes Library.xml` file and transforms it to [`m3u`](https://en.wikipedia.org/wiki/M3U) files, JSON, or JavaScript.

The command line app can watch for changes to an `iTunes Library.xml` file and write `m3u` files to a destination directory.

Or, the component functions can be imported into your own application. 

This packages implements [`@sequencemedia/itunes-library-parser`](https://github.com/sequencemedia/itunes-library-parser).

Requires [Java](https://www.oracle.com/java/technologies/javase-downloads.html) and [Saxon PE](https://www.saxonica.com/welcome/welcome.xml).

## Command line app

```
npm run start -- --jar "/usr/local/bin/saxon/SaxonPE10-0J/saxon-pe-10.0.jar" --xml "~/Music/iTunes/iTunes Library.xml" --destination "~/Documents/iTunes Library"
```

Paths will differ on your device.

## Library

Transforms the entire library.

```javascript
const { toM3U } = require('./lib/library')
const {
  toJSON,
  toJS,
  toES
 } = require('./lib/library/transform')
```

### `toM3U`

Requires the arguments `jar`, `xml`, and `destination`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the `iTunes Library.xml` file
- `destination` - the path for the `m3u` files to be written

Returns a `Promise` resolving when all `m3u` files are written.

### `toJSON`

Requires the arguments `jar`, and `xml`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the `iTunes Library.xml` file

Returns a `Promise` resolving to a `JSON` string.

### `toJS`

Requires the arguments `jar`, and `xml`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the `iTunes Library.xml` file

Returns a `Promise` resolving to a JavaScript object.

### `toES`

Requires the arguments `jar`, and `xml`.

- `jar` - the path to the Saxon binary on your device
- `xml` - the path to the `iTunes Library.xml` file

Returns a `Promise` resolving to a collection of JavaScript `Map` and `Set` instances.

## Playlists

Transforms the playlists.

```javascript
const { toM3U } = require('./lib/library/playlists')
const {
  toJSON,
  toJS,
  toES
 } = require('./lib/library/playlists/transform')
```

See **Library**.

## Tracks

Transforms the tracks.

```javascript
const { toM3U } = require('./lib/library/tracks')
const {
  toJSON,
  toJS,
  toES
 } = require('./lib/library/tracks/transform')
```

See **Library**.

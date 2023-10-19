# Changelog

All notable changes to this project will be documented in this file.

## 4.0.0 - 2023-10-19
### Changed
- Changed the library's name.

---

## 3.1.0 - 2023-09-22
### Added
- `preppendTo()` and `appendAfter()`.

### Fixed
- Fixed an error with `setVolume()`, when passing 1 it would actually go full.
- Moving the element around the dom would cause the element and events listener to be set multiple times.
- Read only property `.isEnded` turns true when the reproduction is over.

---

## 3.0.0 - 2023-09-10
### Changed
- Implemented the new version of the interface.

---

## 2.0.0 - 2019-07-27
### Changed

- Changes made in compliance to the new version 2.0.0 of the [interface](https://github.com/adinan-cenci/js-multimedia-player-interface).
- Callbacks replaced with events.

### Added
- The interface now features "addEventListener" and "removeEventListener" methods.
- Added the events: "play", "pause", "ended", "timeupdate", "waiting", "playing" and "error".

### Removed
- Removed callbacks: "onPlay", "onPause", "onEnded", "onTimeupdate", "onWaiting", "onPlaying" and "onError".
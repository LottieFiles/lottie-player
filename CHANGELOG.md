# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), enforced with [semantic-release](https://github.com/semantic-release/semantic-release).

## 1.5.4

- Fix focus with a css outline on button
- Fix tabindex when you have multiple animation on the same page
- Hide svg element from focus list
- Add a way to hide the slider for some animation
- add role to div container to prevent lighthouse warnings

## 1.5.3

### Bug Fixes

- Missing tgs player.js file added

## 1.5.2

### Bug Fixes

- Lang tag added, tests added to test for breakage of interactivity library.

## 1.5.1

### Bug Fixes

- **web-worker:** fixed web worker prop to work correctly with proper bundling adjustments.

## 1.5.0

### Bug Fixes

- **web-worker:** added web worker prop.

## 1.4.5

### Bug Fixes

- **loop:** loop counter started at zero. changed to 1 instead.

## 1.4.4

### Bug Fixes

- **resize:** fixed width and height responsiveness issues

## 1.4.3

### Bug Fixes

- **safari:** fixed safari glitching animation issue (used flex for controls placement instead of grid system)

## 1.4.2

### Bug Fixes

- **code:** fixed typescript errors with type assertions and restructuring of code

## 1.4.1

### Bug Fixes

- **code:** fixed typescript errors with type assertions and restructuring of code
- **container:** added width and height inheritence to animation container

## 1.4.0

### Features

- **event listeners:** added event listeners before json error check
- **cleanup:** added a destroy method for cleanup of dom

## 1.3.1

### Chore

- **rollback:** rollback previous changes

## 1.3.0

### Bug Fixes

- **network call fix:** attempt to fix dual network call

## [1.2.1](https://github.com/LottieFiles/lottie-player/compare/v1.2.0...v1.2.1) (2021-09-30)

### Bug Fixes

- **safari fix:** safari height width inherit to container, eslint error fixes ([8c96be5](https://github.com/LottieFiles/lottie-player/commit/8c96be586d3128833d264f2c75511b4d03e95289))

# [1.2.0](https://github.com/LottieFiles/lottie-player/compare/v1.1.4...v1.2.0) (2021-09-21)

### Features

- **events and cleanup:** added event listeners before json error check and added a destroy method for cleanup ([646d63b](https://github.com/LottieFiles/lottie-player/commit/646d63b14e89a2c0079ddc9224fc8d8e97d84806))

## [1.1.4](https://github.com/LottieFiles/lottie-player/compare/v1.1.3...v1.1.4) (2021-09-02)

### Bug Fixes

- **rollback:** rollback due to race condition issues ([556307f](https://github.com/LottieFiles/lottie-player/commit/556307fc57a807c03ad1b3639c3e464d73cd87be))

## [1.1.3](https://github.com/LottieFiles/lottie-player/compare/v1.1.2...v1.1.3) (2021-09-02)

### Bug Fixes

- **asset path bug fix:** asset path bug fix ([27d24e7](https://github.com/LottieFiles/lottie-player/commit/27d24e731b7203f849171657eae190bf55d59be8))

## [1.1.2](https://github.com/LottieFiles/lottie-player/compare/v1.1.1...v1.1.2) (2021-09-01)

### Bug Fixes

- **cleanup:** cleanup ([339c0cb](https://github.com/LottieFiles/lottie-player/commit/339c0cb9396a6a0e5b5264769ac8d7b6498d163c))
- **network calls:** removed redundant network call to json url ([8726536](https://github.com/LottieFiles/lottie-player/commit/8726536f12403694e5213c70189d877cc9fdec6a))

## [1.1.1](https://github.com/LottieFiles/lottie-player/compare/v1.1.0...v1.1.1) (2021-07-06)

### Bug Fixes

- **player.ts:** race condition bug fix ([3a57dba](https://github.com/LottieFiles/lottie-player/commit/3a57dba10c043ec9549dc790e6a83398b0253094))

# [1.1.0](https://github.com/LottieFiles/lottie-player/compare/v1.0.0...v1.1.0) (2021-07-05)

### Bug Fixes

- **duplicate method:** duplicate method bug fix ([7b09f39](https://github.com/LottieFiles/lottie-player/commit/7b09f39d32211575257f873b0219809639a4a1ae))

### Features

- **err handling:** err handling ([8ac685f](https://github.com/LottieFiles/lottie-player/commit/8ac685f0f9ca33bc1e36593edec16080a6197aa9))

# 1.0.0 (2021-06-22)

### Bug Fixes

- **player.tsx:** race condition fix ([9ec58ef](https://github.com/LottieFiles/lottie-player/commit/9ec58ef4a7ac185a20fc93203fb2409e05178223))

### Features

- **accessibility:** added aria labels, and roles needed for voiceover tools,added keyboard ctrls ([1a76011](https://github.com/LottieFiles/lottie-player/commit/1a76011a2e908437f25ef9057307bf1bf9431461))
- added basic sanity checks/tests ([e6ebe61](https://github.com/LottieFiles/lottie-player/commit/e6ebe616665000ce57e995e242bfee0435e8e71f))
- added lerna, sample project using local dependency ([59d0bc0](https://github.com/LottieFiles/lottie-player/commit/59d0bc0f4cb94cd565cd590563c41673b9e43ed9))
- fix tests, add sample lottie ([823a104](https://github.com/LottieFiles/lottie-player/commit/823a104094e49e34fb2f851a9ad6d34aebc5d9bf))
- **package bump:** lottie web version bump ([71d5339](https://github.com/LottieFiles/lottie-player/commit/71d53399c291b2af30fd7abfad7e35a90efef9d9))
- **packages:** lottie web engine bump to 5.7.8 ([f4e1a94](https://github.com/LottieFiles/lottie-player/commit/f4e1a94b61e034aeeb91bb2d4c6f339cb8b16647))

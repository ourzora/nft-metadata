# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Removing dep on pinata gateway tools and cleaning up ipfs handling code

## [1.2.3]  - 2021-02-07
- Fix timeout in example code
- Add correct ERC1155 padding for tokenId field

## [1.1.0] - 2021-11-12
- Add multichain support
- Add ens support
- Add ability for user to pass in arbitrary JsonRpcProvider

## [1.0.1] - 2021-10-25
### Fixes
- Exports `NftMetadata` interface from agent file

## [0.0.19] - 2021-10-25
### Added
- Retries and backoff to fetching code
- First public release
- Looser parsing of data-uris to account for projects that don't properly encode uris
- Handling of blitnauts
- Updating imports and adding documentation for basic usage

# mini_packages

monorepo for packages created by minimize

### Release process

- Run `yarn build` in root folder and commit all changes to master.
- Run `lerna version` in root folder and select appropriate version upgrade.
- Commit the changed files with new package versions.
- Run `yarn release` in root folder.

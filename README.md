# mini_packages

monorepo for packages created by minimize

### Release process

Run all the following commands in the root folder.

- Run `yarn test` and make sure all test are passing.
- Run `yarn lint` and make sure to fix all problems.
- Run `yarn build` and commit all changes to master.
- Run `lerna version` and select appropriate version upgrade.
- Commit the changed files with new package versions.
- Run `yarn release`.

import failOnConsole from 'vitest-fail-on-console';

// force tests to fail if there are any console warnings/errors
failOnConsole({
  shouldFailOnError: true,
  shouldFailOnWarn: true,
});

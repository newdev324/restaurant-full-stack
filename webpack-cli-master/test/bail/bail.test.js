'use strict';

const { run, runWatch } = require('../utils/test-utils');

describe('bail and watch warning', () => {
    it('should not log warning in not watch mode', async () => {
        const { exitCode, stderr, stdout } = await run(__dirname, ['-c', 'bail-webpack.config.js']);

        expect(exitCode).toEqual(0);
        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();
    });

    it('should not log warning in not watch mode without the "bail" option', async () => {
        const { exitCode, stderr, stdout } = await run(__dirname, ['-c', 'no-bail-webpack.config.js']);

        expect(exitCode).toEqual(0);
        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();
    });

    it('should not log warning in not watch mode without the "watch" option', async () => {
        const { stderr, stdout } = await runWatch(__dirname, ['-c', 'watch-webpack.config.js']);

        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();
    });

    it('should not log warning without the "bail" option', async () => {
        const { stderr, stdout } = await runWatch(__dirname, ['-c', 'no-bail-webpack.config.js', '--watch']);

        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();
    });

    it('should not log warning without the "bail" option', async () => {
        const { stderr, stdout } = await runWatch(__dirname, ['-c', 'no-bail-webpack.config.js', '--watch']);

        expect(stderr).toBeFalsy();
        expect(stdout).toBeTruthy();
    });

    it('should log warning in watch mode', async () => {
        const { stderr, stdout } = await runWatch(__dirname, ['-c', 'bail-webpack.config.js', '--watch']);

        expect(stderr).toContain(`You are using "bail" with "watch". "bail" will still exit webpack when the first error is found.`);
        expect(stdout).toBeTruthy();
    });

    it('should log warning in watch mode', async () => {
        const { stderr, stdout } = await runWatch(__dirname, ['-c', 'bail-and-watch-webpack.config.js']);

        expect(stderr).toContain(`You are using "bail" with "watch". "bail" will still exit webpack when the first error is found.`);
        expect(stdout).toBeTruthy();
    });

    it('should log warning in case of multiple compilers', async () => {
        const { stderr, stdout } = await runWatch(__dirname, ['-c', 'multi-webpack.config.js'], true);

        expect(stderr).toContain(`You are using "bail" with "watch". "bail" will still exit webpack when the first error is found.`);
        expect(stdout).toBeTruthy();
    });
});

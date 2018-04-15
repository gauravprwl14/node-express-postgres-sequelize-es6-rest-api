import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import * as isparta from 'isparta';

const plugins = gulpLoadPlugins();

const paths = {
    js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
    nonJs: ['./package.json', './.gitignore', './.env'],
    tests: './server/tests/*.js',
};

const options = {
    codeCoverage: {
        reporters: ['lcov', 'text-summary'],
        thresholds: {
            global: {
                statements: 50,
                branches: 50,
                functions: 50,
                lines: 50,
            },
        },
    },
};

// Clean up dist and coverage directory
gulp.task('clean', () => del.sync(['dist/**', 'dist/.*', 'coverage/**', '!dist', '!coverage']));

// Copy non-js files to dist
gulp.task('copy', () =>
    gulp
        .src(paths.nonJs)
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist')));

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
    gulp
        .src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            },
        }))
        .pipe(gulp.dest('dist')));

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
    plugins.nodemon({
        script: path.join('dist', 'index.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: ['copy', 'babel'],
    }));

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
    runSequence(['copy', 'babel']);
});

// clean dist, compile js files, copy non-js files and execute tests
gulp.task('mocha', ['clean'], () => {
    runSequence(['copy', 'babel'], 'test');
});

// Set env variables
gulp.task('set-env', () => {
    plugins.env({
        vars: {
            NODE_ENV: 'test',
        },
    });
});

// covers files for code coverage
gulp.task('pre-test', () =>
    gulp
        .src([...paths.js, '!gulpfile.babel.js'])
        // Covering files
        .pipe(plugins.istanbul({
            instrumenter: isparta.Instrumenter,
            includeUntested: true,
        }))
        // Force `require` to return covered files
        .pipe(plugins.istanbul.hookRequire()));

// triggers mocha test with code coverage
gulp.task('test', ['pre-test', 'set-env'], () => {
    let reporters;
    let exitCode = 0;

    if (plugins.util.env['code-coverage-reporter']) {
        reporters = [...options.codeCoverage.reporters, plugins.util.env['code-coverage-reporter']];
    } else {
        reporters = options.codeCoverage.reporters;
    }

    return (
        gulp
            .src([paths.tests], { read: false })
            .pipe(plugins.plumber())
            .pipe(plugins.mocha({
                reporter: 'spec',
                ui: 'bdd',
                timeout: 2000,
                compilers: 'js:babel-core/register',
                exit: true,
            }))
            .once('error', (err) => {
                plugins.util.log(err);
                exitCode = 1;
            })
            // Creating the reports after execution of test cases
            .pipe(plugins.istanbul.writeReports({
                dir: './coverage',
                reporters,
            }))
            // Enforce test coverage
            .pipe(plugins.istanbul.enforceThresholds({
                thresholds: options.codeCoverage.thresholds,
            }))
            .on('end', () => {
                plugins.util.log('completed !!');
                process.exit(exitCode);
            })
    );
});

import babel from 'rollup-plugin-babel';

export default {
	entry: 'src/main.js',
    dest: 'bundle.js',
	format: 'iife',
	plugins: [
        babel({
            exclude: 'node_modules/**',
            presets: ["es2015-rollup"]
        })
    ]
};

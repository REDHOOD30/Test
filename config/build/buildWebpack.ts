import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {buildLoaders} from "./buildLoaders";
import {buildPlugins} from "./buildPlugins";
import {buildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options;
    const isDev = mode === 'development';

    return {
        mode: options.mode ?? 'development',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : false,
        devServer: isDev? buildDevServer(options) : undefined,
    }
}
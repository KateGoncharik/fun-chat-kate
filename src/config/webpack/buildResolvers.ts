import type { ResolveOptions } from "webpack";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const buildResolvers = (): ResolveOptions => ({
  extensions: [".tsx", ".ts", ".jsx", ".svg", ".js", "..."],
  plugins: [new TSConfigPathsPlugin()],
});

export default buildResolvers;

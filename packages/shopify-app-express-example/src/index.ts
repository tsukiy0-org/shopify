import "source-map-support/register";
import { App } from "./App";
import { APIGatewayProxyHandler } from "aws-lambda";
import { ExpressLambdaRuntime } from "@tsukiy0/extensions-aws";

const runtime = new ExpressLambdaRuntime(App.build());

export const handler: APIGatewayProxyHandler = runtime.handler;

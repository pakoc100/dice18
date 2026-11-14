/// <reference lib="webworker" />

import { BruteForceResult, Die } from './typings';

interface CalculationRequest {
  target: number;
  inputs: Die[];
}

addEventListener('message', ({ data }: MessageEvent<CalculationRequest>) => {
  postMessage(new BruteForceResult(data.target, data.inputs));
});

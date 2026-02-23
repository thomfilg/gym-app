import { writeFile } from 'fs/promises';
import * as v8 from 'v8';

import { formatDateForPostgres } from '../../utils';
import { logger } from '../../utils/lib/logger';

interface MemorySample {
  ts: string;
  label: string;
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
}

const snapshots: MemorySample[] = [];

export function logMemory(label: string) {
  const m = process.memoryUsage();
  const sample: MemorySample = {
    ts: formatDateForPostgres(new Date()) as string,
    label,
    rss: m.rss,
    heapTotal: m.heapTotal,
    heapUsed: m.heapUsed,
    external: m.external,
    arrayBuffers: m.arrayBuffers || 0,
  };
  snapshots.push(sample);
  const mb = (n: number) => `${(n / 1024 / 1024).toFixed(1)}MB`;
  logger.info(`MEMORY ${label}: rss=${mb(sample.rss)} heapUsed=${mb(sample.heapUsed)} heapTotal=${mb(sample.heapTotal)} external=${mb(sample.external)} arrBuf=${mb(sample.arrayBuffers)}`);
}

// Optional heap snapshot (Node >= 18 has v8.writeHeapSnapshot or use inspector)
export async function writeHeapSnapshot(label: string) {
  if (!process.env.WRITE_HEAP_SNAPSHOTS) {
    return;
  }
  try {
    if (typeof v8.writeHeapSnapshot === 'function') {
      const file = v8.writeHeapSnapshot();
      logger.info(`Heap snapshot written (${label}): ${file}`);
    } else {
      // Fallback using inspector protocol
      const inspector = await import('inspector');
      const session = new inspector.Session();
      session.connect();
      const file = `heap-${Date.now()}-${label}.heapsnapshot`;
      await new Promise<void>((resolve, reject) => {
        session.post('HeapProfiler.enable', () => {
          session.post('HeapProfiler.takeHeapSnapshot', { reportProgress: false }, (err: unknown) => {
            if (err) return reject(err);
            session.post('HeapProfiler.disable');
            resolve();
          });
        });
      });
      // Node doesn't give direct file path; user can collect via inspector if needed
      logger.info(`Heap snapshot captured via inspector (${label}): ${file}`);
    }
  } catch (e) {
    logger.error(`Failed heap snapshot (${label})`, e);
  }
}

export async function flushMemoryLog(file = 'memory-samples.json') {
  try {
    await writeFile(file, JSON.stringify(snapshots, null, 2), 'utf8');
    logger.info(`Memory samples written to ${file}`);
  } catch (e) {
    logger.error('Failed to write memory samples', e);
  }
}

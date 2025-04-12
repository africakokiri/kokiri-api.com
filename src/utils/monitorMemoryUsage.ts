export const monitorMemoryUsage = async <T>(
  method: string,
  endpoint: string,
  handler: () => Promise<T>
): Promise<T> => {
  if (process.env.PRODUCTION === "true") {
    return await handler();
  }

  // 시작 시점 기록
  const startTime = performance.now();

  // 시작 시점의 메모리 사용량 즉시 측정
  const startMemory = process.memoryUsage().heapUsed;
  const memoryUsages: number[] = [startMemory];

  // 주기적 측정 설정
  const interval = setInterval(() => {
    memoryUsages.push(process.memoryUsage().heapUsed);
  }, 10); // 더 짧은 간격(10ms)으로 측정

  try {
    const result = await handler();
    clearInterval(interval);

    // 종료 시점의 메모리 사용량 추가 측정
    const endMemory = process.memoryUsage().heapUsed;
    memoryUsages.push(endMemory);

    // 종료 시점 기록 및 응답 시간 계산
    const endTime = performance.now();
    const responseTime = Math.round((endTime - startTime) * 100) / 100;

    // 배열이 비어있지 않도록 보장
    if (memoryUsages.length < 2) {
      memoryUsages.push(endMemory); // 최소 2개의 측정값 보장
    }

    const maxMemoryUsage = Math.max(...memoryUsages);
    const minMemoryUsage = Math.min(...memoryUsages);
    const memoryUsed =
      Math.round(((maxMemoryUsage - minMemoryUsage) / 1024 / 1024) * 100) /
      100;

    console.table({
      Method: method,
      Endpoint: endpoint,
      "Response Time": `${responseTime}ms`,
      "Peak Memory Usage": `${memoryUsed}MB`,
      "Total Heap": `${Math.round((maxMemoryUsage / 1024 / 1024) * 100) / 100}MB`
    });

    return result;
  } catch (error) {
    clearInterval(interval);
    throw error;
  }
};

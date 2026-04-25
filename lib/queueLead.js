const leadQueue = [];

export function enqueueLead(data) {
  leadQueue.push(data);
}

export function getQueuedLeads() {
  return leadQueue;
}

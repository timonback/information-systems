var QueueIterator = function(pQueue) {
    this.size = pQueue._newestIndex;
    this.values = pQueue._storage;
    this.current = pQueue._oldestIndex;
}

QueueIterator.prototype.hasNext = function() {
    // Returns whether there are any more elements to traverse in the Queue
    return this.current != this.size;
}

QueueIterator.prototype.next = function() {
    // If the current pointer location is same as the size of Queue, return undefined
    if (this.current == this.size)      return undefined;

    // Returns the data object stored on queue, and increment the counter
    return this.values[this.current++];
}

module.exports = QueueIterator;

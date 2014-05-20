goog.provide('hash5.parsing.ComplexTag');

// inices starts behind the hashtag + assign symbol
// example: "#start:asdf" --> {key: "start", value: "asdf", indices: [7 ,11]}

/** @typedef {{key: string, value: string, indices: [number, number]}} */
hash5.parsing.ComplexTag;
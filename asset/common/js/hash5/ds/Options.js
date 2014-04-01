goog.provide('hash5.ds.Options');
goog.provide('hash5.ds.DefaultOptions');
goog.provide('hash5.ds.options.SortField');
goog.provide('hash5.ds.options.SortOrder');

/**
 * @typedef { {
 *          sort: (hash5.ds.options.SortField | string | undefined),
 *          order: (hash5.ds.options.SortOrder | undefined),
 *          skip: (number | undefined),
 *          limit: (number | undefined)
 *          } }
 */
hash5.ds.Options;

/**
 * @type {hash5.ds.Options}
 */
hash5.ds.DefaultOptions = {
    limit: 20
};

/**
 * @enum {string}
 */
hash5.ds.options.SortField = {
    TEXT: 'text',
    CREATED_DATE: 'created_date'
};


/**
 * @enum {number}
 */
hash5.ds.options.SortOrder = {
    ASC: 1,
    DESC: -1
};

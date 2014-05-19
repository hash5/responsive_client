goog.provide('hash5.module.initData');
goog.provide('hash5.module.initData_en');
goog.provide('hash5.module.initData_de');


hash5.module.initData_en = {
    'searchtree': [
        {
            "title": "Group",
            "type": "folder",
            "children": [
                {
                    "title": "#todo",
                    "type": "request",
                    "query": "/entries?query=#todo"
                }
            ]
        },
        {
            "title": "#intro",
            "type": "request",
            "query": "/entries?query=#intro"
        }
    ],
    'entries': [
        'Use hashtags to sort your Entries #intro',
        'Do you want to remove all example entries? --> Create a new column with the search for #intro and select "Delete all entries."'
    ],
    'open-lists': [
        '#intro', '#todo'
    ]
};

hash5.module.initData_de = {
    'searchtree': [
        {
            "title": "Gruppierung",
            "type": "folder",
            "children": [
                {
                    "title": "#todo",
                    "type": "request",
                    "query": "/entries?query=#todo"
                }
            ]
        },
        {
            "title": "#intro",
            "type": "request",
            "query": "/entries?query=#intro"
        }
    ],
    'entries': [
        'Mit hashtags können Einträge sortiert werden #intro.',
        'Der Hashtag #todo könnte so zum Beispiel alle zu erledigende Aufgaben grupieren #intro.',
        'Du möchtest alle Beispieleinträge löschen? -> Erstelle eine neue Spalte mit der Suche nach #intro und wähle "Alle Einträge löschen."'
    ],
    'open-lists': [
        '#intro', '#todo'
    ]
};

/**
 * example entries and searchtree entries
 * @type {Object}
 */
hash5.module.initData = hash5.module.initData_en;

if (goog.LOCALE == 'de') {
  hash5.module.initData = hash5.module.initData_de;
}
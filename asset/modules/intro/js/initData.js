goog.provide('hash5.module.intro.initData');
goog.provide('hash5.module.intro.initData_en');
goog.provide('hash5.module.intro.initData_de');

goog.require('hash5.module.intro.Tooltip.Direction');

hash5.module.intro.initData_en = {
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
        'You can use the hashtag #todo to mark all your todo-items for example. #intor',
        'Do you want to remove all example entries? --> Create a new column with the search for #intro and select "Delete all entries."',
        '#work #todo some work task',
        '#private private information'
    ],
    'open-lists': [
        '#intro', '#todo'
    ],
    'intro-tour': [
        {
            selector: '.entry-list-container',
            body: 'Entrylists are used to diplay one kind of entries.<br /> This column displays your latest entries.',
            direction: hash5.module.intro.Tooltip.Direction.NONE,
            waitForClick: false
        },
        {
            selector: '.page-header .icon-add',
            body: 'Click here to add a new entry.',
            direction: hash5.module.intro.Tooltip.Direction.TOP,
            waitForClick: true
        },
        {
            selector: '.entry-editor-body',
            body: 'Insert some text for your new entry.',
            direction: hash5.module.intro.Tooltip.Direction.TOP,
            waitForClick: false
        },
        {
            selector: '.module-bottom-holder',
            body: 'Might want to add some more hashtags?',
            direction: hash5.module.intro.Tooltip.Direction.BOTTOM,
            waitForClick: true
        },
        {
            selector: '.helper-tile-btns',
            body: 'Use the helpers to specify your informations.',
            direction: hash5.module.intro.Tooltip.Direction.RIGHT,
            waitForClick: true
        },
        {
            selector: '.saved-info',
            body: 'All changes are saved automatically while you are editing.',
            direction: hash5.module.intro.Tooltip.Direction.RIGHT,
            waitForClick: false
        },
        {
            selector: '.save-btn',
            body: 'Finish the editing and close the editor.',
            direction: hash5.module.intro.Tooltip.Direction.BOTTOM,
            waitForClick: true
        },
        {
            selector: '.search-box',
            body: 'Use the search to find your entries and to create new columns.',
            direction: hash5.module.intro.Tooltip.Direction.TOP,
            waitForClick: true
        }
    ]
};

hash5.module.intro.initData_de = {
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
    ],
    'intro-tour': hash5.module.intro.initData_en['intro-tour'] // TODO translate
};

/**
 * example entries and searchtree entries
 * @type {Object}
 */
hash5.module.intro.initData = hash5.module.intro.initData_en;

if (goog.LOCALE == 'de') {
  hash5.module.intro.initData = hash5.module.intro.initData_de;
}
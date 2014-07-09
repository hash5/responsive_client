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
                },
                {
                    "title": "#private",
                    "type": "request",
                    "query": "/entries?query=#private"
                }
            ]
        },
        {
            "title": "#demo",
            "type": "request",
            "query": "/entries?query=#demo"
        },
        {
            "title": "#work",
            "type": "request",
            "query": "/entries?query=#work"
        }
    ],
    'entries': [
        'Use hashtags to group your entries #demo',
        'Do you want to link a date for your #work? Try to use this: #start:"5.7.2014 9:30" #end:10:30 #demo',
        'Some #private information #demo',
        'Do you want to remove all example entries? --> Create a new column with the search for #demo and select "Delete all entries." #demo',
        'Mark your #private #todo tasks to separate them... #demo',
        'Try to finish your #important tasks first! #todo #demo',
        'Use colors in hashtags, like #blue, to customize your entries. #demo',
        'Click on hashtags to open a new list with entries tagged with this tag: #demo',
        '#work #todo some work task #demo',
        'Use #hashtags to group your entries. You can use the hashtag #todo to mark all your todo-items for example. #demo'
    ],
    'open-lists': [
        '#todo', '#todo #important', '#work'
    ],
    'intro-tour': [
        {
            selector: '.entry-list-container',
            body: 'Entrylists are used to display one kind of entries.<br /> This column displays your latest entries.',
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
            body: 'Use the searchfield to find your entries and to create new columns.',
            direction: hash5.module.intro.Tooltip.Direction.TOP,
            waitForClick: true
        },
        {
            selector: '#searchtree',
            body: 'Save your search queries to access them quickly.',
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
                },
                {
                    "title": "#private",
                    "type": "request",
                    "query": "/entries?query=#private"
                }
            ]
        },
        {
            "title": "#demo",
            "type": "request",
            "query": "/entries?query=#demo"
        },
        {
            "title": "#work",
            "type": "request",
            "query": "/entries?query=#work"
        }
    ],
    'entries': [
        'Mit Hashtags können Einträge sortiert werden #demo.',
        'Möchtest du einen Termin für deine #work Aufgaben speichern? Versuche das: #start:"5.7.2014 9:30" #end:10:30 #demo',
        '#private Informationen #demo',
        'Du möchtest alle Beispieleinträge löschen? -> Erstelle eine neue Spalte mit der Suche nach #demo und wähle "Alle Einträge löschen." #demo',
        'Markiere deine #private #todo Aufgaben um sie zu trennen... #demo',
        'Benutze Farben, wie #blau beispielsweise, in einem Hashtag um Einträge hervorzuheben #demo',
        'Klicke auf einen Hashtag um eine neue Liste mit allen Einträgen mit diesem Tag zu finden: #demo',
        '#work #todo ein Aufgabe für die Arbeit #demo',
        'Benutze #hashtags um Einträge zu sortieren. Der Hashtag #todo könnte so zum Beispiel alle zu erledigende Aufgaben grupieren #demo.'
    ],
    'open-lists': [
        '#todo', '#todo #important', '#work'
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
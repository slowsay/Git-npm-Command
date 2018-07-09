{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc", "closure"]
    },
    "source": {
        "include": ["./alpha/src"],
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "opts": {
        "destination": "./out/",
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
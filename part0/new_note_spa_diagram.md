sequenceDiagram
participant browser
participant server

    Note over browser,server: SPA note submission

    browser->>browser: Create new note and add to notes array (notes.push(note))

    browser->>browser: Render updated note list in DOM

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: The browser updates the UI locally with the new note before sending it to the server for storage.

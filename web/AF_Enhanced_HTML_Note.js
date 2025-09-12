// File: web/AF_Enhanced_HTML_Note.js

import { app } from "../../scripts/app.js";

// Define inline CSS styles
const AF_HTML_NOTE_STYLES = `
    .af-html-note-widget {
        background: var(--comfy-menu-bg, #2a2a2a);
        border: 1px solid var(--border-color, #555);
        /* border-radius: 6px; */
        padding: 16px;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        line-height: 1.6;
        color: var(--input-text, #ffffff);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        min-height: 100px;
        word-wrap: break-word;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        cursor: text;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        pointer-events: auto;
    }

    .af-html-note-widget:hover {
        background: var(--comfy-menu-bg-hover, #333);
        border-color: var(--border-color-hover, #777);
    }

    .af-html-note-editor {
        background: var(--comfy-menu-bg, #2a2a2a);
        border: 1px solid var(--border-color, #555);
        /* border-radius: 6px; */
        padding: 16px;
        margin: 0;
        font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
        line-height: 1.4;
        color: var(--input-text, #ffffff);
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        resize: none;
        outline: none;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 14px;
        display: none;
    }

    .af-html-note-editor:focus {
        border-color: var(--border-color-focus, #0078d4);
    }

    /* When in edit mode, hide the display and show the editor */
    .af-html-note-container.edit-mode .af-html-note-widget {
        display: none !important;
    }

    .af-html-note-container.edit-mode .af-html-note-editor {
        display: block !important;
    }

    /* When not in edit mode, show display and hide editor */
    .af-html-note-container:not(.edit-mode) .af-html-note-widget {
        display: block !important;
    }

    .af-html-note-container:not(.edit-mode) .af-html-note-editor {
        display: none !important;
    }

    .af-html-note-widget h1, .af-html-note-widget h2, .af-html-note-widget h3, 
    .af-html-note-widget h4, .af-html-note-widget h5, .af-html-note-widget h6 {
        margin-top: 0;
        margin-bottom: 12px;
        font-weight: 600;
    }

    .af-html-note-widget h1 { font-size: 1.5em; }
    .af-html-note-widget h2 { font-size: 1.3em; }
    .af-html-note-widget h3 { font-size: 1.1em; }

    .af-html-note-widget .af-section {
        padding: 12px 16px;
        margin: 8px 0;
        border-radius: 6px;
        border-left: 4px solid;
    }

    .af-html-note-widget .af-section.af-positive {
        background: rgba(144, 238, 144, 0.1);
        border-left-color: #90EE90;
    }

    .af-html-note-widget .af-section.af-negative {
        background: rgba(255, 107, 107, 0.1);
        border-left-color: #FF6B6B;
    }

    .af-html-note-widget .af-section.af-neutral {
        background: rgba(224, 224, 224, 0.1);
        border-left-color: #E0E0E0;
    }

    .af-html-note-widget .af-section.af-info {
        background: rgba(135, 206, 235, 0.1);
        border-left-color: #87CEEB;
    }

    .af-html-note-widget .af-section.af-warning {
        background: rgba(255, 215, 0, 0.1);
        border-left-color: #FFD700;
    }

    .af-html-note-widget .af-section.af-custom {
        background: rgba(186, 85, 211, 0.1);
        border-left-color: #BA55D3;
    }

    .af-html-note-widget .af-spacer { height: 16px; margin: 8px 0; }
    .af-html-note-widget .af-spacer-small { height: 8px; margin: 4px 0; }
    .af-html-note-widget .af-spacer-large { height: 32px; margin: 16px 0; }
    .af-html-note-widget .af-spacer-xl { height: 48px; margin: 24px 0; }

    .af-html-note-widget a {
        color: #58a6ff;
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .af-html-note-widget a:hover {
        color: #79c0ff;
        text-decoration: underline;
    }

    .af-html-note-widget code {
        background: rgba(0,0,0,0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
        font-size: 0.9em;
        color: #f0f6fc;
    }

    .af-html-note-widget pre {
        background: rgba(0,0,0,0.4);
        border: 1px solid #444;
        border-radius: 6px;
        padding: 12px;
        margin: 16px 0;
        overflow-x: auto;
    }

    .af-html-note-widget pre code {
        background: transparent;
        padding: 0;
    }

    .af-html-note-widget ul, .af-html-note-widget ol {
        padding-left: 20px;
        margin: 12px 0;
    }

    .af-html-note-widget li { margin: 4px 0; }
    .af-html-note-widget p { margin: 8px 0; }

    .af-html-note-widget table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
    }

    .af-html-note-widget th, .af-html-note-widget td {
        border: 1px solid var(--border-color, #555);
        padding: 8px 12px;
        text-align: left;
    }

    .af-html-note-widget th {
        background: rgba(255,255,255,0.1);
        font-weight: 600;
    }

    .af-html-note-widget hr {
        border: none;
        border-top: 1px solid var(--border-color, #555);
        margin: 16px 0;
        opacity: 0.6;
    }

    .af-html-note-widget::-webkit-scrollbar { width: 8px; }
    .af-html-note-widget::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .af-html-note-widget::-webkit-scrollbar-thumb { 
        background: var(--border-color, #555); 
        border-radius: 4px; 
    }
    .af-html-note-widget::-webkit-scrollbar-thumb:hover { background: #777; }

    .af-html-note-editor::-webkit-scrollbar { width: 8px; }
    .af-html-note-editor::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .af-html-note-editor::-webkit-scrollbar-thumb { 
        background: var(--border-color, #555); 
        border-radius: 4px; 
    }
    .af-html-note-editor::-webkit-scrollbar-thumb:hover { background: #777; }
`;

// Inject styles
function injectStyles() {
    const styleId = 'af-html-note-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = AF_HTML_NOTE_STYLES;
        document.head.appendChild(style);
    }
}

app.registerExtension({
    name: "AF.enhanced.html.note",
    
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "AF_Enhanced_HTML_Note") {
            injectStyles();
            
            const onExecuted = nodeType.prototype.onExecuted;
            nodeType.prototype.onExecuted = function(message) {
                onExecuted?.apply(this, arguments);
                
                if (message.af_html_note) {
                    const htmlData = message.af_html_note[0];
                    this.updateHTMLDisplay(htmlData.content);
                }
            };

            nodeType.prototype.updateHTMLDisplay = function(content) {
                if (this.htmlNoteElement && !this.isEditMode) {
                    this.htmlNoteElement.innerHTML = content;
                    this.handleLinksInHTML();
                }
            };

            nodeType.prototype.handleLinksInHTML = function() {
                if (!this.htmlNoteElement) return;
                
                const links = this.htmlNoteElement.querySelectorAll('a');
                links.forEach(link => {
                    link.onclick = (e) => {
                        e.stopPropagation();
                        if (link.href && !link.href.includes('#')) {
                            window.open(link.href, '_blank');
                        }
                    };
                });
            };

            nodeType.prototype.enterEditMode = function() {
                if (this.isEditMode || !this.containerElement) return;
                
                console.log('Entering edit mode');
                this.isEditMode = true;
                this.containerElement.classList.add('edit-mode');
                this.editorElement.value = this.htmlContent;
                
                setTimeout(() => {
                    this.editorElement.focus();
                    this.editorElement.setSelectionRange(0, 0);
                }, 10);
                
                this.setDirtyCanvas?.(true, true);
            };

            nodeType.prototype.exitEditMode = function() {
                if (!this.isEditMode || !this.containerElement) return;
                
                console.log('Exiting edit mode');
                this.isEditMode = false;
                this.containerElement.classList.remove('edit-mode');
                this.htmlContent = this.editorElement.value;
                this.htmlNoteElement.innerHTML = this.htmlContent;
                this.handleLinksInHTML();
                
                // Update the widget value
                const htmlWidget = this.widgets?.find(w => w.name === "html_content");
                if (htmlWidget) {
                    htmlWidget.value = this.htmlContent;
                }
                
                this.setDirtyCanvas?.(true, true);
            };

            nodeType.prototype.createHTMLNoteDisplay = function(content) {
                this.htmlContent = content;
                this.isEditMode = false;
                
                // Create container element
                this.containerElement = document.createElement("div");
                this.containerElement.className = "af-html-note-container";
                this.containerElement.style.cssText = `
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                `;
                
                // Create HTML display element
                this.htmlNoteElement = document.createElement("div");
                this.htmlNoteElement.className = "af-html-note-widget";
                this.htmlNoteElement.innerHTML = content;
                
                // Create editor element
                this.editorElement = document.createElement("textarea");
                this.editorElement.className = "af-html-note-editor";
                this.editorElement.value = content;
                
                // Append both elements to container
                this.containerElement.appendChild(this.htmlNoteElement);
                this.containerElement.appendChild(this.editorElement);
                
                // Add click handler for entering edit mode
                this.htmlNoteElement.addEventListener('click', (e) => {
                    // Don't enter edit mode if clicking on a link
                    if (e.target.tagName.toLowerCase() === 'a') {
                        return;
                    }
                    
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('HTML note clicked, entering edit mode');
                    this.enterEditMode();
                });

                // Handle middle mouse button to allow canvas panning
                this.htmlNoteElement.addEventListener('mousedown', (e) => {
                    if (e.button === 1) { // Middle mouse button
                        e.preventDefault();
                        e.stopPropagation();
                        // Let the canvas handle this event instead
                        const canvasEvent = new MouseEvent('mousedown', {
                            bubbles: true,
                            cancelable: true,
                            button: e.button,
                            buttons: e.buttons,
                            clientX: e.clientX,
                            clientY: e.clientY
                        });
                        app.canvas.canvas.dispatchEvent(canvasEvent);
                    }
                });

                this.editorElement.addEventListener('mousedown', (e) => {
                    if (e.button === 1) { // Middle mouse button
                        e.preventDefault();
                        e.stopPropagation();
                        // Let the canvas handle this event instead
                        const canvasEvent = new MouseEvent('mousedown', {
                            bubbles: true,
                            cancelable: true,
                            button: e.button,
                            buttons: e.buttons,
                            clientX: e.clientX,
                            clientY: e.clientY
                        });
                        app.canvas.canvas.dispatchEvent(canvasEvent);
                    }
                });

                // Handle editor events
                this.editorElement.addEventListener('keydown', (e) => {
                    e.stopPropagation(); // Prevent ComfyUI from handling these
                });

                this.editorElement.addEventListener('blur', (e) => {
                    // Don't exit edit mode on blur - only on explicit actions
                    e.stopPropagation();
                });

                this.handleLinksInHTML();

                // Add the container as a DOM widget
                this.htmlNoteWidget = this.addDOMWidget(
                    "html_note_container", 
                    "div", 
                    this.containerElement
                );
                
                return this.htmlNoteWidget;
            };

            // Override mouse handling
            nodeType.prototype.onMouseDown = function(e, localPos, graphCanvas) {
                // If clicking outside the node content area, exit edit mode
                if (this.isEditMode && e.button === 0) {
                    const rect = this.getBounding();
                    const canvasPos = graphCanvas.convertOffsetToCanvas([e.clientX, e.clientY]);
                    
                    // Check if click is outside the node bounds
                    if (canvasPos[0] < rect[0] || canvasPos[0] > rect[0] + rect[2] ||
                        canvasPos[1] < rect[1] || canvasPos[1] > rect[1] + rect[3]) {
                        this.exitEditMode();
                    }
                }
                
                // Allow middle mouse for canvas panning
                if (e.button === 1) {
                    return false;
                }
                
                return true;
            };

            // Handle canvas clicks to exit edit mode
            const originalOnCanvasMouseDown = app.canvas.onMouseDown;
            app.canvas.onMouseDown = function(e) {
                // Find any nodes in edit mode and exit them when clicking on canvas
                if (app.graph) {
                    for (const node of app.graph._nodes) {
                        if (node.type === "AF_Enhanced_HTML_Note" && node.isEditMode) {
                            // Check if click is outside this node
                            const rect = node.getBounding();
                            const canvasPos = this.convertOffsetToCanvas([e.clientX, e.clientY]);
                            
                            if (canvasPos[0] < rect[0] || canvasPos[0] > rect[0] + rect[2] ||
                                canvasPos[1] < rect[1] || canvasPos[1] > rect[1] + rect[3]) {
                                node.exitEditMode();
                            }
                        }
                    }
                }
                
                return originalOnCanvasMouseDown?.call(this, e);
            };

            // Override serialize to maintain size
            const originalSerialize = nodeType.prototype.serialize;
            nodeType.prototype.serialize = function() {
                const data = originalSerialize ? originalSerialize.apply(this, arguments) : {};
                
                // Store the current size
                if (this.size) {
                    data.size = [this.size[0], this.size[1]];
                }
                
                return data;
            };

            // Override configure to restore size
            const originalConfigure = nodeType.prototype.configure;
            nodeType.prototype.configure = function(info) {
                if (originalConfigure) {
                    originalConfigure.apply(this, arguments);
                }
                
                // Restore size if it was saved
                if (info.size) {
                    this.size = [info.size[0], info.size[1]];
                }
            };

            // Display initial content on node creation
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function() {
                onNodeCreated?.apply(this, arguments);
                
                this.isEditMode = false;
                
                // Set initial larger size
                this.size = [500, 400];
                
                // Hide the original input widget completely
                setTimeout(() => {
                    const htmlWidget = this.widgets?.find(w => w.name === "html_content");
                    if (htmlWidget) {
                        // Hide the widget completely
                        htmlWidget.computeSize = () => [0, -4];
                        if (htmlWidget.element) {
                            htmlWidget.element.style.display = 'none';
                        }
                        
                        // Create our custom display
                        this.createHTMLNoteDisplay(htmlWidget.value);
                        
                        // Force size update
                        this.setSize(this.size);
                    }
                }, 0);
            };

            // Handle Escape key globally for this node type
            const originalOnKeyDown = nodeType.prototype.onKeyDown;
            nodeType.prototype.onKeyDown = function(e) {
                if (e.key === 'Escape' && this.isEditMode) {
                    this.exitEditMode();
                    return true; // Handled
                }
                
                return originalOnKeyDown ? originalOnKeyDown.call(this, e) : false;
            };
        }
    }
});
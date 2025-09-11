// File: web/AF_Enhanced_HTML.js

import { app } from "../../scripts/app.js";

// Define inline CSS styles
const AF_HTML_STYLES = `
    .af-html-widget {
        background: var(--comfy-menu-bg, #2a2a2a);
        border: 1px solid var(--border-color, #555);
        border-radius: 8px;
        padding: 16px;
        margin: 8px 0;
        max-height: 400px;
        overflow-y: auto;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        line-height: 1.6;
        color: var(--input-text, #ffffff);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        min-height: 100px;
        word-wrap: break-word;
    }

    .af-html-widget h1, .af-html-widget h2, .af-html-widget h3, 
    .af-html-widget h4, .af-html-widget h5, .af-html-widget h6 {
        margin-top: 0;
        margin-bottom: 12px;
        font-weight: 600;
    }

    .af-html-widget h1 { font-size: 1.5em; }
    .af-html-widget h2 { font-size: 1.3em; }
    .af-html-widget h3 { font-size: 1.1em; }

    .af-html-widget .af-section {
        padding: 12px 16px;
        margin: 8px 0;
        border-radius: 6px;
        border-left: 4px solid;
    }

    .af-html-widget .af-section.af-positive {
        background: rgba(144, 238, 144, 0.1);
        border-left-color: #90EE90;
    }

    .af-html-widget .af-section.af-negative {
        background: rgba(255, 107, 107, 0.1);
        border-left-color: #FF6B6B;
    }

    .af-html-widget .af-section.af-neutral {
        background: rgba(224, 224, 224, 0.1);
        border-left-color: #E0E0E0;
    }

    .af-html-widget .af-section.af-info {
        background: rgba(135, 206, 235, 0.1);
        border-left-color: #87CEEB;
    }

    .af-html-widget .af-section.af-warning {
        background: rgba(255, 215, 0, 0.1);
        border-left-color: #FFD700;
    }

    .af-html-widget .af-section.af-custom {
        background: rgba(186, 85, 211, 0.1);
        border-left-color: #BA55D3;
    }

    .af-html-widget .af-spacer { height: 16px; margin: 8px 0; }
    .af-html-widget .af-spacer-small { height: 8px; margin: 4px 0; }
    .af-html-widget .af-spacer-large { height: 32px; margin: 16px 0; }
    .af-html-widget .af-spacer-xl { height: 48px; margin: 24px 0; }

    .af-html-widget a {
        color: #58a6ff;
        text-decoration: none;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .af-html-widget a:hover {
        color: #79c0ff;
        text-decoration: underline;
    }

    .af-html-widget code {
        background: rgba(0,0,0,0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
        font-size: 0.9em;
        color: #f0f6fc;
    }

    .af-html-widget pre {
        background: rgba(0,0,0,0.4);
        border: 1px solid #444;
        border-radius: 6px;
        padding: 12px;
        margin: 16px 0;
        overflow-x: auto;
    }

    .af-html-widget pre code {
        background: transparent;
        padding: 0;
    }

    .af-html-widget ul, .af-html-widget ol {
        padding-left: 20px;
        margin: 12px 0;
    }

    .af-html-widget li { margin: 4px 0; }
    .af-html-widget p { margin: 8px 0; }

    .af-html-widget table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
    }

    .af-html-widget th, .af-html-widget td {
        border: 1px solid var(--border-color, #555);
        padding: 8px 12px;
        text-align: left;
    }

    .af-html-widget th {
        background: rgba(255,255,255,0.1);
        font-weight: 600;
    }

    .af-html-widget hr {
        border: none;
        border-top: 1px solid var(--border-color, #555);
        margin: 16px 0;
        opacity: 0.6;
    }

    .af-html-widget::-webkit-scrollbar { width: 8px; }
    .af-html-widget::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .af-html-widget::-webkit-scrollbar-thumb { 
        background: var(--border-color, #555); 
        border-radius: 4px; 
    }
    .af-html-widget::-webkit-scrollbar-thumb:hover { background: #777; }
`;

// Inject styles
function injectStyles() {
    const styleId = 'af-html-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = AF_HTML_STYLES;
        document.head.appendChild(style);
    }
}

app.registerExtension({
    name: "AF.enhanced.html",
    
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "AF_Enhanced_HTML") {
            injectStyles();
            
            const onExecuted = nodeType.prototype.onExecuted;
            nodeType.prototype.onExecuted = function(message) {
                onExecuted?.apply(this, arguments);
                
                if (message.af_html) {
                    const htmlData = message.af_html[0];
                    this.displayHTML(htmlData.content);
                }
            };

            nodeType.prototype.displayHTML = function(content) {
                // Remove existing widget if present
                if (this.htmlElement) {
                    this.htmlElement.remove();
                }

                // Create HTML display element
                this.htmlElement = document.createElement("div");
                this.htmlElement.className = "af-html-widget";
                this.htmlElement.innerHTML = content;
                
                // Handle links
                const links = this.htmlElement.querySelectorAll('a');
                links.forEach(link => {
                    link.onclick = (e) => {
                        e.preventDefault();
                        if (link.href && !link.href.includes('#')) {
                            window.open(link.href, '_blank');
                        }
                    };
                });

                // Add as DOM widget
                if (!this.htmlWidget) {
                    this.htmlWidget = this.addDOMWidget(
                        "html_display", 
                        "div", 
                        this.htmlElement
                    );
                }
                
                this.htmlWidget.element = this.htmlElement;
                this.setSize(this.computeSize());
            };

            // Display initial content on node creation
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function() {
                onNodeCreated?.apply(this, arguments);
                
                // Get the HTML content from the input widget
                const htmlWidget = this.widgets?.find(w => w.name === "html_content");
                if (htmlWidget) {
                    this.displayHTML(htmlWidget.value);
                    
                    // Update display when content changes
                    const originalCallback = htmlWidget.callback;
                    htmlWidget.callback = (value) => {
                        if (originalCallback) originalCallback(value);
                        this.displayHTML(value);
                    };
                }
            };
        }
    }
});
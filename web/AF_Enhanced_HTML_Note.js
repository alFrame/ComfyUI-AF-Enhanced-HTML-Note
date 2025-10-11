// File: web/AF_Enhanced_HTML_Note.js

import { app } from "../../scripts/app.js";

// Define inline CSS styles
const AF_HTML_NOTE_STYLES = `
    .af-html-note-container {
        width: 100%;
        height: 100%;
        min-height: 100px;
        background: var(--comfy-menu-bg, #2a2a2a);
        /* border: 1px solid var(--border-color, #555); */
        padding: 8px;
        box-sizing: border-box;
        overflow: hidden;
        cursor: default;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        line-height: 1.6;
        color: var(--input-text, #ffffff);
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .af-html-note-content {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        flex: 1;
		/* Prevent text selection */
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		cursor: default;
		/* Prevent keyboard focus */
		outline: none;
    }

	/* Ensure content area can't be focused */
	.af-html-note-content:focus {
		outline: none;
	}

	.af-html-note-editor {
		width: 100%;
		height: 100%;
		background: var(--comfy-menu-bg, #2a2a2a);
		border: 1px solid var(--border-color, #555);
		padding: 8px;
		font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
		line-height: 1.4;
		color: var(--input-text, #ffffff);
		box-sizing: border-box;
		resize: none;
		outline: none;
		font-size: 14px;
		display: none;
		flex: 1;
		/* Add text selection capabilities */
		user-select: auto;
		-webkit-user-select: auto;
		-moz-user-select: auto;
		-ms-user-select: auto;
		cursor: text;
	}

    /* Floating edit button */
    .af-floating-edit-btn {
        position: absolute;
        top: 4px;
        right: 4px;
        background: rgba(0, 0, 0, 0.8);
        border: 1px solid var(--border-color, #555);
        color: var(--input-text, #ffffff);
        border-radius: 3px;
        width: 22px;
        height: 22px;
        cursor: pointer;
        z-index: 1000;
        font-size: 11px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }

    .af-floating-edit-btn:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.9);
        border-color: #777;
    }

    /* Enable link interactions only when Ctrl is held */
    .af-html-note-content a {
        color: #58a6ff;
        text-decoration: none;
        /* Links are never directly clickable - only via Ctrl */
        pointer-events: none;
        cursor: default;
    }

    body.af-ctrl-active .af-html-note-content a {
        /* Only become clickable when Ctrl is held globally */
        pointer-events: auto;
        cursor: pointer;
    }

    body.af-ctrl-active .af-html-note-content a:hover {
        color: #79c0ff;
        text-decoration: underline;
    }

    .af-html-note-container.edit-mode .af-html-note-content {
        display: none;
    }

    .af-html-note-container.edit-mode .af-html-note-editor {
        display: block;
    }

    /* Hide edit button in edit mode */
    .af-html-note-container.edit-mode .af-floating-edit-btn {
        display: none;
    }

    /* Rest of your CSS remains the same... */
    .af-html-note-content h1, .af-html-note-content h2, .af-html-note-content h3, 
    .af-html-note-content h4, .af-html-note-content h5, .af-html-note-content h6 {
        margin-top: 0;
        margin-bottom: 12px;
        font-weight: 600;
    }

    .af-html-note-content h1 { font-size: 1.5em; }
    .af-html-note-content h2 { font-size: 1.3em; }
    .af-html-note-content h3 { font-size: 1.1em; }

    .af-html-note-content .af-section {
        padding: 8px 16px;
        margin: 8px 0;
        border-radius: 6px;
        border-left: 4px solid;
    }

    .af-html-note-content .af-section.af-positive {
        background: rgba(144, 238, 144, 0.1);
        border-left-color: #90EE90;
    }

    .af-html-note-content .af-section.af-negative {
        background: rgba(255, 107, 107, 0.1);
        border-left-color: #FF6B6B;
    }

    .af-html-note-content .af-section.af-neutral {
        background: rgba(224, 224, 224, 0.1);
        border-left-color: #E0E0E0;
    }

    .af-html-note-content .af-section.af-info {
        background: rgba(135, 206, 235, 0.1);
        border-left-color: #87CEEB;
    }

    .af-html-note-content .af-section.af-warning {
        background: rgba(255, 128, 0, 0.1);
        border-left-color: #FFD700;
    }

    .af-html-note-content .af-section.af-yellow {
        background: rgba(255, 128, 0, 0.1);
        border-left-color: #FFD700;
    }

    .af-html-note-content .af-section.af-blue {
        background: rgba(102, 105, 255, 0.1);
        border-left-color: #000099;
    }

    .af-html-note-content .af-section.af-custom {
        background: rgba(186, 85, 211, 0.1);
        border-left-color: #BA55D3;
    }

    .af-html-note-content .af-spacer-top { height: 2px; margin: 4px 0; }
    .af-html-note-content .af-spacer-mini { height: 4px; margin: 4px 0; }
    .af-html-note-content .af-spacer-small { height: 8px; margin: 4px 0; }
    .af-html-note-content .af-spacer { height: 16px; margin: 8px 0; }
    .af-html-note-content .af-spacer-large { height: 32px; margin: 16px 0; }
    .af-html-note-content .af-spacer-xl { height: 48px; margin: 24px 0; }

    .af-html-note-content code {
        background: rgba(0,0,0,0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
        font-size: 0.9em;
        color: #f0f6fc;
    }

    .af-html-note-content pre {
        background: rgba(0,0,0,0.4);
        border: 1px solid #444;
        border-radius: 6px;
        padding: 12px;
        margin: 16px 0;
        overflow-x: auto;
    }

    .af-html-note-content pre code {
        background: transparent;
        padding: 0;
    }

    .af-html-note-content ul, .af-html-note-content ol {
        padding-left: 20px;
        margin: 12px 0;
    }

    .af-html-note-content li { margin: 4px 0; }
    .af-html-note-content p { margin: 8px 0; }

    .af-html-note-content table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
    }

    .af-html-note-content th, .af-html-note-content td {
        border: 1px solid var(--border-color, #555);
        padding: 8px 12px;
        text-align: left;
    }

    .af-html-note-content th {
        background: rgba(255,255,255,0.1);
        font-weight: 600;
    }

    .af-html-note-content hr {
        border: none;
        border-top: 1px solid var(--border-color, #555);
        margin: 16px 0;
        opacity: 0.6;
    }

    .af-html-note-container::-webkit-scrollbar { width: 8px; }
    .af-html-note-container::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .af-html-note-container::-webkit-scrollbar-thumb { 
        background: var(--border-color, #555); 
        border-radius: 4px; 
    }
    .af-html-note-container::-webkit-scrollbar-thumb:hover { background: #777; }

    .af-html-note-editor::-webkit-scrollbar { width: 8px; }
    .af-html-note-editor::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
    .af-html-note-editor::-webkit-scrollbar-thumb { 
        background: var(--border-color, #555); 
        border-radius: 4px; 
    }
    .af-html-note-editor::-webkit-scrollbar-thumb:hover { background: #777; }

    /* ****** MY OWN STYLES ****** */
    .af-column-half-left {
        box-sizing: border-box;
        float: left;
        width: 49%;
        margin-right: 1% !important;
    }
    .af-column-half-right {
        box-sizing: border-box;
        float: left;
        width: 49%;
        margin-left: 1% !important;
    }
    .row:after {
        content: "";
        display: table;
        clear: both;
    }
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
            
            // Store the original onNodeCreated
            const originalOnNodeCreated = nodeType.prototype.onNodeCreated;
            
            nodeType.prototype.onNodeCreated = function() {
                const result = originalOnNodeCreated?.apply(this, arguments);
                
                this.isEditMode = false;
                this.size = [400, 300];
                
                // Don't hide the original widget - instead, replace it with our custom display
                setTimeout(() => {
                    const htmlWidget = this.widgets?.find(w => w.name === "html_content");
                    if (htmlWidget && htmlWidget.element) {
                        // Store the original value
                        this.htmlContent = htmlWidget.value;
                        
                        // Create our custom container
                        this.createHTMLNoteDisplay(this.htmlContent);
                        
                        // Hide the original widget but keep its value
                        htmlWidget.computeSize = () => [0, 0];
                        htmlWidget.element.style.display = 'none';
                    }
                }, 0);
                
                return result;
            };

			nodeType.prototype.createHTMLNoteDisplay = function(content) {
				// Create container element
				this.containerElement = document.createElement("div");
				this.containerElement.className = "af-html-note-container";
				
				// Create HTML content display
				this.contentElement = document.createElement("div");
				this.contentElement.className = "af-html-note-content";
				this.contentElement.innerHTML = content;
				
				// Create editor element
				this.editorElement = document.createElement("textarea");
				this.editorElement.className = "af-html-note-editor";
				this.editorElement.value = content;
				
				// Create floating edit button
				this.editButton = document.createElement("div");
				this.editButton.className = "af-floating-edit-btn";
				this.editButton.innerHTML = "✏️";
				this.editButton.title = "Edit HTML";
				
				// Append all elements to container
				this.containerElement.appendChild(this.contentElement);
				this.containerElement.appendChild(this.editorElement);
				this.containerElement.appendChild(this.editButton);
				
				// Edit button click handler
				this.editButton.addEventListener('click', (e) => {
					if (!this.isEditMode) {
						this.enterEditMode();
						e.stopPropagation();
					}
				});

				// Add back double-click editing (user-friendly alternative)
				this.contentElement.addEventListener('dblclick', (e) => {
					if (!this.isEditMode) {
						this.enterEditMode();
						e.stopPropagation();
					}
				});

				// Handle links
				this.handleLinksInHTML();

				// Handle editor events
				this.editorElement.addEventListener('keydown', (e) => {
					if (e.key === 'Escape') {
						this.exitEditMode();
						e.preventDefault();
						e.stopPropagation();
					}
				});
				
				// Comment
				this.contentElement.setAttribute('tabindex', '-1');
				
				this.editorElement.addEventListener('blur', () => {
					setTimeout(() => {
						if (this.isEditMode && document.activeElement !== this.editorElement) {
							this.exitEditMode();
						}
					}, 10);
				});
				
				this.contentElement.addEventListener('mousedown', (e) => {
					// Prevent the content area from getting focus on click
					e.preventDefault();
					
					// But don't stop propagation - let ComfyUI handle node selection
					// Only prevent the default focus behavior
				});
				
				// Add as DOM widget
				this.addDOMWidget("html_note_display", "div", this.containerElement);
			};

            nodeType.prototype.enterEditMode = function() {
                if (this.isEditMode) return;
                
                this.isEditMode = true;
                this.containerElement.classList.add('edit-mode');
                this.editorElement.value = this.htmlContent;
                
                setTimeout(() => {
                    this.editorElement.focus();
                    this.editorElement.select();
                }, 10);
            };

            nodeType.prototype.exitEditMode = function() {
                if (!this.isEditMode) return;
                
                this.isEditMode = false;
                this.containerElement.classList.remove('edit-mode');
                this.htmlContent = this.editorElement.value;
                this.contentElement.innerHTML = this.htmlContent;
                
                // Update the original widget value
                const htmlWidget = this.widgets?.find(w => w.name === "html_content");
                if (htmlWidget) {
                    htmlWidget.value = this.htmlContent;
                    if (htmlWidget.callback) {
                        htmlWidget.callback(this.htmlContent);
                    }
                }
                
                // Re-attach link handlers
                this.handleLinksInHTML();
            };

			// Updated link handler - REMOVED JavaScript execution
			nodeType.prototype.handleLinksInHTML = function() {
				if (!this.contentElement) return;
				
				const links = this.contentElement.querySelectorAll('a');
				links.forEach(link => {
					// Remove any existing onclick handlers to prevent JavaScript execution
					link.onclick = null;
					
					link.addEventListener('click', (e) => {
						// Only allow clicks when Ctrl is held
						if (!document.body.classList.contains('af-ctrl-active')) {
							e.preventDefault();
							e.stopPropagation();
							return false;
						}
						
						const href = link.getAttribute('href');
						
						// Handle different types of links
						if (href) {
							// External URLs and anchor links - open in new tab
							if (href.startsWith('http://') || 
								href.startsWith('https://') ||
								href.startsWith('mailto:') ||
								href.startsWith('tel:')) {
								e.preventDefault();
								window.open(href, '_blank');
							}
							// Internal anchor links (page navigation) - let browser handle
							else if (href.startsWith('#') || href === '#') {
								// Allow default behavior for anchor links
								// They will navigate within the same page
							}
							// JavaScript links - BLOCK for security
							else if (href.startsWith('javascript:')) {
								e.preventDefault();
								e.stopPropagation();
								console.warn('AF HTML Note: JavaScript links are disabled for security');
								return false;
							}
							// Relative URLs and other links - open in new tab
							else {
								e.preventDefault();
								window.open(href, '_blank');
							}
						}
						
						e.stopPropagation();
						return false;
					});
				});
			};
			
            // Global Ctrl key handling
            let ctrlKeyActive = false;

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Control') {
                    ctrlKeyActive = true;
                    document.body.classList.add('af-ctrl-active');
                }
            });

            document.addEventListener('keyup', (e) => {
                if (e.key === 'Control') {
                    ctrlKeyActive = false;
                    document.body.classList.remove('af-ctrl-active');
                }
            });

            // Clean up when node is removed
            const originalOnRemoved = nodeType.prototype.onRemoved;
            nodeType.prototype.onRemoved = function() {
                document.body.classList.remove('af-ctrl-active');
                originalOnRemoved?.apply(this, arguments);
            };
        }
    }
});
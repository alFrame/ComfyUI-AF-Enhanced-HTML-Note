// File: web/AF_Enhanced_HTML_Note.js

import { app } from "../../scripts/app.js";

// Inject styles from external CSS file
function injectStyles() {
    const styleId = 'af-html-note-styles';
    if (!document.getElementById(styleId)) {
        const link = document.createElement('link');
        link.id = styleId;
        link.rel = 'stylesheet';
        link.href = './web/AF_Enhanced_HTML_Note.css';
        document.head.appendChild(link);
    }
}

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
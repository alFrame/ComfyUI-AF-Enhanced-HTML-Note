# ****** ComfyUI-AF - Enhanced HTML-NOTE ******
#
# Creator: Alex Furer - Co-Creator(s): Claude AI
#
# Praise, comment, bugs, improvements: https://github.com/alFrame/ComfyUI_AF_FindNodeByID
#
# LICENSE: MIT License
#
# v0.0.01
#
# Description:
# A ComfyUI Note node with html capabilities. Create notes, UI's and ReadMe's directly inside the workflow, using html.
#
# Usage:
# Read Me on Github
#
# Changelog:
# v0.0.01
# - Initial Version
#
# Feature Requests / Wet Dreams
# - 

class AF_Enhanced_HTML:
    """
    AF Enhanced HTML-Note node with colored sections and rich formatting
    """
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "html_content": ("STRING", {
                    "multiline": True,
                    "default": """<div class="af-section af-positive">
    <h2>🟢 Positive Prompts</h2>
    <p>Your positive prompts go here...</p>
    <a href="#" onclick="alert('Link clicked!')">Click me!</a>
    </div>

    <div class="af-spacer"></div>

    <div class="af-section af-negative">
        <h2>🔴 Negative Prompts</h2>
        <p>Your negative prompts go here...</p>
    </div>

    <div class="af-spacer-large"></div>

    <div class="af-section af-neutral">
        <h3>📝 Notes</h3>
        <p>Additional notes and information...</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
        </ul>
    </div>""",
                    "placeholder": "Enter your HTML content here..."
                }),
            }
        }

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = "af_display_html"
    CATEGORY = "AF"

    def af_display_html(self, html_content):
        """
        Display enhanced HTML content
        """
        return {
            "ui": {
                "af_html": [{
                    "content": html_content
                }]
            }
        }

# Node mappings for ComfyUI
NODE_CLASS_MAPPINGS = {
    "AF_Enhanced_HTML": AF_Enhanced_HTML,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AF_Enhanced_HTML": "AF - Enhanced HTML",
}
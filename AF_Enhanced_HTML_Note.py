# ****** ComfyUI-AF - Enhanced HTML-NOTE ******
#
# Creator: Alex Furer - Co-Creator(s): Claude AI & DeepSeek
#
# Praise, comment, bugs, improvements: https://github.com/alFrame/ComfyUI_AF_FindNodeByID
#
# LICENSE: MIT License
#
# v0.0.04
#
# Description:
# A ComfyUI Note node with html capabilities. Create notes, UI's and ReadMe's directly inside the workflow, using html.
#
# Usage:
# Read Me on Github
#
# Changelog:
# v0.0.04
# - Fixed node selection and resizing by removing OUTPUT_NODE and using proper widget approach
# - Double clicking is now used to edit the html
# - Mouse interaction is now persistent to ComfyUI behavior. Except middle mouse button for panning.
# v0.0.03
# - Fixed node resizing issues on save/reload
# - Improved selection and edit mode behavior to match ComfyUI core notes
# - Fixed middle mouse button panning over the node
# - Improved HTML indentation in default content
# v0.0.02
# - Fixed naming consistency to HTML_Note
# - Implemented single-window toggle behavior
# v0.0.01
# - Initial Version
#

class AF_Enhanced_HTML_Note:
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
    <a href="https://www.fullframestudios.ch" onclick="alert('Link clicked!')">Click me!</a>
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
    FUNCTION = "display_html"
    CATEGORY = "AF - Nodes"
    OUTPUT_NODE = False

    def display_html(self, html_content):
        """
        Display enhanced HTML content
        """
        return {"ui": {"text": html_content}, "result": (html_content,)}

# Node mappings for ComfyUI
NODE_CLASS_MAPPINGS = {
    "AF_Enhanced_HTML_Note": AF_Enhanced_HTML_Note,
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "AF_Enhanced_HTML_Note": "AF - Enhanced HTML Note",
}

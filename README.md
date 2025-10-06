# AF Enhanced HTML Node - Usage Guide

A ComfyUI Note node with HTML capabilities. Create notes, UI's and ReadMe's directly inside the workflow using rich HTML formatting.

## ✨ Key Features

- **Rich HTML Support** - Full HTML formatting with colored sections, lists, tables, code blocks, and more
- **Non-Intrusive Design** - Doesn't interfere with normal ComfyUI workflow interactions
- **Easy Editing** - Double-click anywhere on the content to edit HTML
- **Smart Links** - Ctrl+click to open external links or trigger custom actions
- **Beautiful Styling** - Predefined color schemes that match ComfyUI's theme
- **No Dependencies** - All CSS is inlined for reliable performance

## 🎮 Interaction Guide

### Editing Content
- **Double-click** anywhere on the HTML content to enter edit mode
- **Escape key** or click outside to exit edit mode and save changes
- Changes are automatically saved when exiting edit mode

### Using Links
- **Hold Control key + Click** on any link to activate it
- External links open in new tabs
- JavaScript actions and alerts work when Control is held

### Node Management
- **Click and drag** the node title bar to move
- **Drag edges/corners** to resize
- **Middle mouse button** works for canvas panning (like other nodes)

## 🎨 Basic Section Colors

```html
<!-- Positive section (green) -->
<div class="af-section af-positive">
    <h2>🟢 Positive Prompts</h2>
    <p>Your positive prompts go here...</p>
</div>

<!-- Negative section (red) -->
<div class="af-section af-negative">
    <h2>🔴 Negative Prompts</h2>
    <p>Your negative prompts go here...</p>
</div>

<!-- Neutral section (gray) -->
<div class="af-section af-neutral">
    <h3>📝 Notes</h3>
    <p>General notes and information...</p>
</div>

<!-- Info section (blue) -->
<div class="af-section af-info">
    <h3>ℹ️ Information</h3>
    <p>Important information...</p>
</div>

<!-- Warning section (yellow) -->
<div class="af-section af-warning">
    <h3>⚠️ Warning</h3>
    <p>Warning or caution messages...</p>
</div>

<!-- Custom section (purple) -->
<div class="af-section af-custom">
    <h3>🎨 Custom</h3>
    <p>Custom styled content...</p>
</div>

# 📐 Spacers

<!-- Small spacer -->
<div class="af-spacer-small"></div>

<!-- Regular spacer -->
<div class="af-spacer"></div>

<!-- Large spacer -->
<div class="af-spacer-large"></div>

<!-- Extra large spacer -->
<div class="af-spacer-xl"></div>

#🔗 Clickable Links & Actions

<!-- External link (opens in new tab with Ctrl+click) -->
<a href="https://github.com/comfyanonymous/ComfyUI">ComfyUI GitHub</a>

<!-- Alert action (triggers with Ctrl+click) -->
<a href="#" onclick="alert('Custom action triggered!')">Click for alert</a>

<!-- Multiple actions -->
<a href="https://example.com" onclick="console.log('Link clicked')">Link with multiple actions</a>

<!-- JavaScript links -->
<a href="javascript:alert('Hello!')">JavaScript link</a>

# 📋 Complete Example Template

<div class="af-section af-positive">
    <h2>🟢 Positive Prompts</h2>
    <p><strong>masterpiece, best quality, highly detailed</strong></p>
    <ul>
        <li>Professional lighting</li>
        <li>Sharp focus</li>
        <li>8K resolution</li>
    </ul>
    <a href="#" onclick="alert('Positive prompts copied!')">📋 Copy Prompts</a>
</div>

<div class="af-spacer"></div>

<div class="af-section af-negative">
    <h2>🔴 Negative Prompts</h2>
    <p><em>low quality, blurry, distorted</em></p>
    <code>nsfw, watermark, signature, bad anatomy</code>
</div>

<div class="af-spacer-large"></div>

<div class="af-section af-info">
    <h3>ℹ️ Model Information</h3>
    <p>Using: <strong>SDXL 1.0</strong></p>
    <p>Steps: <code>25</code> | CFG: <code>7.5</code> | Sampler: <code>DPM++ 2M Karras</code></p>
    <a href="https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0">Model Page</a>
</div>

<div class="af-spacer"></div>

<div class="af-section af-warning">
    <h3>⚠️ Important Notes</h3>
    <p>This workflow requires:</p>
    <ol>
        <li>High VRAM (8GB+)</li>
        <li>Latest ComfyUI version</li>
        <li>SDXL compatible models</li>
    </ol>
</div>

<div class="af-spacer"></div>

<div class="af-section af-neutral">
    <h3>📝 Workflow Notes</h3>
    <p>Remember to:</p>
    <ul>
        <li>Check image dimensions before generating</li>
        <li>Adjust CFG scale for different results</li>
        <li>Save frequently!</li>
    </ul>
    <hr>
    <p><small>Last updated: Today | Created with AF Enhanced HTML Node</small></p>
</div>

🛠️ Installation
Create folder: ComfyUI/custom_nodes/ComfyUI-AF_Enhanced_HTML_Note/

Add the Python file: AF_Enhanced_HTML_Note.py

Add the init file: __init__.py

Create web/ subfolder

Add the JavaScript file: web/AF_Enhanced_HTML_Note.js

Restart ComfyUI

Find the node under AF - Nodes > AF - Enhanced HTML Note

🔧 Technical Details
Node Name: AF_Enhanced_HTML_Note

Category: AF - Nodes

Input: HTML content (multiline string)

Output: None (display only)

Compatibility: ComfyUI latest version

🐛 Troubleshooting
Node won't select/move?

Click on the node's title bar or edges, not the HTML content area

Links not working?

Remember to hold the Control key while clicking links

Can't edit content?

Double-click directly on the HTML content (not the node borders)

Scrollbar appears unnecessarily?

The node has minimal padding; resize if you need more space

📞 Support
Creator: Alex Furer

Co-Creators: Claude AI & DeepSeek

GitHub: https://github.com/alFrame/ComfyUI_AF_FindNodeByID

License: MIT License
# AF Enhanced HTML Node - Usage Guide

A ComfyUI Note node with html capabilities. Create notes, UI's and ReadMe's directly inside the workflow, using html.

## Basic Section Colors

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
```

## Spacers

```html
<!-- Small spacer -->
<div class="af-spacer-small"></div>

<!-- Regular spacer -->
<div class="af-spacer"></div>

<!-- Large spacer -->
<div class="af-spacer-large"></div>

<!-- Extra large spacer -->
<div class="af-spacer-xl"></div>
```

## Clickable Links

```html
<!-- External link -->
<a href="https://github.com/comfyanonymous/ComfyUI" target="_blank">ComfyUI GitHub</a>

<!-- Link with custom action -->
<a href="#" onclick="alert('Custom action triggered!')">Click for alert</a>

<!-- Link with data attribute for custom handling -->
<a href="#" data-action="custom-command">Custom Command</a>
```

## Complete Example Template

```html
<div class="af-section af-positive">
    <h2>🟢 Positive Prompts</h2>
    <p>masterpiece, best quality, highly detailed</p>
    <ul>
        <li>Professional lighting</li>
        <li>Sharp focus</li>
        <li>8K resolution</li>
    </ul>
</div>

<div class="af-spacer"></div>

<div class="af-section af-negative">
    <h2>🔴 Negative Prompts</h2>
    <p>low quality, blurry, distorted</p>
    <code>nsfw, watermark, signature</code>
</div>

<div class="af-spacer-large"></div>

<div class="af-section af-info">
    <h3>ℹ️ Model Information</h3>
    <p>Using: <strong>SDXL 1.0</strong></p>
    <p>Steps: <em>25</em> | CFG: <em>7.5</em></p>
    <a href="https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0" target="_blank">Model Page</a>
</div>

<div class="af-spacer"></div>

<div class="af-section af-neutral">
    <h3>📝 Notes</h3>
    <p>Remember to:</p>
    <ol>
        <li>Check image dimensions</li>
        <li>Adjust sampling method</li>
        <li>Fine-tune CFG scale</li>
    </ol>
    <hr>
    <p><small>Last updated: Today</small></p>
</div>
```

## Features

- **No external dependencies** - All CSS is inlined to avoid loading issues
- **Colored sections** - 6 predefined color schemes (positive, negative, neutral, info, warning, custom)
- **Flexible spacers** - 4 different spacer sizes
- **Clickable links** - Support for external links and custom actions
- **Responsive design** - Works on different screen sizes
- **HTML support** - Full HTML formatting (lists, tables, code blocks, etc.)
- **Custom scrollbars** - Styled to match ComfyUI theme

## Installation

1. Create folder: `ComfyUI/custom_nodes/ComfyUI-AF_Enhanced_HTML/`
2. Add the Python file: `AF_Enhanced_HTML.py`
3. Add the init file: `__init__.py`
4. Create `web/` subfolder
5. Add the JavaScript file: `web/AF_Enhanced_HTML.js`
6. Restart ComfyUI
7. Find the node under **AF > AF - Enhanced HTML**

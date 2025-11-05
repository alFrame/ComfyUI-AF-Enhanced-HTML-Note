# ****** ComfyUI-AF - Enhanced HTML-NOTE ******
#
# Creator: Alex Furer - Co-Creator(s): Claude AI & DeepSeek
#
# Description: A ComfyUI Note node with html capabilities. Create notes, UI's and ReadMe's directly inside the workflow, using html.
#
# Repo and ReadMe URL: https://github.com/alFrame/ComfyUI-AF-Enhanced_HTML_Note
#
# Issues praise, comment, bugs, improvements: https://github.com/alFrame/ComfyUI-AF-Enhanced_HTML_Note/issues
#
# LICENSE: MIT License
#
# Usage: https://github.com/alFrame/ComfyUI-AF-Enhanced_HTML_Note
#
# Feature Requests / Wet Dreams
# -

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
                    "default": """<h2>Positive Prompt Section</h2>
<div class="af-section af-positive">
	<h2>🟢 Positive Prompts</h2>
	<p><strong>masterpiece, best quality, highly detailed</strong></p>
	<ul>
		<li>Professional lighting</li>
		<li>Sharp focus</li>
		<li>8K resolution</li>
	</ul>
</div>


<h2>Negative Prompt Section</h2>
<div class="af-section af-negative">
	<h2>🔴 Negative Prompts</h2>
	<p><em>low quality, blurry, distorted</em></p>
	<p><code>nsfw, watermark, signature, bad anatomy</code></p>
</div>


<h2>Neutral Prompt Section</h2>
<div class="af-section af-neutral">
	<h3>📝 Notes</h3>
	<p>General notes and information...</p>
	<ul>
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ul>
</div>

<h2>Info Section</h2>
<div class="af-section af-info">
	<h3>ℹ️ Information</h3>
	<p>Using: <strong>SDXL 1.0</strong></p>
	<p>Steps: <code>25</code> | CFG: <code>7.5</code> | Sampler: <code>DPM++ 2M Karras</code></p>
</div>

<h2>Warning Section</h2>
<div class="af-section af-warning">
	<h3>⚠️ Warning</h3>
	<p>This workflow requires:</p>
	<ol>
		<li>High VRAM (8GB+)</li>
		<li>Latest ComfyUI version</li>
		<li>SDXL compatible models</li>
	</ol>
</div>

<h2>Column Layouts</h2>
<div class="row">
	<div class="af-column-half-left">
		<div class="af-section af-positive">
			<h3>🎨 Style Settings</h3>
			<ul>
				<li>Style: Photorealistic</li>
				<li>Aspect: 16:9</li>
				<li>Quality: Ultra High</li>
			</ul>
		</div>
		
		<div class="af-spacer"></div>
		
		<div class="af-section af-info">
			<h3>⚙️ Technical</h3>
			<p>Resolution: <code>1920x1080</code></p>
			<p>Batch: <code>4</code></p>
		</div>
	</div>
	
	<div class="af-column-half-right">
		<div class="af-section af-negative">
			<h3>🚫 Exclusions</h3>
			<ul>
				<li>No text in image</li>
				<li>Avoid oversaturation</li>
				<li>No watermarks</li>
			</ul>
		</div>
		
		<div class="af-spacer"></div>
		
		<div class="af-section af-warning">
			<h3>💡 Tips</h3>
			<p>Use lower CFG for more creative results</p>
		</div>
	</div>
</div>

<h2>Clickable Links & Actions</h2>
<div class="af-section af-info">
	<h3>🔗 Interactive Links</h3>
	
	<!-- External links (opens in new tab with Ctrl+click) -->
	<h4>External link (opens in new tab with Ctrl+click)</h4>
	<p><a href="https://www.fullframestudios.ch/">Full Frame Studios - Alex Furer</a></p>
	
	<h4>Anchor Links</h4>
	<p><a href="https://www.fullframestudios.ch/#ThreeDee">Full Frame Studios - Alex Furer - 3D</a></p>
</div>

<h2>Custom Info Cards</h2>
<div style="display: flex; gap: 10px; flex-wrap: wrap;">
	<div style="flex: 1; min-width: 150px; background: rgba(144, 238, 144, 0.1); border: 1px solid #90EE90; padding: 12px; border-radius: 6px; text-align: center;">
		<strong style="color: #90EE90; display: block; margin-bottom: 4px;">Steps</strong>
		<p style="margin: 0; font-size: 24px; color: #fff; font-weight: bold;">25</p>
	</div>
	
	<div style="flex: 1; min-width: 150px; background: rgba(135, 206, 235, 0.1); border: 1px solid #87CEEB; padding: 12px; border-radius: 6px; text-align: center;">
		<strong style="color: #87CEEB; display: block; margin-bottom: 4px;">CFG Scale</strong>
		<p style="margin: 0; font-size: 24px; color: #fff; font-weight: bold;">7.5</p>
	</div>
	
	<div style="flex: 1; min-width: 150px; background: rgba(186, 85, 211, 0.1); border: 1px solid #BA55D3; padding: 12px; border-radius: 6px; text-align: center;">
		<strong style="color: #BA55D3; display: block; margin-bottom: 4px;">Batch Size</strong>
		<p style="margin: 0; font-size: 24px; color: #fff; font-weight: bold;">4</p>
	</div>
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

